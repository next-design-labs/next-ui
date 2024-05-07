// Allows for partial values in an object.
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

// Recursively maps an object to a structure where each leaf value is a CSS variable string.
export const mapCSSVars = <T extends object>(obj: T, prefix = "--nui"): T =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    // Check if the current value is a non-null object
    if (typeof value === "object" && value !== null) {
      // Recursively map the nested object, updating the prefix
      acc[key as keyof T] = mapCSSVars(value, `${prefix}-${key}`);
    } else {
      // Assign a CSS variable string to the leaf value
      acc[key as keyof T] = `var(${prefix}-${key})` as T[keyof T];
    }
    return acc;
  }, {} as T);

// Recursively creates CSS variables from a nested object and formats them with a specified prefix.
export const createCSSVars = (obj: object, prefix = "--nui") => {
  const vars: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newPrefix = `${prefix}-${key}`;

    // Check if the current value is a non-null object
    if (typeof value === "object" && value !== null) {
      // Merge the nested variables into the main variables object
      Object.assign(vars, createCSSVars(value, newPrefix));
    } else {
      // If the value is not an object, add it to the vars object with the prefixed key
      vars[newPrefix] = String(value);
    }
  }

  return vars;
};
