import { createTheme } from "../theme";

export const pentahoTheme = createTheme(() => ({
  name: "Pentaho",
  components: {
    Select: {
      parts: {
        root: ["aria-expanded:rounded-b-none"],
        listbox: ["bg-tmp rounded-md rounded-t-none"],
      },
    },
  },
}));
