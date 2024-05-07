import { colors } from "./colors";

export const modes = {
  light: {
    primary: colors.blue[600],
    success: colors.green[600],
    warning: colors.amber[500],
    error: colors.red[600],
    neutral: colors.slate[300],
    text: colors.slate[700],
    link: colors.blue[600],
    bgPage: colors.slate[100],
  },
  dark: {
    primary: colors.blue[400],
    success: colors.green[400],
    warning: colors.amber[400],
    error: colors.red[400],
    neutral: colors.slate[600],
    text: colors.slate[200],
    link: colors.blue[400],
    bgPage: colors.slate[900],
  },
};
