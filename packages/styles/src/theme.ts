import merge from "deepmerge";
import * as tokens from "./tokens";
import type { DeepPartial, Typography } from "./types";
import { mapCSSVars } from "./utils";

// Extract 'modes' (different theme variations) from 'tokens'.
const { modes, ...common } = tokens;

// Select the first available mode as the default theme mode.
const themeMode = Object.values(modes)[0];

// Combine 'common' tokens with default mode's tokens to create the theme spec.
const themeSpec = merge(common, themeMode);

// Define the type for the theme specification.
export type ThemeSpec = typeof themeSpec;

// Define the type for a complete Theme, which includes common tokens, modes, and typography settings.
export type Theme = typeof common & {
  name: string;
  modes: {
    [K in keyof typeof modes]: typeof themeMode;
  };
  typography: Typography;
};

// Define the type for a partial theme, which allows deep partial updates to the theme.
export type PartialTheme = DeepPartial<typeof common> & {
  name: string;
  modes: {
    [K in keyof typeof modes]: DeepPartial<typeof themeMode>;
  };
  typography: Typography;
};

// Define the type for a selected theme, including its name and active mode.
export type SelectedTheme = ThemeSpec & {
  name: string;
  mode: string;
  typography: Typography;
};

/**
 * Creates a complete theme by merging the base theme specification with provided theme options.
 */
export const createTheme = (
  options: PartialTheme | ((themeSpec: ThemeSpec) => PartialTheme),
) => {
  const themeOptions =
    typeof options === "function" ? options(themeSpec) : options;

  return merge(themeSpec, themeOptions) as Theme;
};

// Map the theme specification to CSS variables for use in styling.
export const theme = mapCSSVars(themeSpec);
