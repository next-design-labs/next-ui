import { createTheme } from "../theme";

export const ds = createTheme(({ colors }) => ({
  name: "DS",
  modes: {
    light: {
      bgPage: colors.slate[200],
      text: colors.slate[700],
    },
    dark: {
      bgPage: colors.slate[800],
      text: colors.slate[100],
    },
  },
}));
