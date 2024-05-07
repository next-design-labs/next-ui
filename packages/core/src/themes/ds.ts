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
      container: "#FBFCFC",
      page: "#f4f5f5",
    },
    dark: {
      primary: "#639FE3",
      text: "#CCCCCC",
      border: "#CCCCCC",
      container: "#313131",
      page: "#282828",
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
