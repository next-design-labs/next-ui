import { createTheme } from "../theme";

export const shadcn = createTheme(({ colors }) => ({
  name: "Shadcn",
  modes: {
    light: {
      background: {
        primary: colors.slate[300],
      },
      text: {
        primary: colors.slate[600],
      },
    },
    dark: {
      background: {
        primary: colors.slate[700],
      },
      text: {
        primary: colors.slate[200],
      },
    },
  },
}));
