import { deepmerge } from "deepmerge-ts";

import { type NuiBaseTheme, type NuiTheme, baseTheme } from "./theme";

// Allows for partial values in an object.
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

/**
 * Creates a theme by merging the base theme with provided theme options.
 */
export const createTheme = (
  options:
    | DeepPartial<NuiTheme>
    | ((baseTheme: NuiBaseTheme) => DeepPartial<NuiTheme>),
) => {
  const themeOptions =
    typeof options === "function" ? options(baseTheme) : options;
  const partialTheme = deepmerge(baseTheme, themeOptions);
  const { colors, modes, tokens, typography } = partialTheme;

  return {
    ...partialTheme,
    vars: mapCSSVars({
      colors: {
        ...colors,
        ...modes.light,
      },
      tokens,
      typography,
    }),
  } as NuiTheme;
};

/**
 * Recursively maps an object to CSS variable strings.
 */
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

/**
 * Recursively flattens an object into a list of CSS variables.
 */
export const flattenCSSVars = (obj: object, prefix = "--nui") => {
  const vars: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newPrefix = `${prefix}-${key}`;

    // Check if the current value is a non-null object
    if (typeof value === "object" && value !== null) {
      // Merge the nested variables into the main variables object
      Object.assign(vars, flattenCSSVars(value, newPrefix));
    } else {
      // If the value is not an object, add it to the vars object with the prefixed key
      vars[newPrefix] = String(value);
    }
  }

  return vars;
};
