import { deepmerge } from "deepmerge-ts";

import type { NuiBaseTheme, NuiDeepPartial, NuiTheme } from "../types";
import { colorModes, mapToCSSVars } from "../utils";
import { colors } from "./colors";
import { designTokens } from "./designTokens";
import { variants } from "./variants";

export * from "./colorTokens";

/**
 * The base theme object for the UI system.
 * Includes:
 * - `colors`: Base color definitions.
 * - `modes`: Color modes (e.g., light and dark).
 * - `tokens`: Design tokens for spacing, typography, etc.
 * - `variants`: Component variants for consistent styling.
 * - `components`: Component-specific styles, initialized as an empty object for extension.
 */
export const baseTheme = {
  colors,
  modes: colorModes,
  tokens: designTokens,
  variants,
  components: {},
};

/**
 * Creates a complete theme by merging custom theme options with the base theme.
 *
 * This allows for flexible theming:
 * - Directly provide partial theme values to override defaults.
 * - Use a function for dynamic computation based on the base theme.
 */
export const createTheme = (
  options:
    | NuiDeepPartial<NuiTheme>
    | ((baseTheme: NuiBaseTheme) => NuiDeepPartial<NuiTheme>),
): NuiTheme => {
  // Resolve custom options: apply the function to the base theme if necessary.
  const customOptions =
    typeof options === "function" ? options(baseTheme) : options;

  // Merge the base theme with the resolved custom options.
  const mergedTheme = deepmerge(baseTheme, customOptions);

  // Return the final, fully merged theme as a `NuiTheme` object.
  return {
    ...mergedTheme,
  } as NuiTheme;
};

/**
 * Converts theme colors and design tokens into CSS variables.
 *
 * This provides CSS variable definitions for:
 * - Colors from the base theme and the default color mode.
 * - Design tokens (e.g., spacing, typography, sizes) for use in styles.
 *
 * The resulting `themeVars` object is used to inject CSS variables into the DOM.
 */
export const themeVars = mapToCSSVars({
  colors: {
    ...colors,
    ...colorModes.light, // Default to the light color mode for CSS variables.
  },
  ...designTokens,
});
