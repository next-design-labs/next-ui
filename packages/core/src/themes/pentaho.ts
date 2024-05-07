import { createTheme } from "../theme";

export const pentahoTheme = createTheme(() => ({
  name: "Pentaho",
  components: {
    Select: {
      slots: {
        root: ["aria-expanded:rounded-b-none"],
        listbox: ["bg-[var(--nui-colors-tmp)] rounded-md rounded-t-none"],
      },
    },
  },
}));
