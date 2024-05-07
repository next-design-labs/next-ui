import { createTheme } from "../theme";

export const ds5 = createTheme(
  ({ colors, fontWeight, fontSize, lineHeight }) => ({
    name: "ds5",
    fontFamily: {
      body: "'Open Sans', sans-serif",
    },
    modes: {
      light: {
        colors: {
          background: colors.slate[100],
        },
      },
      dark: {
        colors: {
          background: colors.slate[900],
        },
      },
    },
    typography: {
      display: {
        color: colors.secondary,
        fontWeight: fontWeight.semibold,
        fontSize: fontSize.xl4,
        lineHeight: lineHeight.xl4,
      },
      title1: {
        color: colors.secondary,
        fontWeight: fontWeight.semibold,
        fontSize: fontSize.xl3,
        lineHeight: lineHeight.xl3,
      },
      title2: {
        color: colors.secondary,
        fontWeight: fontWeight.semibold,
        fontSize: fontSize.xl2,
        lineHeight: lineHeight.xl2,
      },
      title3: {
        color: colors.secondary,
        fontWeight: fontWeight.semibold,
        fontSize: fontSize.xl,
        lineHeight: lineHeight.xl,
      },
      title4: {
        color: colors.secondary,
        fontWeight: fontWeight.semibold,
        fontSize: fontSize.lg,
        lineHeight: lineHeight.lg,
      },
      label: {
        color: colors.secondary,
        fontWeight: fontWeight.semibold,
        fontSize: fontSize.base,
        lineHeight: lineHeight.base,
      },
      body: {
        color: colors.secondary,
        fontWeight: fontWeight.normal,
        fontSize: fontSize.base,
        lineHeight: lineHeight.base,
      },
      captionLabel: {
        color: colors.secondary,
        fontWeight: fontWeight.semibold,
        fontSize: fontSize.sm,
        lineHeight: lineHeight.sm,
      },
      caption1: {
        color: colors.secondary,
        fontWeight: fontWeight.normal,
        fontSize: fontSize.sm,
        lineHeight: lineHeight.sm,
      },
      caption2: {
        color: colors.secondary,
        fontWeight: fontWeight.normal,
        fontSize: fontSize.xs,
        lineHeight: lineHeight.xs,
      },
    },
  }),
);
