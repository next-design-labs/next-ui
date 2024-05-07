import { themeVars } from "@next-design-labs/next-ui-core";
import type { ThemeExtender } from "@unocss/core";
import type { Theme } from "@unocss/preset-uno";

const {
  colors,
  font,
  fontSize,
  fontWeight,
  lineHeight,
  radii,
  spacing,
  zIndex,
} = themeVars;

export const extendTheme: ThemeExtender<Theme> = (baseTheme) => ({
  ...baseTheme,
  colors: {
    ...colors,
  },
  fontFamily: {
    ...font,
  },
  fontSize: {
    DEFAULT: fontSize.base,
    ...fontSize,
  },
  fontWeight: {
    DEFAULT: fontWeight.normal,
    ...fontWeight,
  },
  lineHeight: {
    DEFAULT: lineHeight.base,
    ...lineHeight,
  },
  borderRadius: {
    DEFAULT: radii.xs,
    ...radii,
  },
  spacing: {
    DEFAULT: spacing.base,
    ...spacing,
  },
  zIndex: {
    DEFAULT: zIndex.base,
    ...zIndex,
  },
});
