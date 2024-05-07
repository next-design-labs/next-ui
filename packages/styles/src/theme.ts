import merge from "lodash/merge";

import * as themes from "./themes";
import * as tokens from "./tokens";
import type {
  Theme,
  ThemeOptions,
  ThemeSpec,
  Typography,
  TypographyProps,
} from "./types";
import { mapCSSVars } from "./utils";

const typographyProps: TypographyProps = {
  color: "string",
  fontSize: "string",
  letterSpacing: "string",
  lineHeight: "string",
  fontWeight: "string",
  textDecoration: "string",
};

const typography: Typography = {
  typography: {
    display: { ...typographyProps },
    title1: { ...typographyProps },
    title2: { ...typographyProps },
    title3: { ...typographyProps },
    title4: { ...typographyProps },
    label: { ...typographyProps },
    body: { ...typographyProps },
    captionLabel: { ...typographyProps },
    caption1: { ...typographyProps },
    caption2: { ...typographyProps },
  },
};

export const themeSpec = {
  ...tokens,
  colors: {
    scheme: "light",
    background: tokens.colors.light.atmo2,
    ...tokens.colors.common,
    ...tokens.colors.light,
  }, // Flatten colors and add background color
  ...typography,
};

/**
 * Creates a base theme by merging custom theme options with default theme spec.
 */
export const createBaseTheme = (
  options: ThemeOptions | ((theme: ThemeSpec) => ThemeOptions),
) => {
  const customOptions =
    typeof options === "function" ? options(themeSpec) : options;
  // Exclude token colors
  const { colors, ...rest } = tokens;
  const newTheme = merge({}, rest, customOptions);

  return newTheme as Theme;
};

/**
 * Creates a new theme by merging a base theme with custom theme options.
 */
export const createTheme = (options: ThemeOptions) => {
  const { name, base = "ds5", ...rest } = options;
  const newTheme = merge({}, themes[base], { name, base }, rest);

  return newTheme as Theme;
};

// Maps the theme spec to CSS variables.
export const theme = mapCSSVars(themeSpec);
