import { colors } from "../../tokens";

const { blue, cyan, green, neutral, red, slate, amber } = colors;

export const light = {
  background: {
    primary: slate[100],
    secondary: slate[200],
    tertiary: slate[300],
    surface: slate[50],
    surfaceSecondary: slate[100],
    disabled: neutral[200],
    overlay: "#0F172A99",
    dimmer: "#FFFFFFCC",
    selected: blue[600],
    selectedDimmed: blue[50],
  },
  text: {
    primary: slate[800],
    secondary: slate[600],
    white: slate[50],
    linkHover: blue[800],
    disabled: neutral[400],
    primaryLink: blue[600],
  },
  border: {
    divider: slate[300],
    subtle: slate[200],
    disabled: neutral[400],
    strong: slate[400],
    hoverSelected: blue[600],
  },
  button: {
    primary: {
      bg: blue[600],
      bgHover: blue[700],
      bgPressed: blue[800],
      label: "#FFFFFF",
      subtleBg: slate[50],
      subtleBorder: blue[300],
      subtleBgHover: blue[100],
      subtleBgPressed: blue[200],
      subtleLabel: blue[600],
    },
    secondary: {
      bg: slate[50],
      bgHover: slate[100],
      bgPressed: slate[200],
      border: slate[300],
      label: slate[800],
    },
    disabled: {
      bg: neutral[200],
      label: neutral[400],
      border: neutral[300],
    },
  },
  status: {
    error: {
      primary: red[600],
      secondary: red[700],
      tertiary: red[800],
      dimmed: red[50],
    },
    warning: {
      primary: amber[600],
      secondary: amber[700],
      tertiary: amber[50],
      dimmed: amber[600],
    },
    success: {
      primary: green[600],
      secondary: green[700],
      tertiary: green[800],
      dimmed: green[50],
    },
    neutral: {
      primary: cyan[500],
      secondary: cyan[600],
      tertiary: cyan[700],
      dimmed: cyan[50],
    },
  },
};
