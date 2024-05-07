import { filterTheme, mapCSSVars } from "../utils";
import { colors } from "./colors";
import { modes } from "./modes";
import { tokens } from "./tokens";
import { typography } from "./typography";

export type NuiTheme = {
  name: string;
  colorMode: keyof NuiTheme["modes"];
  colors: typeof colors;
  tokens: typeof tokens;
  typography: typeof typography;
  modes: Record<string, typeof modes.light>;
  components: Record<string, unknown>;
};

export const theme: NuiTheme = {
  name: "base",
  colorMode: "light",
  colors,
  tokens,
  typography,
  modes,
  components: {},
};

// Filter and map theme properties into CSS variables
export const themeVars = mapCSSVars(filterTheme(theme));
