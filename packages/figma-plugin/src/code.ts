/// <reference types="@figma/plugin-typings" />

import {
  type Value,
  capitalize,
  flattenObjectValues,
  hexToRgb,
  isObject,
  isPrimitive,
  rgbToHex,
} from "./lib/utils";

figma.showUI(__html__, { width: 500, height: 600 });

// Main message handler
figma.ui.onmessage = async (msg) => {
  try {
    if (msg.type === "sync-theme") {
      const { theme } = msg;

      // Step 1: Process the 'colors' category first
      if (theme.colors) {
        const colorsCollection = findOrCreateVariableCollection("Colors");
        processThemeVariables(colorsCollection, theme.colors, "colors");
      }

      // Step 2: Process other categories
      Object.entries(theme).forEach(([category, values]) => {
        if (category === "colors") return; // Skip 'colors' as already handled
        const collection = findOrCreateVariableCollection(capitalize(category));
        processThemeVariables(
          collection,
          flattenObjectValues(values as Record<string, Value>),
          category,
        );
      });

      figma.notify("Collections and variables created successfully!");
    } else if (msg.type === "delete-all") {
      deleteAll();
    }
  } catch (error) {
    console.error("Error:", error);
    figma.notify(`Error: ${(error as Error).message}`);
  }
};

/** Find or create a variable collection by name */
const findOrCreateVariableCollection = (name: string): VariableCollection =>
  figma.variables.getLocalVariableCollections().find((c) => c.name === name) ||
  figma.variables.createVariableCollection(name);

/** Process theme variables recursively */
const processThemeVariables = (
  collection: VariableCollection,
  values: Record<string, unknown>,
  prefix = "",
): void => {
  Object.entries(values).forEach(([key, value]) => {
    const variableName = prefix ? `${prefix}/${key}` : key;

    if (isPrimitive(value)) {
      handlePrimitiveVariable(collection, variableName, value as never);
    } else if (isObject(value)) {
      processThemeVariables(
        collection,
        value as Record<string, unknown>,
        variableName,
      );
    }
  });
};

/** Handle primitive values to create or update variables */
const handlePrimitiveVariable = (
  collection: VariableCollection,
  name: string,
  value: string | number | null | undefined,
): void => {
  const type = inferVariableType(value);
  if (!type) return;

  // Special handling for COLOR type in 'Tokens' collection
  if (collection.name.toLowerCase() === "tokens" && type === "COLOR") {
    const aliasVariable = findColorVariable(value as string);
    if (aliasVariable) {
      createOrUpdateAliasVariable(collection, name, aliasVariable);
    } else {
      createOrUpdateVariable(collection, name, value as string, type);
    }
  } else {
    createOrUpdateVariable(collection, name, value as string | number, type);
  }
};

/** Infer the type of a variable based on its value */
const inferVariableType = (
  value: string | number | null | undefined,
): VariableResolvedDataType | null => {
  if (typeof value === "string" && /^#([0-9A-F]{3}){1,2}$/i.test(value))
    return "COLOR";
  if (typeof value === "number") return "FLOAT";
  if (typeof value === "string") return "STRING";
  return null;
};

/** Create or update a variable */
const createOrUpdateVariable = (
  collection: VariableCollection,
  name: string,
  value: string | number,
  type: VariableResolvedDataType,
): void => {
  const existingVariable = findVariableByName(collection, name);

  if (existingVariable) {
    updateVariableValue(existingVariable, value, collection.defaultModeId);
  } else {
    const newVariable = figma.variables.createVariable(name, collection, type);
    updateVariableValue(newVariable, value, collection.defaultModeId);
  }
};

/** Create or update an alias variable */
const createOrUpdateAliasVariable = (
  collection: VariableCollection,
  name: string,
  aliasVariable: Variable,
): void => {
  const existingVariable = findVariableByName(collection, name);

  if (existingVariable) {
    existingVariable.setValueForMode(collection.defaultModeId, {
      type: "VARIABLE_ALIAS",
      id: aliasVariable.id,
    });
  } else {
    const newVariable = figma.variables.createVariable(
      name,
      collection,
      "COLOR",
    );
    newVariable.setValueForMode(collection.defaultModeId, {
      type: "VARIABLE_ALIAS",
      id: aliasVariable.id,
    });
  }
};

/** Find a variable in a collection by its name */
const findVariableByName = (
  collection: VariableCollection,
  name: string,
): Variable | undefined =>
  figma.variables
    .getLocalVariables()
    .find((v) => v.name === name && v.variableCollectionId === collection.id);

/** Update a variable's value */
const updateVariableValue = (
  variable: Variable,
  value: string | number,
  modeId: string,
): void => {
  if (variable.resolvedType === "COLOR") {
    variable.setValueForMode(modeId, hexToRgb(value as string));
  } else if (variable.resolvedType === "FLOAT") {
    variable.setValueForMode(modeId, Number(value));
  } else if (variable.resolvedType === "STRING") {
    variable.setValueForMode(modeId, value as string);
  }
};

/** Find a color variable by its hex value */
const findColorVariable = (hex: string): Variable | null => {
  const colorsCollection = figma.variables
    .getLocalVariableCollections()
    .find((c) => c.name === "Colors");

  if (!colorsCollection) return null;

  return (
    figma.variables.getLocalVariables().find((variable) => {
      if (variable.variableCollectionId !== colorsCollection.id) return false;
      const rgbValue = variable.valuesByMode[colorsCollection.defaultModeId];
      return rgbValue && rgbToHex(rgbValue as RGB) === hex.toLowerCase();
    }) || null
  );
};

/** Delete all variables and collections */
const deleteAll = (): void => {
  figma.variables.getLocalVariables().forEach((v) => v.remove());
  figma.variables.getLocalVariableCollections().forEach((c) => c.remove());
  figma.notify("All variables and collections have been cleared.");
};
