import { TinyColor } from "@ctrl/tinycolor";

import type { NuiTheme } from "../types";

type ThemeMode = NuiTheme["modes"][keyof NuiTheme["modes"]];
type ColorKey = keyof NuiTheme["colors"];
type ShadeKey = keyof NuiTheme["colors"][ColorKey];

/**
 * Generates color tokens for different visual variants.
 * These tokens define styles for various component states, such as hover, active, and selected.
 */
export const generateColorTokens = (
  theme: NuiTheme,
  variant = "solid",
  color = "primary",
) => {
  // Resolve the base color from the theme.
  const baseColor = resolveColor(theme, color);

  // Determine the best text color (black or white) based on the luminance of the base color.
  const isLightColor = baseColor.getLuminance() > 0.5;
  const textColor = isLightColor ? "#000000" : "#FFFFFF";

  // Utility functions for color transformations
  const darkenColor = (amount: number) =>
    baseColor.darken(amount).toRgbString();
  const applyAlpha = (alpha: number) => baseColor.setAlpha(alpha).toRgbString();

  // Define token styles for different visual variants
  const variantTokens: Record<string, Record<string, string>> = {
    solid: {
      text: textColor,
      background: baseColor.toHexString(),
      border: baseColor.toHexString(),
      hover: darkenColor(10),
      hoverText: textColor,
      active: darkenColor(15),
      activeText: textColor,
      selected: darkenColor(20),
      selectedHover: darkenColor(25),
      selectedText: textColor,
    },
    outline: {
      text: baseColor.toHexString(),
      background: "transparent",
      border: baseColor.toHexString(),
      hover: applyAlpha(0.1),
      hoverText: baseColor.toHexString(),
      active: applyAlpha(0.2),
      activeText: darkenColor(10),
      selected: baseColor.toHexString(),
      selectedHover: baseColor.toHexString(),
      selectedText: textColor,
    },
    ghost: {
      text: baseColor.toHexString(),
      background: "transparent",
      border: "transparent",
      hover: applyAlpha(0.1),
      hoverText: baseColor.toHexString(),
      active: applyAlpha(0.2),
      activeText: darkenColor(10),
      selected: applyAlpha(0.3),
      selectedHover: applyAlpha(0.4),
      selectedText: darkenColor(20),
    },
    link: {
      text: baseColor.toHexString(),
      background: "transparent",
      border: "transparent",
      hover: "transparent",
      hoverText: baseColor.toHexString(),
      active: "transparent",
      activeText: darkenColor(15),
      selected: applyAlpha(0.2),
      selectedHover: applyAlpha(0.3),
      selectedText: darkenColor(20),
    },
    semantic: {
      text: applyAlpha(0.7),
      background: applyAlpha(0.1),
      border: applyAlpha(0.1),
      hover: applyAlpha(0.1),
      hoverText: baseColor.toHexString(),
      active: applyAlpha(0.2),
      activeText: darkenColor(10),
      selected: baseColor.toHexString(),
      selectedHover: baseColor.toHexString(),
      selectedText: textColor,
    },
    categorical: {
      text: applyAlpha(0.7),
      background: applyAlpha(0.1),
      border: applyAlpha(0.1),
      hover: applyAlpha(0.1),
      hoverText: baseColor.toHexString(),
      active: applyAlpha(0.2),
      activeText: darkenColor(10),
      selected: baseColor.toHexString(),
      selectedHover: baseColor.toHexString(),
      selectedText: textColor,
    },
  };

  return variantTokens[variant];
};

/**
 * Resolves a color from the theme by name,
 * falling back to the default color if the name is invalid or not provided.
 */
const resolveColor = (theme: NuiTheme, colorName?: string): TinyColor => {
  const { colors, modes, colorMode } = theme;
  const fallbackColor = modes?.[colorMode]?.primary || "#000000";

  // If no color name is given, use the fallback color
  if (!colorName) return new TinyColor(fallbackColor);

  // Parse color name (e.g., "primary-500") into base color and shade
  const [baseColor, shade] = colorName.split("-");
  const directColor = new TinyColor(colorName);

  // Return if the color name is a valid CSS color
  if (directColor.isValid) return directColor;

  // Retrieve the theme color based on base color and shade if available
  const themeColor =
    colors?.[baseColor as ColorKey]?.[shade as unknown as ShadeKey];

  return new TinyColor(
    themeColor ||
      resolveColorInMode(modes[colorMode], colorName) ||
      fallbackColor,
  );
};

/**
 * Recursively searches for a color within a theme mode's nested structure.
 */
const resolveColorInMode = (
  mode: Partial<ThemeMode>,
  colorName?: string,
): string | undefined => {
  const colorKey = colorName as keyof ThemeMode;

  // Check if color exists directly in the mode
  if (typeof mode[colorKey] === "string") {
    return mode[colorKey] as string;
  }

  // Recursively search nested objects for the color
  for (const nestedValue of Object.values(mode)) {
    if (typeof nestedValue === "object" && nestedValue) {
      const foundColor = resolveColorInMode(nestedValue, colorName);
      if (foundColor) return foundColor;
    }
  }
};
