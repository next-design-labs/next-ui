import { tokens } from "@next-design-labs/next-ui-styles";
import { type ThemeVarsPartial, create } from "@storybook/theming";

const { modes } = tokens;

const getThemeVars = (base: "light" | "dark"): ThemeVarsPartial => ({
  base,

  brandTitle: "NEXT UI",
  brandImage: `next-ui-${base}.svg`,

  colorPrimary: modes[base].colors.primary,
  colorSecondary: modes[base].colors.secondary,
});

export const themes = {
  light: create(getThemeVars("light")),
  dark: create(getThemeVars("dark")),
};
