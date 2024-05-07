import { theme, themes } from "@next-design-labs/next-ui-styles";
import type { ThemeExtender } from "@unocss/core";
import type { Theme } from "@unocss/preset-uno";

const { ds5: baseTheme } = themes;

// #region theme conversion utils
// const { dawn: theme.colors } = theme.colors.modes;
// const { base, ...spacing } = theme.space;

/** breakpoints with added `px` suffix */
const breakpoints = Object.entries(theme.breakpoints.values).map(
  ([key, value]) => [key, `${value}px`] as const
);

const zIndex = Object.entries(theme.zIndex).map(
  ([key, value]) => [key, `${value}`] as const
);
// #endregion

/** Extends the current theme with the NEXT UI utilities */
export const extendTheme: ThemeExtender<Theme> = (baseTheme) => {
  return {
    ...baseTheme,

    borderRadius: {
      DEFAULT: theme.radii.base,
      ...theme.radii,
    },
    breakpoints: Object.fromEntries(breakpoints),
    containers: Object.fromEntries(
      breakpoints.map(([k, v]) => [k, `(min-width: ${v})`])
    ),
    // spacing: {
    //   DEFAULT: spacing.xs,
    //   ...spacing,
    // },
    zIndex: Object.fromEntries(zIndex),

    // colors
    colors: {
      inherit: "inherit",
      current: "currentColor",
      transparent: "transparent",
      black: "#000000",
      white: "#ffffff",
      // using `theme` CSS vars for automatic theme switching, losing alpha + no Provider support
      ...theme.colors,
    },
    accentColor: { DEFAULT: theme.colors.primary },
    textColor: { DEFAULT: theme.colors.secondary },
    backgroundColor: { DEFAULT: theme.colors.background },

    // typography
    fontFamily: {
      body: theme.fontFamily.body,
      sans: theme.fontFamily.body,
      serif: theme.fontFamily.body,
      mono: "monospace",
    },
    lineHeight: { DEFAULT: theme.lineHeight.base, ...theme.lineHeight },
    fontSize: { DEFAULT: theme.fontSize.base, ...theme.fontSize },
    fontWeight: { DEFAULT: theme.fontWeight.normal, ...theme.fontWeight },
  };
};

/** theme mode variants */
export const themeModes = {
  light: {
    colors: {
      ...baseTheme.colors.modes.dawn,
    },
  },
  dark: {
    colors: {
      ...baseTheme.colors.modes.wicked,
    },
  },
};
