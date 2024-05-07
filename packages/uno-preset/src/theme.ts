import { themeVars } from "@next-design-labs/next-ui-styles";
import type { ThemeExtender } from "@unocss/core";
import type { Theme } from "@unocss/preset-uno";

import { stringifyValues } from "./utils";

const { colors, tokens } = themeVars;

// Extends the current theme with the NEXT UI utilities
export const extendTheme: ThemeExtender<Theme> = (baseTheme) => ({
  ...baseTheme,
  colors: {
    inherit: "inherit",
    current: "currentColor",
    transparent: "transparent",
    black: "#000000",
    white: "#ffffff",
    ...colors,
  },
  fontFamily: {
    body: tokens.fontFamily.body,
  },
  fontSize: {
    DEFAULT: tokens.fontSize.base,
    ...tokens.fontSize,
  },
  fontWeight: {
    DEFAULT: tokens.fontWeight.normal,
    ...tokens.fontWeight,
  },
  lineHeight: {
    DEFAULT: tokens.lineHeight.base,
    ...tokens.lineHeight,
  },
  borderRadius: {
    DEFAULT: tokens.radii.base,
    ...tokens.radii,
  },
  breakpoints: stringifyValues(tokens.breakpoints),
  spacing: stringifyValues(tokens.spacing),
  zIndex: stringifyValues(tokens.zIndex),
});
