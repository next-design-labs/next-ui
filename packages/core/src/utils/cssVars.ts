import type { NuiColorModes, NuiTheme } from "../types";

/**
 * Generates CSS variables from a Nui theme object.
 *
 * Combines the theme's global colors, mode-specific colors,
 * and design tokens into structured and flattened CSS variables.
 */
export const generateCSSVariables = (
  theme: NuiTheme,
  colorModes: NuiColorModes,
  prefix = "--nui",
) => {
  const themeVars = {
    colors: {
      ...theme.colors,
      ...colorModes.light,
    },
    ...theme.designTokens,
  };

  return {
    cssVars: toCSSVarsMap(themeVars, prefix),
    cssVarsList: toCSSVarsList(themeVars, prefix),
  };
};

/**
 * Recursively maps an object into CSS variable declarations with a specified prefix.
 *
 * Each property in the object is converted to a CSS variable reference, maintaining
 * the original nesting structure.
 */
export const toCSSVarsMap = <T extends object>(obj: T, prefix?: string): T => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const variableName = prefix ? `${prefix}-${key}` : `--${key}`;

    if (typeof value === "object" && value !== null) {
      // Recursively process nested objects
      acc[key as keyof T] = toCSSVarsMap(value, variableName);
    } else {
      // Replace primitive values with a CSS variable reference
      acc[key as keyof T] = `var(${variableName})` as T[keyof T];
    }

    return acc;
  }, {} as T);
};

/**
 * Recursively flattens an object into a single-level list of CSS variables.
 *
 * Each property in the object is converted into a flat key-value pair, where
 * the key is the fully qualified CSS variable name.
 */
export const toCSSVarsList = (
  obj: object,
  prefix?: string,
): Record<string, string> => {
  const cssVars: Record<string, string> = {};

  Object.entries(obj).forEach(([key, value]) => {
    const variableName = prefix ? `${prefix}-${key}` : `--${key}`;

    if (typeof value === "object" && value !== null) {
      // Recursively flatten nested objects and merge results
      Object.assign(cssVars, toCSSVarsList(value, variableName));
    } else {
      // Assign primitive values directly as CSS variables
      cssVars[variableName] = String(value);
    }
  });

  return cssVars;
};

/**
 * Generates a CSS rule string for a given selector and CSS declarations.
 *
 * This function constructs a CSS rule by combining the selector with the
 * formatted CSS declarations, ensuring proper formatting and readability.
 */
export const generateCSSRule = (
  selector: string,
  declarations: Record<string, string>,
) => {
  // Convert the declarations object into a CSS string
  const cssDeclarations = Object.entries(declarations)
    .map(([property, value]) => `${property}: ${value};`)
    .join("\n");

  // Construct the complete CSS rule
  return `${selector} {\n${cssDeclarations}\n}`;
};

/**
 * Inserts or updates a CSS rule for a specific selector in a `<style>` element.
 *
 * Dynamically creates a `<style>` element if one with the specified ID doesn't exist
 * and replaces any existing rules for the same selector.
 */
export const applyCSSRule = (
  styleId: string,
  selector: string,
  rule: string,
): void => {
  // Ensure the function runs in a browser environment
  if (typeof window === "undefined") return;

  // Locate or create the <style> element
  let styleElement = document.getElementById(styleId) as HTMLStyleElement;

  // Create a new <style> element if it doesn't exist
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }

  const styleSheet = styleElement.sheet as CSSStyleSheet;

  if (!styleSheet) {
    console.error(`Failed to access the stylesheet for "${styleId}".`);
    return;
  }

  // Remove any existing rule for the same selector
  Array.from(styleSheet.cssRules).forEach((cssRule, index) => {
    if (cssRule instanceof CSSStyleRule && cssRule.selectorText === selector) {
      styleSheet.deleteRule(index);
    }
  });

  // Insert the new rule
  try {
    styleSheet.insertRule(rule, styleSheet.cssRules.length);
  } catch (error) {
    console.error(`Failed to insert CSS rule for "${selector}":`, error);
  }
};
