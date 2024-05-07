import type { themeSpec } from "../theme";
import type { colors } from "../tokens";

type Base = "ds5" | "ds3";

type ColorScheme = "light" | "dark";

type Colors = typeof colors.common & typeof colors.light;

type ThemeColorMode = Colors & {
  backgroundColor: string;
  containerBackgroundHover: string;
  scheme: ColorScheme;
};

export type ThemeSpec = typeof themeSpec;

export interface Theme extends Omit<ThemeSpec, "colors"> {
  name: string;
  base?: Base;
  colors: {
    modes: Record<string, ThemeColorMode>;
  };
}

export interface ThemeOptions extends Partial<Omit<ThemeSpec, "colors">> {
  name: string;
  base?: Base;
  colors: {
    modes: Record<string, Partial<ThemeColorMode>>;
  };
}
