import type { CSSProperties } from "react";
import type * as tokens from "./tokens";

export type NuiTheme = {
  name: string;
  colorMode: string;
  typography: NuiTypography;
  modes: Record<string, NuiColorMode>;
  components: Record<string, unknown>;
} & typeof tokens;

export type NuiColors = typeof tokens.colors;
export type NuiColorShade = keyof (typeof tokens.colors)[keyof NuiColors];

export type NuiTypography = Partial<BaseTypoGraphy> & {
  [key: string]: CSSProperties | undefined;
};

export type NuiColorMode = Partial<BaseColorMode> & {
  [key: string]: string | undefined;
};

type BaseTypoGraphy = {
  display: CSSProperties;
  title1: CSSProperties;
  title2: CSSProperties;
  title3: CSSProperties;
  title4: CSSProperties;
  body: CSSProperties;
  label: CSSProperties;
  captionLabel: CSSProperties;
  caption1: CSSProperties;
  caption2: CSSProperties;
};

type BaseColorMode = {
  // Primary color variations
  primary: string; // Main primary color
  primaryHover: string; // Color for primary action buttons or elements
  primaryDimmed: string; // Dimmed version of the primary color

  // Success color variations
  success: string; // Main success color
  successStrong: string; // Strong or emphasized success color
  successDimmed: string; // Dimmed version of the success color

  // Warning color variations
  warning: string; // Main warning color
  warningStrong: string; // Strong or emphasized warning color
  warningDimmed: string; // Dimmed version of the warning color

  // Error color variations
  error: string; // Main error color
  errorStrong: string; // Strong or emphasized error color
  errorDimmed: string; // Dimmed version of the error color

  // Neutral color variations
  neutral: string; // Main neutral color
  neutralStrong: string; // Strong or emphasized neutral color
  neutralDimmed: string; // Dimmed version of the neutral color

  // Text colors
  text: string; // Default text color
  textDisabled: string; // Color for disabled text

  // Link colors
  link: string; // Default color for links
  linkHover: string; // Color for active or hovered links

  // Background colors
  bgPage: string; // Background color for the page
  bgSurface: string; // Background color for surfaces like cards or modals
  bgDisabled: string; // Background color for disabled elements

  // Divider (border) colors
  divider: string; // Default color for dividers or borders
  dividerStrong: string; // Subtle divider color

  // Dimmer
  dimmer: string; // Color for dimming overlays, or subtle shading

  // Primary Button Tokens
  buttonPrimary: string; // Primary button background
  buttonPrimaryHover: string; // Hover state
  buttonPrimaryPressed: string; // Pressed state

  // Secondary Button Tokens
  buttonSecondary: string; // Secondary button background (same as subtle)
  buttonSecondaryLabel: string; // Label color for secondary button

  // Subtle Button Tokens
  buttonSubtle: string; // Shared background for subtle buttons
  buttonSubtleHover: string; // Hover state for subtle buttons
  buttonSubtlePressed: string; // Pressed state for subtle buttons
  buttonSubtleBorder: string; // Shared border for subtle buttons
  buttonSubtleLabel: string; // Label color for subtle buttons
};
