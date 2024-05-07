import { type ThemeVarsPartial, create } from "@storybook/theming";

const getThemeVars = (base: "light" | "dark"): ThemeVarsPartial => ({
  base,

  brandTitle: "NEXT UI",
  brandImage: `next-ui-${base}.svg`,
});

export const themes = {
  light: create(getThemeVars("light")),
  dark: create(getThemeVars("dark")),
};
