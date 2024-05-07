import { themeVars } from "@next-design-labs/next-ui-styles";
import type { ThemeExtender } from "@unocss/core";
import type { Theme } from "@unocss/preset-uno";

import { extractColorTokens, stringifyValues } from "./utils";

// Extends the current theme with the NEXT UI utilities
export const extendTheme: ThemeExtender<Theme> = (baseTheme) => ({
  ...baseTheme,
  colors: {
    inherit: "inherit",
    current: "currentColor",
    transparent: "transparent",
    black: "#000000",
    white: "#ffffff",
    ...extractColorTokens(themeVars),
    ...themeVars.colors,
  },
  fontFamily: {
    body: themeVars.fontFamily.body,
  },
  fontSize: {
    DEFAULT: themeVars.fontSize.base,
    ...themeVars.fontSize,
  },
  fontWeight: {
    DEFAULT: themeVars.fontWeight.normal,
    ...themeVars.fontWeight,
  },
  lineHeight: {
    DEFAULT: themeVars.lineHeight.base,
    ...themeVars.lineHeight,
  },
  borderRadius: {
    DEFAULT: themeVars.radii.base,
    ...themeVars.radii,
  },
  breakpoints: stringifyValues(themeVars.breakpoints),
  spacing: stringifyValues(themeVars.spacing),
  zIndex: stringifyValues(themeVars.zIndex),
});
