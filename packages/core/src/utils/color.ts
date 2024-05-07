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
 * Supports customization by theme, variant, and primary color.
 */
export const generateColorVariants = (
  theme: NuiTheme,
  variant: Variant = "solid",
  color = "primary",
): Record<string, string> => {
  // Resolve the base color from the theme
  const baseColor = resolveBaseColor(theme, color);

  // Determine the resolved color key (categorical or mapped semantic color)
  const resolvedColor =
    color in theme.colors
      ? color
      : SEMANTIC_COLOR_MAP.find(({ semantic }) => semantic === color)
          ?.mappedColor;

  //Retrieve the resolved theme color or default to an empty object
  const themeColor = theme.colors[resolvedColor as Color] || {};

  // Step 4: Compute the contrast text color based on the base color's luminance
  const contrastTextColor =
    baseColor.getLuminance() > 0.5 ? "#000000" : "#FFFFFF";

  // Retrieve transformation rules for the specified variant
  const variantRules = theme.variants[variant] || {};

  // Generate color tokens by applying transformations
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

  // Step 7: Return the generated color tokens
  return colorTokens;
};

/**
 * Resolves the base color from the theme using the color name.
 * Falls back to the primary color from the current theme mode if not found.
 */
const resolveBaseColor = (theme: NuiTheme, colorName?: string): TinyColor => {
  const { colors, modes, colorMode } = theme;
  const fallbackColor = modes?.[colorMode]?.primary || "#000000";

  // If no color name is provided, return the fallback color
  if (!colorName) return new TinyColor(fallbackColor);

  // Check if the provided color name is a valid CSS color
  const directColor = new TinyColor(colorName);
  if (directColor.isValid) return directColor;

  // Split the color name into base color and shade (e.g., "blue-500")
  const [baseColor, shade] = colorName.split("-") as [Color, Shade];

  // Resolve the color from the theme or fallback to the default color
  const resolvedColor =
    colors?.[baseColor]?.[shade] ||
    findColorInThemeMode(modes[colorMode], colorName) ||
    fallbackColor;

  return new TinyColor(resolvedColor);
};

/**
 * Searches recursively within a theme mode to find a matching color.
 * Handles deeply nested structures in the mode configuration.
 */
const findColorInThemeMode = (
  mode: Partial<ThemeMode> | undefined,
  colorName?: string,
): string | undefined => {
  if (!mode || !colorName) return undefined;

  // Check if the color exists directly as a key in the mode
  if (typeof mode[colorName as keyof ThemeMode] === "string") {
    return mode[colorName as keyof ThemeMode];
  }

  // Search recursively in nested objects
  for (const value of Object.values(mode)) {
    if (value && typeof value === "object") {
      const foundColor = findColorInThemeMode(
        value as Partial<ThemeMode>,
        colorName,
      );
      if (foundColor) return foundColor;
    }
  }

  return undefined; // Return undefined if no match is found
};

/**
 * Applies transformations to the base color based on the given rule.
 * Supports operations like darkening, transparency, and text color adjustments.
 */
const applyColorTransformation = (
  baseColor: TinyColor,
  rule: string,
  textColor: string,
  themeColor: Record<string, string> = {},
): string => {
  if (rule === "baseColor") {
    return baseColor.toHexString();
  }

  if (rule === "transparent") {
    return "transparent";
  }

  if (rule === "textColor") {
    return textColor;
  }

  const alphaMatch = rule.match(/^alpha\((\d+)\)$/);
  if (alphaMatch) {
    const alphaValue = Number.parseInt(alphaMatch[1], 10) / 100;
    return baseColor.setAlpha(alphaValue).toRgbString();
  }

  const darkenMatch = rule.match(/^darken\((\d+)\)$/);
  if (darkenMatch) {
    const darkenValue = Number.parseInt(darkenMatch[1], 10);
    return baseColor.darken(darkenValue).toRgbString();
  }

  const themeColorMatch = rule.match(/^themeColor\[(\d+)\]$/);
  if (themeColorMatch) {
    const themeKey = themeColorMatch[1];
    return themeColor[themeKey] || "";
  }

  return rule; // Return the rule itself if no transformation is matched
};
