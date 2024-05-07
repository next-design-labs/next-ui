import { deepmerge } from "deepmerge-ts";

import type { NuiBaseTheme, NuiDeepPartial, NuiTheme } from "../types";
import { mapToCSSVars } from "../utils";
import { colors } from "./colors";
import { modes } from "./modes";
import { tokens } from "./tokens";

export const baseTheme = {
  colors,
  tokens,
  modes,
  components: {},
};

/**
 * Combines custom theme options with the base theme.
 * Accepts partial values or a function that returns them, and produces a complete theme object.
 */
export const createTheme = (
  options:
    | NuiDeepPartial<NuiTheme>
    | ((baseTheme: NuiBaseTheme) => NuiDeepPartial<NuiTheme>),
): NuiTheme => {
  // Determine if options are a function or a direct object and derive theme options
  const customOptions =
    typeof options === "function" ? options(baseTheme) : options;

  // Merge the base theme with the provided custom options
  const mergedTheme = deepmerge(baseTheme, customOptions);

  return {
    ...mergedTheme,
  } as NuiTheme;
};

/**
 * Maps the theme colors and tokens to CSS variables.
 */
export const themeVars = mapToCSSVars({
  colors: {
    ...colors,
    ...modes?.light,
  },
  ...tokens,
});
console.log("🚀 ~ themeVars:", themeVars);
