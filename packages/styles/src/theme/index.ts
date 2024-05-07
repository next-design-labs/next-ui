import merge from "deepmerge";

import * as tokens from "../tokens";
import type { DeepPartial } from "../types";
import { mapCSSVars } from "../utils";
import * as components from "./components";
import * as modes from "./modes";

// Combine primitive tokens with default mode's tokens.
const themeTokens = merge(tokens, Object.values(modes)[0]);

// Map the theme tokens to CSS variables for use in styling.
export const theme = mapCSSVars(themeTokens);

// Define the base theme structure, which includes tokens, modes, and components settings.
export const baseTheme = {
  ...tokens,
  modes,
  components,
};

// Define the Theme type extending the baseTheme type and adds a 'name' property.
export type Theme = typeof baseTheme & {
  name: string;
};

// Define the type for a partial theme, which allows partial overrides.
export type PartialTheme = DeepPartial<Theme> & {
  name: string;
};

// Define the type for the theme tokens.
export type ThemeTokens = typeof themeTokens;

// Define the type for a selected theme, including its name and active mode.
export type SelectedTheme = ThemeTokens & {
  name: string;
  mode: string;
};

/**
 * Creates a theme by merging the base theme with provided theme options.
 */
export const createTheme = (
  options: PartialTheme | ((themeTokens: ThemeTokens) => PartialTheme),
) => {
  const themeOptions =
    typeof options === "function" ? options(themeTokens) : options;

  return merge(baseTheme, themeOptions) as Theme;
};
