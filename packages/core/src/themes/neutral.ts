import { createTheme } from "../theme";

export const neutralTheme = createTheme(({ colors }) => ({
  name: "Neutral",
  modes: {
    light: {
      primary: colors.slate[800],
      text: colors.slate[950],
      border: "#d4d4d8",
      container: colors.white,
      page: colors.white,
    },
    dark: {
      primary: colors.slate[800],
      text: colors.slate[50],
      border: "#27272a",
      container: colors.black,
      page: colors.black,
    },
  },
  components: {
    Button: {
      base: ["rounded-md"],
      defaultProps: {
        radius: "sm",
      },
    },
    Input: {
      defaultProps: {
        radius: "lg",
      },
    },
    Select: {
      defaultProps: {
        variant: "outline",
      },
      parts: {
        listbox: ["mt-1.5 rounded-[var(--nui-radii-md)]"],
      },
    },
  },
}));
