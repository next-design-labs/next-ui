import { createTheme } from "@next-design-labs/next-ui-core";
import type { ThemeExtender } from "@unocss/core";
import type { Theme } from "@unocss/preset-uno";

// Generate theme variables
const { cssVars } = createTheme();
const {
  colors,
  font,
  fontSize,
  fontWeight,
  lineHeight,
  radii,
  spacing,
  zIndex,
} = cssVars;

/**
 * Adds a `DEFAULT` key to a theme property if a `defaultKey` is provided and exists in the values.
 */
const addDefault = <T extends Record<string, unknown>>(
  values?: T,
  defaultKey?: keyof T,
): T & { DEFAULT?: T[keyof T] } =>
  values && defaultKey && defaultKey in values
    ? { DEFAULT: values[defaultKey], ...values }
    : ({ ...values } as T);

/**
 * Extends the UnoCSS theme with custom properties.
 */
export const extendTheme: ThemeExtender<Theme> = (baseTheme) => ({
  ...baseTheme,
  colors: { ...colors },
  fontFamily: { ...font },
  fontSize: addDefault(fontSize, "base"),
  fontWeight: addDefault(fontWeight, "normal"),
  lineHeight: addDefault(lineHeight, "base"),
  borderRadius: addDefault(radii, "xs"),
  spacing: addDefault(spacing, "base"),
  zIndex: addDefault(zIndex, "base"),
});
