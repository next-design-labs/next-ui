import { deepmerge } from "deepmerge-ts";

import { type NuiTheme, theme } from "./theme";

// Allows for partial values in an object.
type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

/**
 * Creates a theme by merging the base theme with provided theme options.
 */
export const createTheme = (
  options: DeepPartial<NuiTheme> | ((theme: NuiTheme) => DeepPartial<NuiTheme>),
) => {
  const themeOptions = typeof options === "function" ? options(theme) : options;

  return deepmerge(theme, themeOptions) as NuiTheme;
};

/**
 * Filter and structure theme properties for CSS variable extraction.
 */
export const filterTheme = ({
  colors,
  modes,
  tokens,
  typography,
}: NuiTheme) => ({
  colors: {
    ...colors,
    ...modes.light,
  },
  tokens,
  typography,
});

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
 * Recursively creates a flat object of CSS variables from a nested object.
 */
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
