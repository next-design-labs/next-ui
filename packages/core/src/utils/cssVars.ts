/**
 * Recursively transforms an object into CSS variable declarations with a specified prefix.
 */
export const mapToCSSVars = <T extends object>(obj: T, prefix = "--nui"): T => {
  return Object.entries(obj).reduce((result, [key, value]) => {
    const variableName = `${prefix}-${key}`;

    if (typeof value === "object" && value !== null) {
      // Recursively map nested objects to CSS variables
      result[key as keyof T] = mapToCSSVars(value, variableName);
    } else {
      // Assign a CSS variable reference for primitive values
      result[key as keyof T] = `var(${variableName})` as T[keyof T];
    }

    return result;
  }, {} as T);
};

/**
 * Flattens a nested object into a flat structure of CSS variables.
 * Adds a namespace prefix to each key for use in CSS.
 */
export const flattenCSSVars = (
  obj: object,
  prefix = "--nui",
): Record<string, string> => {
  const cssVars: Record<string, string> = {};

  Object.entries(obj).forEach(([key, value]) => {
    const varName = `${prefix}-${key}`;

    if (typeof value === "object" && value !== null) {
      // Recursively process nested objects and merge the results
      Object.assign(cssVars, flattenCSSVars(value, varName));
    } else {
      // Convert primitive values to CSS variables
      cssVars[varName] = String(value);
    }
  });

  return cssVars;
};

/**
 * Inserts or updates a CSS rule for a given selector in a <style> element.
 */
export const applyCSSRule = (
  styleId: string,
  selector: string,
  rule: string,
): void => {
  if (typeof window === "undefined") return;

  // Locate or create a <style> element
  let styleElement = document.getElementById(styleId) as HTMLStyleElement;

  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }

  const styleSheet = styleElement.sheet as CSSStyleSheet;

  // Remove existing rule for the selector, if any
  const existingRuleIndex = Array.from(styleSheet.cssRules).findIndex(
    (cssRule) => (cssRule as CSSStyleRule).selectorText === selector,
  );

  if (existingRuleIndex !== -1) {
    styleSheet.deleteRule(existingRuleIndex);
  }

  // Insert the new rule
  styleSheet.insertRule(rule, styleSheet.cssRules.length);
};
