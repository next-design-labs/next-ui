import { createTheme } from "../theme";

export const dsTheme = createTheme(() => ({
  name: "DS",
  tokens: {
    font: {
      heading: "Open Sans, sans-serif",
      body: "Open Sans, sans-serif",
    },
  },
  modes: {
    light: {
      primary: "#2064B4",
      text: "#414141",
      border: "#414141",
      background: "#f4f5f5",
      backgroundSurface: "#FBFCFC",
    },
    dark: {
      primary: "#639FE3",
      text: "#CCCCCC",
      border: "#CCCCCC",
      background: "#282828",
      backgroundSurface: "#313131",
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
