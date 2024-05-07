import { colors } from "../../tokens";

const { blue, cyan, green, neutral, red, slate, yellow } = colors;

export const dark = {
  background: {
    primary: slate[950],
    secondary: slate[900],
    tertiary: slate[800],
    surface: slate[900],
    surfaceSecondary: slate[700],
    disabled: neutral[900],
    overlay: "#0F172A66",
    dimmer: "#00000099",
    selected: blue[600],
    selectedDimmed: blue[950],
  },
  text: {
    primary: slate[50],
    secondary: slate[200],
    white: slate[50],
    linkHover: blue[300],
    disabled: neutral[500],
    primaryLink: blue[400],
  },
  border: {
    divider: slate[700],
    subtle: slate[700],
    disabled: neutral[700],
    strong: slate[500],
    hoverSelected: blue[500],
  },
  button: {
    primary: {
      bg: blue[600],
      bgHover: blue[700],
      bgPressed: blue[800],
      label: "#FFFFFF",
      subtleBg: slate[800],
      subtleBorder: blue[950],
      subtleBgHover: blue[900],
      subtleBgPressed: blue[950],
      subtleLabel: blue[400],
    },
    secondary: {
      bg: slate[800],
      bgHover: slate[900],
      bgPressed: slate[950],
      border: slate[700],
      label: slate[50],
    },
    disabled: {
      bg: neutral[900],
      label: neutral[500],
      border: neutral[700],
    },
  },
  status: {
    error: {
      primary: red[600],
      secondary: red[500],
      tertiary: red[300],
      dimmed: red[950],
    },
    warning: {
      primary: yellow[500],
      secondary: yellow[400],
      tertiary: yellow[300],
      dimmed: yellow[950],
    },
    success: {
      primary: green[600],
      secondary: green[500],
      tertiary: green[300],
      dimmed: green[950],
    },
    neutral: {
      primary: cyan[500],
      secondary: cyan[400],
      tertiary: cyan[300],
      dimmed: cyan[950],
    },
  },
};
