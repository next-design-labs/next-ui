import { TinyColor } from "@ctrl/tinycolor";

import type { NuiTheme } from "../types";

type ThemeMode = NuiTheme["modes"][keyof NuiTheme["modes"]];

type Color = keyof NuiTheme["colors"];
type Shade = keyof NuiTheme["colors"][Color];
type Variant = keyof NuiTheme["variants"];

const SEMANTIC_COLOR_MAP = [
  { semantic: "success", mappedColor: "green" },
  { semantic: "warning", mappedColor: "amber" },
  { semantic: "error", mappedColor: "red" },
];

/**
 * Generates a map of color tokens for various component states and styles.
 *
 * This function supports customization based on the provided theme, variant, and primary color.
 * It resolves base colors, applies contrast-based transformations, and computes color tokens
 * based on the theme's variant transformation rules.
 */
export const generateColorTokens = (
  theme: NuiTheme,
  variant: Variant = "solid",
  color = "primary",
): Record<string, string> => {
  // Resolve the base color from the theme
  const baseColor = resolveBaseColor(theme, color);

  // Determine the resolved color key (categorical or semantic)
  const resolvedColor =
    color in theme.colors
      ? color
      : SEMANTIC_COLOR_MAP.find(({ semantic }) => semantic === color)
          ?.mappedColor;

  // Retrieve the resolved theme color or default to an empty object
  const themeColor = theme.colors[resolvedColor as Color] || {};

  // Compute the contrast text color based on the base color's luminance
  const contrastTextColor =
    baseColor.getLuminance() > 0.5 ? "#000000" : "#FFFFFF";

  // Retrieve transformation rules for the specified variant
  const variantRules = theme.variants[variant] || {};

  // Generate color tokens by applying transformation rules
  const colorTokens = Object.fromEntries(
    Object.entries(variantRules).map(([tokenKey, transformationRule]) => [
      tokenKey,
      applyColorTransformation(
        baseColor,
        transformationRule as string,
        contrastTextColor,
        themeColor,
      ),
    ]),
  );

  // Return the generated color tokens
  return colorTokens;
};

/**
 * Resolves the base color from the theme using the specified color name.
 *
 * If the color name is not found in the theme, the function falls back to the primary color
 * of the current theme mode or a default fallback color (`#000000`).
 */
const resolveBaseColor = (theme: NuiTheme, colorName?: string): TinyColor => {
  const { colors, modes, colorMode } = theme;
  const fallbackColor = modes?.[colorMode]?.primary || "#000000";

  // Return the fallback color if no color name is provided
  if (!colorName) return new TinyColor(fallbackColor);

  // Check if the color name is a valid CSS color
  const directColor = new TinyColor(colorName);
  if (directColor.isValid) return directColor;

  // Attempt to split the color name into base color and shade (e.g., "blue-500")
  const [baseColor, shade] = colorName.split("-") as [Color, Shade];

  // Resolve the color from:
  // 1. The theme's color palette (base color and shade)
  // 2. The current theme mode (via `findColorInThemeMode`)
  // 3. The fallback color if no match is found
  const resolvedColor =
    colors?.[baseColor]?.[shade] ||
    findColorInThemeMode(modes[colorMode], colorName) ||
    fallbackColor;

  // Return the resolved color as a TinyColor instance
  return new TinyColor(resolvedColor);
};

/**
 * Recursively searches within a theme mode to find a matching color.
 *
 * This function handles deeply nested structures within the mode configuration,
 * returning the value of a matching color if found.
 */
const findColorInThemeMode = (
  mode: Partial<ThemeMode> | undefined,
  colorName?: string,
): string | undefined => {
  // Return early if the mode or color name is invalid
  if (!mode || !colorName) return undefined;

  // Check if the color exists directly as a key in the mode
  const directMatch = mode[colorName as keyof ThemeMode];
  if (typeof directMatch === "string") {
    return directMatch;
  }

  // Recursively search in nested objects
  for (const value of Object.values(mode)) {
    if (value && typeof value === "object") {
      const foundColor = findColorInThemeMode(
        value as Partial<ThemeMode>,
        colorName,
      );
      if (foundColor) {
        return foundColor;
      }
    }
  }

  // Return undefined if no match is found
  return undefined;
};

/**
 * Applies transformations to the base color based on a specified rule.
 *
 * Supports transformations such as:
 * - Returning the base color
 * - Adjusting transparency
 * - Darkening the color
 * - Returning a theme-based color
 * - Returning a contrast text color
 */
const applyColorTransformation = (
  baseColor: TinyColor,
  rule: string,
  textColor: string,
  themeColor: Record<string, string> = {},
): string => {
  // Return the base color as a hexadecimal string
  if (rule === "baseColor") {
    return baseColor.toHexString();
  }

  // Return transparent color
  if (rule === "transparent") {
    return "transparent";
  }

  // Return the contrast text color
  if (rule === "textColor") {
    return textColor;
  }

  // Match and apply alpha transformation (e.g., "alpha(50)")
  const alphaMatch = rule.match(/^alpha\((\d+)\)$/);
  if (alphaMatch) {
    const alphaValue = Number.parseInt(alphaMatch[1], 10) / 100;
    return baseColor.setAlpha(alphaValue).toRgbString();
  }

  // Match and apply darken transformation (e.g., "darken(10)")
  const darkenMatch = rule.match(/^darken\((\d+)\)$/);
  if (darkenMatch) {
    const darkenValue = Number.parseInt(darkenMatch[1], 10);
    return baseColor.darken(darkenValue).toRgbString();
  }

  // Match and return a theme-specific color (e.g., "themeColor[500]")
  const themeColorMatch = rule.match(/^themeColor\[(\d+)\]$/);
  if (themeColorMatch) {
    const themeKey = themeColorMatch[1];
    return themeColor[themeKey] || "";
  }

  // If no transformation matches, return the rule itself
  return rule;
};
