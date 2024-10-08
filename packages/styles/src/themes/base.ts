import * as tokens from "../tokens";
import type { NuiTheme } from "../types";

const { colors, fontWeight, fontSize, lineHeight } = tokens;

// Base theme structure that includes tokens, components, and modes.
export const baseTheme: NuiTheme = {
  name: "base",
  colorMode: "light",
  ...tokens,
  typography: {
    display: {
      fontWeight: fontWeight.semibold,
      fontSize: fontSize.xl4,
      lineHeight: lineHeight.xl4,
    },
    title1: {
      fontWeight: fontWeight.semibold,
      fontSize: fontSize.xl3,
      lineHeight: lineHeight.xl3,
    },
    title2: {
      fontWeight: fontWeight.semibold,
      fontSize: fontSize.xl2,
      lineHeight: lineHeight.xl2,
    },
    title3: {
      fontWeight: fontWeight.semibold,
      fontSize: fontSize.xl,
      lineHeight: lineHeight.xl,
    },
    title4: {
      fontWeight: fontWeight.semibold,
      fontSize: fontSize.lg,
      lineHeight: lineHeight.lg,
    },
    body: {
      fontWeight: fontWeight.normal,
      fontSize: fontSize.base,
      lineHeight: lineHeight.base,
    },
    label: {
      fontWeight: fontWeight.semibold,
      fontSize: fontSize.base,
      lineHeight: lineHeight.base,
    },
    captionLabel: {
      fontWeight: fontWeight.semibold,
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
    },
    caption1: {
      fontWeight: fontWeight.normal,
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
    },
    caption2: {
      fontWeight: fontWeight.normal,
      fontSize: fontSize.xs,
      lineHeight: lineHeight.xs,
    },
  },
  modes: {
    light: {
      primary: colors.blue[600],
      primaryHover: colors.blue[700],
      primaryDimmed: colors.blue[100],
      success: colors.green[600],
      successStrong: colors.green[700],
      successDimmed: colors.green[50],
      warning: colors.amber[500],
      warningStrong: colors.amber[600],
      warningDimmed: colors.amber[50],
      error: colors.red[600],
      errorStrong: colors.red[700],
      errorDimmed: colors.red[50],
      neutral: colors.slate[300],
      neutralStrong: colors.slate[500],
      neutralDimmed: colors.slate[100],
      text: colors.slate[700],
      textDisabled: colors.slate[400],
      link: colors.blue[600],
      linkHover: colors.blue[700],
      bgPage: colors.slate[100],
      bgSurface: colors.slate[50],
      bgDisabled: colors.slate[200],
      divider: colors.slate[300],
      dividerStrong: colors.slate[400],
      buttonPrimary: colors.blue[600],
      buttonPrimaryHover: colors.blue[700],
      buttonPrimaryPressed: colors.blue[800],
      buttonSecondary: colors.slate[50],
      buttonSecondaryLabel: colors.slate[800],
      buttonSubtle: colors.slate[50],
      buttonSubtleHover: colors.blue[100],
      buttonSubtlePressed: colors.blue[200],
      buttonSubtleBorder: colors.slate[300],
      buttonSubtleLabel: colors.blue[600],
    },
    dark: {
      primary: colors.blue[400],
      primaryHover: colors.blue[300],
      primaryDimmed: colors.blue[700],
      success: colors.green[400],
      successStrong: colors.green[300],
      successDimmed: colors.green[700],
      warning: colors.amber[400],
      warningStrong: colors.amber[300],
      warningDimmed: colors.amber[700],
      error: colors.red[400],
      errorStrong: colors.red[300],
      errorDimmed: colors.red[700],
      neutral: colors.slate[600],
      neutralStrong: colors.slate[500],
      neutralDimmed: colors.slate[700],
      text: colors.slate[200],
      textDisabled: colors.slate[500],
      link: colors.blue[400],
      linkHover: colors.blue[300],
      bgPage: colors.slate[900],
      bgSurface: colors.slate[800],
      bgDisabled: colors.slate[700],
      divider: colors.slate[700],
      dividerStrong: colors.slate[600],
      buttonPrimary: colors.blue[400],
      buttonPrimaryHover: colors.blue[300],
      buttonPrimaryPressed: colors.blue[200],
      buttonSecondary: colors.slate[800],
      buttonSecondaryLabel: colors.slate[200],
      buttonSubtle: colors.slate[800],
      buttonSubtleHover: colors.slate[700],
      buttonSubtlePressed: colors.slate[600],
      buttonSubtleBorder: colors.slate[700],
      buttonSubtleLabel: colors.blue[400],
    },
  },
  components: {
    NuiTypography: {
      variant: "body",
      variantMapping: {
        display: "h1",
        title1: "h1",
        title2: "h2",
        title3: "h3",
        title4: "h4",
        body: "p",
        label: "p",
        captionLabel: "p",
        caption1: "p",
        caption2: "p",
      },
    },
  },
};
