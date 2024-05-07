import { createTheme } from "../theme";

export const shadcn = createTheme(({ colors }) => ({
  name: "Shadcn",
  modes: {
    light: {
      bgPage: colors.slate[300],
      text: colors.slate[600],
    },
    dark: {
      bgPage: colors.slate[700],
      text: colors.slate[200],
    },
  },
}));
