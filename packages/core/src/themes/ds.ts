import { createTheme } from "../theme";

export const dsTheme = createTheme(() => ({
  name: "DS",
  designTokens: {
    font: {
      heading: "Open Sans, sans-serif",
      body: "Open Sans, sans-serif",
    },
  },
  colorTokens: {
    primary: {
      base: {
        light: "#2064B4",
        dark: "#639FE3",
      },
    },
    text: {
      base: {
        light: "#414141",
        dark: "#CCCCCC",
      },
    },
    border: {
      base: {
        light: "#414141",
        dark: "#CCCCCC",
      },
    },
    background: {
      base: {
        light: "#f4f5f5",
        dark: "#282828",
      },
    },
  },
  components: {
    Button: {
      base: ["rounded-sm"],
      defaultProps: {
        radius: "sm",
      },
    },
    Input: {
      defaultProps: {
        radius: "sm",
      },
    },
    Select: {
      defaultProps: {
        variant: "outline",
      },
      parts: {
        root: ["rounded-none"],
        listbox: ["mt-[-1] rounded-none"],
      },
    },
    Tag: {
      defaultProps: {
        radius: "none",
      },
    },
  },
}));
