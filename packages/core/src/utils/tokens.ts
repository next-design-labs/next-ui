import type { NuiTheme } from "../types";
import { getThemeColorGroup, resolveThemeColor, transformColor } from "./color";

type ColorTokens = NuiTheme["colorTokens"];
type ColorModes = NuiTheme["colorModes"];
type VariantToken = keyof NuiTheme["variantTokens"];

/**
 * Converts a nested `ColorTokens` object into `ColorModes` structure.
 *
 * Reorganizes the color tokens into a mode-based structure,
 * where each color mode contains the corresponding token and key values.
 */
export const colorTokensToModes = (colorTokens: ColorTokens): ColorModes => {
  const colorModes: ColorModes = {};

  // Iterate over each token name in the colorTokens object.
  for (const [tokenName, tokenValuesByKey] of Object.entries(colorTokens)) {
    // Iterate over each token key (e.g., 'default', 'hover') within the token.
    for (const [tokenKey, colorValuesByMode] of Object.entries(
      tokenValuesByKey,
    )) {
      // Iterate over each mode (e.g., 'light', 'dark') and its corresponding color value.
      for (const [mode, colorValue] of Object.entries(colorValuesByMode)) {
        if (mode === "description") continue; // Skip metadata field 'description'.

        // Ensure the nested structure exists for the current mode, token name, and key.
        colorModes[mode] ??= {}; // Initialize the mode object if not already present.
        colorModes[mode][tokenName] ??= {}; // Initialize the token name object within the mode.

        // Assign the color value to the appropriate location.
        colorModes[mode][tokenName][tokenKey] = colorValue;
      }
    }
  }

  return colorModes;
};

/**
 * Resolves component-specific tokens based on the provided theme and properties.
 *
 * Dynamically computes tokens using the specified `variant` and `color`. Applies transformations
 * to derive additional tokens from the theme's variant definitions.
 */
export const resolveComponentTokens = (
  theme: NuiTheme,
  props: Partial<{ variant: VariantToken; color: string }> = {},
): Record<string, string> => {
  // Extract variant and color with default values.
  const { variant = "solid", color = "primary" } = props;

  // Resolve the color from the theme.
  const baseColor = resolveThemeColor(theme, color);

  // Determine contrast text color for legibility
  const contrastTextColor =
    baseColor.getLuminance() > 0.5 ? "#000000" : "#FFFFFF";

  // Fetch related group of theme colors (e.g., shades)
  const themeColorGroup = getThemeColorGroup(theme, baseColor);

  // Fetch variant token rules
  const variantTokenRules = theme.variantTokens[variant] || {};

  // Compute the resolved tokens by applying the transformation rules.
  return Object.fromEntries(
    Object.entries(variantTokenRules).map(([tokenName, transformationRule]) => [
      tokenName,
      transformColor(
        baseColor,
        themeColorGroup,
        transformationRule,
        contrastTextColor,
      ),
    ]),
  );
};
