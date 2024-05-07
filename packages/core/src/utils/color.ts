import { TinyColor } from "@ctrl/tinycolor";
import type { NuiTheme } from "@next-design-labs/next-ui-styles";

type ThemeModes = NuiTheme["modes"];
type ThemeMode = ThemeModes[keyof ThemeModes];

type ThemeColor = keyof NuiTheme["colors"];
type ThemeShade = keyof NuiTheme["colors"][ThemeColor];

/**
 * Recursively searches for a color in a nested color mode object.
 */
const getModeColor = (
  mode: Partial<ThemeMode>,
  color?: string,
): string | undefined => {
  const colorKey = color as keyof ThemeMode;

  // Check if the color exists as a direct property of the mode
  if (typeof mode[colorKey] === "string") {
    return mode[colorKey] as string;
  }

  // Recursively search for the color in nested objects
  for (const modeValue of Object.values(mode)) {
    if (typeof modeValue === "object" && modeValue) {
      const foundColor = getModeColor(modeValue, color);
      if (foundColor) return foundColor;
    }
  }

  return undefined; // Return undefined if the color is not found
};

/**
 * Resolves and returns a valid color from the theme. If the provided color is not valid,
 * it tries to resolve it from the theme's color modes.
 */
const getValidColor = (theme: NuiTheme, color?: string): TinyColor => {
  const { colors, modes, colorMode } = theme;
  const fallbackColor = modes[colorMode]?.primary || "#000000";

  // Return fallback color if no color is provided
  if (!color) return new TinyColor(fallbackColor);

  // Split the color into baseColor and shade (e.g., "blue-500")
  const [baseColor, shade] = color.split("-");

  // Return the color if it's a valid CSS color
  const inputColor = new TinyColor(color);
  if (inputColor.isValid) return inputColor;

  // Check for a color defined in the theme using baseColor and shade
  const themeColor =
    colors?.[baseColor as ThemeColor]?.[
      shade as unknown as unknown as ThemeShade
    ];

  // Return theme color, mode-specific color, or fallback color
  return new TinyColor(
    themeColor || getModeColor(modes[colorMode], color) || fallbackColor,
  );
};

type Variant = "solid" | "outline" | "ghost" | "link";

/**
 * Generates CSS color variables based on the provided color and style variant.
 */
export const getCSSVarsColors = (
  theme: NuiTheme,
  { color, variant = "solid" }: { color?: string; variant?: string },
) => {
  const baseColor = new TinyColor(getValidColor(theme, color));
  const luminance = baseColor.getLuminance();
  const textColor = luminance > 0.5 ? "#000000" : "#FFFFFF"; // Light/dark contrast

  const darkenBy = (amount: number) => baseColor.darken(amount).toHexString();
  const alphaBy = (alpha: number) => baseColor.setAlpha(alpha).toRgbString();

  const commonVars = {
    text: textColor,
    background: baseColor.toHexString(),
    border: baseColor.toHexString(),
    hover: darkenBy(5),
    hoverText: textColor,
    active: darkenBy(10),
    activeText: textColor,
    selected: darkenBy(15),
    selectedHover: darkenBy(20),
    selectedText: textColor,
  };

  const variantStyles: Record<Variant, typeof commonVars> = {
    solid: commonVars,
    outline: {
      text: baseColor.toHexString(),
      background: "transparent",
      border: baseColor.toHexString(),
      hover: alphaBy(0.1),
      hoverText: baseColor.toHexString(),
      active: alphaBy(0.2),
      activeText: darkenBy(10),
      selected: darkenBy(15),
      selectedHover: darkenBy(5),
      selectedText: textColor,
    },
    ghost: {
      text: baseColor.toHexString(),
      background: "transparent",
      border: "transparent",
      hover: alphaBy(0.1),
      hoverText: baseColor.toHexString(),
      active: alphaBy(0.2),
      activeText: darkenBy(10),
      selected: alphaBy(0.3),
      selectedHover: alphaBy(0.4),
      selectedText: darkenBy(20),
    },
    link: {
      text: baseColor.toHexString(),
      background: "transparent",
      border: "transparent",
      hover: "transparent",
      hoverText: darkenBy(10),
      active: "transparent",
      activeText: darkenBy(15),
      selected: alphaBy(0.2),
      selectedHover: alphaBy(0.3),
      selectedText: darkenBy(20),
    },
  };

  return variantStyles[variant as Variant];
};
