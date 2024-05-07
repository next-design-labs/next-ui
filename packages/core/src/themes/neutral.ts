import { createTheme } from "../theme";

export const neutralTheme = createTheme(({ colors }) => ({
  name: "Neutral",
  modes: {
    light: {
      primary: colors.slate[800],
      background: colors.white,
      container: colors.white,
      border: "#d4d4d8",
      text: colors.slate[950],
    },
    dark: {
      primary: colors.slate[800],
      background: colors.black,
      container: colors.black,
      border: "#27272a",
      text: colors.slate[50],
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
      slots: {
        listbox: ["mt-1.5 rounded-[var(--nui-radii-md)]"],
      },
    },
  },
}));
