import { TinyColor } from "@ctrl/tinycolor";
import type { NuiTheme } from "../types";

type Color = keyof NuiTheme["colors"];
type Shade = keyof NuiTheme["colors"][Color];

/**
 * Resolves a color from the theme based on the given color identifier.
 *
 * The function supports:
 * - Direct color values (e.g., HEX, RGB, named CSS colors)
 * - Theme color identifiers (e.g., "primary-500")
 * - Fallback to a default color if the identifier is not provided or invalid
 */
export const resolveThemeColor = (
  theme: NuiTheme,
  colorKey?: string,
): TinyColor => {
  const { colors, colorModes, colorMode } = theme;
  const defaultColor = colorModes?.[colorMode]?.primary?.base || "#000000";

  // Return the default color if no key is provided.
  if (!colorKey) return new TinyColor(defaultColor);

  // Attempt to parse the key as a direct color (e.g., HEX, RGB, or named CSS color).
  const parsedColor = new TinyColor(colorKey);

  // Return the parsed direct color if it is valid.
  if (parsedColor.isValid) return parsedColor;

  // Split the key into base color and optional shade (e.g., "primary-500").
  const [baseColorName, shade] = colorKey.split("-") as [Color, Shade];

  // Resolve the color from the theme or fall back to the default.
  const resolvedColor = new TinyColor(
    colors?.[baseColorName]?.[shade] || // Attempt to find the color with base name and shade.
      colorModes?.[colorMode]?.[colorKey]?.base || // Check for color mode-specific overrides.
      defaultColor, // Default color if no match is found.
  );

  return resolvedColor;
};

/**
 * Retrieves the color group from the theme based on the given color input.
 *
 * This function checks if the input color directly matches a top-level color name
 * in the theme or if it matches a specific shade within a color group. If a match is found,
 * the corresponding color group is returned; otherwise, an empty object is returned.
 */
export const getThemeColorGroup = (theme: NuiTheme, color: TinyColor) => {
  const { colors } = theme;
  const inputValue = String(color.originalInput).trim();

  // Check if the input directly matches a top-level color name
  if (inputValue in colors) {
    return colors[inputValue as keyof typeof colors];
  }

  // Normalize the input value for case-insensitive comparison
  const normalizedValue = inputValue.toLowerCase();

  // Iterate through all theme colors to find a matching shade or value
  for (const [colorName, shadesOrValue] of Object.entries(colors)) {
    if (typeof shadesOrValue === "object") {
      // Check if any shade in the color group matches the normalized input
      const shadeMatches = Object.values(shadesOrValue).some(
        (hexValue) => hexValue.toLowerCase() === normalizedValue,
      );
      if (shadeMatches) {
        return colors[colorName as keyof typeof colors];
      }
    } else {
      // Check if the top-level color value matches the normalized input
      if (String(shadesOrValue).toLowerCase() === normalizedValue) {
        return colors[colorName as keyof typeof colors];
      }
    }
  }

  // Return an empty object if no matching color group is found
  return {};
};

/**
 * Transforms a base color based on a given transformation rule.
 *
 * The function supports various transformation rules, such as:
 * - `baseColor`: Returns the base color as a hex string.
 * - `transparent`: Returns "transparent".
 * - `textColor`: Returns the fallback text color.
 * - `alpha(x)`: Sets the alpha (opacity) of the base color to x%.
 * - `darken(x)`: Darkens the base color by x%.
 * - `themeColor[x]`: Retrieves a specific shade from the theme color group.
 */
export const transformColor = (
  baseColor: TinyColor,
  themeColorGroup: Record<string, string>,
  transformationRule: string,
  fallbackTextColor: string,
): string => {
  // Handle direct transformation rules.
  if (transformationRule === "baseColor") return baseColor.toHexString();
  if (transformationRule === "transparent") return "transparent";
  if (transformationRule === "textColor") return fallbackTextColor;

  // Match and apply "alpha(x)" rule: set the alpha value of the base color.
  const alphaMatch = transformationRule.match(/^alpha\((\d+)\)$/);
  if (alphaMatch) {
    const alphaPercentage = Number.parseInt(alphaMatch[1], 10) / 100;
    return baseColor.setAlpha(alphaPercentage).toRgbString();
  }

  // Match and apply "darken(x)" rule: darken the base color by x%.
  const darkenMatch = transformationRule.match(/^darken\((\d+)\)$/);
  if (darkenMatch) {
    const darkenPercentage = Number.parseInt(darkenMatch[1], 10);
    return baseColor.darken(darkenPercentage).toRgbString();
  }

  // Match and retrieve "themeColor[x]" rule: fetch the color from the theme map.
  const themeColorMatch = transformationRule.match(/^themeColor\[(\d+)\]$/);
  if (themeColorMatch) {
    // TODO: support only for known theme colors
    const themeKey = themeColorMatch[1];
    return themeColorGroup[themeKey] || "";
  }

  // Return the rule itself if no transformation was applied.
  return transformationRule;
};
