import { deepmerge } from "deepmerge-ts";

import type { NuiBaseTheme, NuiDeepPartial, NuiTheme } from "../types";
import { colorTokensToModes, generateCSSVariables } from "../utils";
import { colorTokens } from "./colorTokens";
import { colors } from "./colors";
import { designTokens } from "./designTokens";
import { variantTokens } from "./variantTokens";

/**
 * The foundational theme object for the UI system.
 * It includes:
 * - `baseColors`: Fundamental color definitions.
 * - `colorTokens`: Tokens representing semantic colors.
 * - `designTokens`: Tokens for spacing, typography, and other design aspects.
 * - `variantTokens`: Tokens for style customizations (e.g., size, appearance).
 * - `components`: Component-specific style configurations, initialized as an empty object for extension.
 */
export const baseTheme = {
  colors,
  colorTokens,
  designTokens,
  variantTokens,
  components: {},
};

/**
 * Creates a complete Nui theme by merging user-defined theme options with the base theme.
 *
 * This function allows flexible theming:
 * - Override specific default values using a partial theme object.
 * - Dynamically compute custom options using a function with the base theme as input.
 *
 * The resulting theme includes:
 * - Merged base and custom options.
 * - Derived color modes (e.g., light and dark) based on color tokens.
 * - CSS variables generated from the final theme.
 */
export const createTheme = (
  options?:
    | NuiDeepPartial<NuiTheme>
    | ((baseTheme: NuiBaseTheme) => NuiDeepPartial<NuiTheme>),
): NuiTheme => {
  // If a function is provided, compute the options based on the base theme.
  const resolvedOptions =
    typeof options === "function" ? options(baseTheme) : options;

  // Merge the base theme with the resolved custom options.
  const mergedTheme = deepmerge(baseTheme, resolvedOptions) as NuiTheme;

  // Generate color modes (e.g., light/dark) from color tokens.
  const colorModes = colorTokensToModes(mergedTheme.colorTokens);

  // Generate CSS variables for theming.
  const { cssVars, cssVarsList } = generateCSSVariables(
    mergedTheme,
    colorModes,
  );

  return {
    ...mergedTheme,
    colorModes,
    cssVars,
    cssVarsList,
  } as NuiTheme;
};
