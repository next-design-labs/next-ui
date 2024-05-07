import { deepmerge } from "deepmerge-ts";

import { baseTheme } from "./themes/base";
import type { NuiColorMode, NuiTheme } from "./types";
import { type DeepPartial, mapCSSVars } from "./utils";

// Destructure the theme object to exclude not needed properties for CSS variables
const { name, colorMode, modes, components, ...rest } = baseTheme;

// Maps CSS variables from the theme object
export const themeVars = mapCSSVars({
  ...rest,
  ...modes[colorMode as keyof NuiColorMode],
});

// Creates a theme by merging the base theme with provided theme options.
export const createTheme = (
  options:
    | DeepPartial<NuiTheme>
    | ((baseTheme: NuiTheme) => DeepPartial<NuiTheme>),
) => {
  const themeOptions =
    typeof options === "function" ? options(baseTheme) : options;

  return deepmerge(baseTheme, themeOptions) as NuiTheme;
};
