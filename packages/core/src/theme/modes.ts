import { colors } from "./colors";

const light = {
  primary: colors.blue[600],
  secondary: colors.slate[700],
  success: colors.emerald[600],
  warning: colors.amber[500],
  error: colors.red[600],
  neutral: colors.sky[50],
  text: colors.slate[700],
  border: colors.slate[300],
  container: colors.white,
  page: colors.slate[100],
};

const dark = {
  primary: colors.blue[600],
  secondary: colors.slate[50],
  success: colors.emerald[600],
  warning: colors.yellow[500],
  error: colors.red[600],
  neutral: colors.cyan[500],
  text: colors.slate[50],
  border: colors.slate[700],
  container: colors.black,
  page: colors.slate[950],
};

export const modes = {
  light,
  dark,
};
