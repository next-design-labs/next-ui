import { createTheme } from "../theme";

export const ds = createTheme(({ colors }) => ({
  name: "DS",
  modes: {
    light: {
      background: {
        primary: colors.slate[200],
      },
      text: {
        primary: colors.slate[700],
      },
    },
    dark: {
      background: {
        primary: colors.slate[800],
      },
      text: {
        primary: colors.slate[100],
      },
    },
  },
}));
