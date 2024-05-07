/**
 * Recursively transforms an object into CSS variable declarations with a specified prefix.
 *
 * Each key-value pair in the object is converted into a CSS variable reference, with nested objects
 * being recursively processed. Primitive values are replaced with `var(--prefix-key)` references,
 * while nested objects maintain the same structure with CSS variable references applied recursively.
 */
export const mapToCSSVars = <T extends object>(obj: T, prefix = "--nui"): T => {
  return Object.entries(obj).reduce((result, [key, value]) => {
    // Generate the CSS variable name for the current key
    const variableName = `${prefix}-${key}`;

    if (typeof value === "object" && value !== null) {
      // Recursively process nested objects
      result[key as keyof T] = mapToCSSVars(value, variableName);
    } else {
      // Replace primitive values with a CSS variable reference
      result[key as keyof T] = `var(${variableName})` as T[keyof T];
    }

    return result;
  }, {} as T);
};

/**
 * Flattens a nested object into a flat structure of CSS variables.
 *
 * This function recursively processes a nested object, converting its keys and values into
 * CSS variable declarations. Each key is prefixed with a namespace to ensure uniqueness.
 */
export const flattenCSSVars = (
  obj: object,
  prefix = "--nui",
): Record<string, string> => {
  const cssVars: Record<string, string> = {};

  Object.entries(obj).forEach(([key, value]) => {
    // Construct the full CSS variable name with the prefix
    const varName = `${prefix}-${key}`;

    if (typeof value === "object" && value !== null) {
      // Recursively flatten nested objects, merging the results
      Object.assign(cssVars, flattenCSSVars(value, varName));
    } else {
      // Assign primitive values directly as CSS variables
      cssVars[varName] = String(value);
    }
  });

  return cssVars;
};

/**
 * Inserts or updates a CSS rule for a specific selector in a `<style>` element.
 *
 * This function ensures that a given CSS rule is applied, creating a `<style>` element
 * if necessary and replacing any existing rules for the same selector.
 */
export const applyCSSRule = (
  styleId: string,
  selector: string,
  rule: string,
): void => {
  // Ensure this function runs only in a browser environment
  if (typeof window === "undefined") return;

  // Locate or create the <style> element with the given ID
  let styleElement = document.getElementById(styleId) as HTMLStyleElement;

  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }

  const styleSheet = styleElement.sheet as CSSStyleSheet;

  // Remove any existing rule for the given selector
  const existingRuleIndex = Array.from(styleSheet.cssRules).findIndex(
    (cssRule) => (cssRule as CSSStyleRule).selectorText === selector,
  );

  if (existingRuleIndex !== -1) {
    styleSheet.deleteRule(existingRuleIndex);
  }

  // Insert the new rule at the end of the stylesheet
  styleSheet.insertRule(rule, styleSheet.cssRules.length);
};
