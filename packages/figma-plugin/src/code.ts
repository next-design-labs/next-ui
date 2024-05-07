/// <reference types="@figma/plugin-typings" />

figma.showUI(__html__, { width: 400, height: 300 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === "upload-theme") {
    try {
      const { theme } = msg;

      Object.entries(theme).forEach(([category, values]) => {
        const collectionName = `${capitalize(category)} Variables`;
        const variableCollection =
          findOrCreateVariableCollection(collectionName);

        processThemeVariables(
          variableCollection,
          values as Record<string, unknown>,
          category,
        );
      });

      figma.notify("Collections and variables created successfully!");
    } catch (error) {
      console.error("Error creating collections/variables:", error);
      figma.notify(`Error: ${(error as Error).message}`);
    }
  } else if (msg.type === "delete-all") {
    deleteAll();
  }
};

/**
 * Processes theme variables recursively and adds them to the specified collection.
 */
function processThemeVariables(
  collection: VariableCollection,
  values: Record<string, unknown>,
  prefix = "",
): void {
  Object.entries(values).forEach(([name, value]) => {
    const variableName = prefix ? `${prefix}/${name}` : name;

    if (isPrimitive(value)) {
      const type = inferVariableType(
        value as string | number | null | undefined,
      );

      if (!type) {
        console.warn(
          `Unsupported value type for variable "${variableName}":`,
          value,
        );
        return;
      }

      createOrUpdateVariable(
        collection,
        variableName,
        value as string | number,
        type,
      );
    } else if (isObject(value)) {
      processThemeVariables(
        collection,
        value as Record<string, unknown>,
        variableName,
      );
    } else {
      console.warn(
        `Skipping invalid value for variable "${variableName}":`,
        value,
      );
    }
  });
}

/**
 * Clears all variables by resetting their values to null or default.
 */
function deleteAll(): void {
  // Remove all variables
  const variables = figma.variables.getLocalVariables();
  variables.forEach((variable) => {
    console.log("Removing variable:", variable);
    variable.remove();
  });

  // Remove all variable collections
  const collections = figma.variables.getLocalVariableCollections();
  collections.forEach((collection) => {
    console.log("Removing collection:", collection);
    collection.remove();
  });

  figma.notify("All variables and collections have been cleared.");
}

/**
 * Finds or creates a variable collection by its name.
 */
function findOrCreateVariableCollection(name: string): VariableCollection {
  const existingCollection = figma.variables
    .getLocalVariableCollections()
    .find((collection) => collection.name === name);

  return existingCollection || figma.variables.createVariableCollection(name);
}

/**
 * Creates a new variable or updates an existing one in the collection.
 */
function createOrUpdateVariable(
  collection: VariableCollection,
  name: string,
  value: string | number,
  type: VariableResolvedDataType,
): void {
  const existingVariable = figma.variables
    .getLocalVariables()
    .find(
      (variable) =>
        variable.name === name &&
        variable.variableCollectionId === collection.id,
    );

  if (existingVariable) {
    if (existingVariable.resolvedType !== type) {
      console.error(
        `Type mismatch for variable "${name}". Existing: ${existingVariable.resolvedType}, New: ${type}`,
      );
      return;
    }

    updateVariableValue(existingVariable, value, collection.defaultModeId);
  } else {
    const newVariable = figma.variables.createVariable(name, collection, type);
    updateVariableValue(newVariable, value, collection.defaultModeId);
  }
}

/**
 * Updates the value of a variable for a specific mode.
 */
function updateVariableValue(
  variable: Variable,
  value: string | number,
  modeId: string,
): void {
  switch (variable.resolvedType) {
    case "COLOR":
      if (typeof value === "string")
        variable.setValueForMode(modeId, hexToRgb(value));
      break;
    case "FLOAT":
      variable.setValueForMode(modeId, Number.parseFloat(value.toString()));
      break;
    case "STRING":
      if (typeof value === "string") variable.setValueForMode(modeId, value);
      break;
    default:
      console.error(
        `Unsupported value type for variable "${variable.name}":`,
        value,
      );
  }
}

/**
 * Infers the type of a variable based on its value.
 */
function inferVariableType(
  value: string | number | null | undefined,
): VariableResolvedDataType | null {
  if (typeof value === "string" && /^#([0-9A-F]{3}){1,2}$/i.test(value))
    return "COLOR";
  if (
    typeof value === "number" ||
    /^[\d.]+(px|em|rem|%)?$/.test(value?.toString() || "")
  )
    return "FLOAT";
  if (typeof value === "string") return "STRING";
  return null;
}

/**
 * Checks if a value is a primitive type.
 */
function isPrimitive(value: unknown): boolean {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    value === null ||
    value === undefined
  );
}

/**
 * Checks if a value is a plain object.
 */
function isObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" && value !== null && value.constructor === Object
  );
}

/**
 * Converts a hex color code to RGB format.
 */
function hexToRgb(hex: string): RGB {
  const bigint = Number.parseInt(hex.slice(1), 16);
  return {
    r: ((bigint >> 16) & 255) / 255,
    g: ((bigint >> 8) & 255) / 255,
    b: (bigint & 255) / 255,
  };
}

/**
 * Capitalizes the first letter of a string.
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
