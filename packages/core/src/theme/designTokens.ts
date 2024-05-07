const systemFont = `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;
const monoFont = `"SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;

const breakpoints = {
  xs: "0",
  sm: "600px",
  md: "960px",
  lg: "1270px",
  xl: "1920px",
};

const fontSize = {
  xs: "0.625rem",
  sm: "0.75rem",
  base: "0.875rem",
  lg: "1rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "2rem",
  "4xl": "2.625rem",
};

const fontWeight = {
  hairline: "100",
  thin: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
};

const font = {
  heading: `"Inter", ${systemFont}`,
  body: `"Inter", ${systemFont}`,
  mono: `"Fira Mono", ${monoFont}`,
};

const lineHeight = {
  none: "1.3125rem",
  xs: "1rem",
  sm: "1.125rem",
  base: "1.3125rem",
  lg: "1.5rem",
  xl: "1.875rem",
  "2xl": "2.25rem",
  "3xl": "3rem",
  "4xl": "3.9375rem",
};

const radii = {
  none: "0",
  xs: "0.125rem",
  sm: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "1rem",
  full: "9999px",
  circle: "50%",
};

const sizes = {
  xs: "1.75rem",
  sm: "2rem",
  md: "2.25rem",
  lg: "2.5rem",
  xl: "2.75rem",
};

const spacing = {
  base: "0.5rem",
  xs: "0.5rem",
  sm: "1rem",
  md: "1.5rem",
  lg: "3rem",
  xl: "5rem",
};

const zIndex = {
  hide: "-1",
  base: "0",
  docked: "10",
  dropdown: "1000",
  sticky: "1100",
  banner: "1200",
  overlay: "1300",
  modal: "1400",
  popover: "1500",
  skipNav: "1600",
  toast: "1700",
  tooltip: "1800",
  max: "2147483647",
};

export const opacity = {
  full: "1",
  high: "0.8",
  medium: "0.6",
  low: "0.4",
  subtle: "0.2",
  none: "0",
};

export const designTokens = {
  breakpoints,
  fontSize,
  fontWeight,
  font,
  lineHeight,
  radii,
  sizes,
  spacing,
  zIndex,
  opacity,
};
