import { colors } from "./colors";

const { blue, neutral, slate, red, amber, cyan, green } = colors;

const light = {
  colors: {
    primary: blue[700],
    secondary: neutral[700],
    background: neutral[50],
  },

  text: {
    default: slate[800],
    primary: blue[600],
    secondary: slate[600],
    white: slate[50],
    link: blue[600],
    linkHover: blue[800],
    disabled: neutral[400],
    error: red[600],
    warning: amber[600],
    success: green[600],
    neutral: cyan[600],
  },
};

const dark = {
  colors: {
    primary: blue[400],
    secondary: neutral[300],
    background: neutral[900],
  },

  text: {
    default: slate[50],
    primary: blue[300],
    secondary: slate[100],
    white: slate[50],
    link: blue[300],
    linkHover: blue[200],
    disabled: neutral[400],
    error: red[300],
    warning: amber[300],
    success: green[300],
    neutral: cyan[300],
  },
};

export const modes = {
  light,
  dark,
};
