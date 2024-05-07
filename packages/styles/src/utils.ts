import type { DeepPartial } from "./types";

/**
 * Recursively maps an object to a structure where each leaf value is a CSS variable string.
 */
export const mapCSSVars = <T extends object>(obj: T, prefix = "--nextui") =>
  Object.entries(obj).reduce(
    (acc, [key, value]) => {
      // Check if the current value is a non-null object
      if (typeof value === "object" && value !== null) {
        // Recursively map the nested object, updating the prefix
        acc[key as keyof T] = mapCSSVars(value, `${prefix}-${key}`);
      } else {
        // Assign a CSS variable string to the leaf value
        acc[key as keyof T] = `var(${prefix}-${key})`;
      }
      return acc;
    },
    {} as DeepPartial<T>,
  );

/**
 * Recursively extracts CSS variables from a nested object and formats them with a specified prefix.
 */
export const extractCSSVars = (obj: object, prefix = "--nextui") => {
  let vars = {} as Record<string, string>;

  for (const [key, value] of Object.entries(obj)) {
    // Check if the current value is a non-null object
    if (typeof value === "object" && value !== null) {
      // Recursively call extractCSSVars for the nested object, updating the prefix
      const nestedVars = extractCSSVars(value, `${prefix}-${key}`);
      // Merge the nested variables into the main variables object using the spread operator
      vars = { ...vars, ...nestedVars };
    } else {
      // If the value is not an object, add it to the vars object with the prefixed key
      // Convert the value to a string to ensure it is a valid CSS variable value
      vars[`${prefix}-${key}`] = String(value);
    }
  }

  return vars;
};
