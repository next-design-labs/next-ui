import { createTheme } from "../theme";

export const neutralTheme = createTheme(({ colors }) => ({
  name: "Neutral",
  colorTokens: {
    primary: {
      base: {
        light: colors.slate[800],
        dark: colors.slate[800],
      },
    },
    text: {
      base: {
        light: colors.slate[950],
        dark: colors.slate[50],
      },
    },
    border: {
      base: {
        light: "#d4d4d8",
        dark: "#27272a",
      },
    },
    background: {
      base: {
        light: colors.white,
        dark: colors.black,
      },
      surface: {
        light: colors.white,
        dark: colors.black,
      },
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
