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
      background: "#f4f5f5",
      container: "#FBFCFC",
      border: "#414141",
      text: "#414141",
    },
    dark: {
      primary: "#639FE3",
      background: "#282828",
      container: "#313131",
      border: "#CCCCCC",
      text: "#CCCCCC",
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
      slots: {
        root: ["rounded-none"],
        listbox: ["mt-[-1] rounded-none"],
      },
    },
  },
}));
