import { colors } from "./colors";
import { components } from "./components";
import { modes } from "./modes";
import { tokens } from "./tokens";
import { typography } from "./typography";

import { createTheme } from "../utils";

export type NuiBaseTheme = typeof baseTheme;

export type NuiTheme = NuiBaseTheme & {
  name: string;
  colorMode: keyof typeof modes;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  vars: any;
};

export const baseTheme = {
  colors,
  tokens,
  typography,
  modes,
  components,
};

export const theme = createTheme({
  name: "base",
  colorMode: "light",
});
