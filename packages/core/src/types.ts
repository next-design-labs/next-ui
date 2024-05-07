import type { colors } from "./theme/colors";
import type { modes } from "./theme/modes";
import type { tokens } from "./theme/tokens";

export type NuiTheme = NuiBaseTheme & {
  name: string;
  colorMode: keyof typeof modes;
};

export type NuiBaseTheme = {
  colors: typeof colors;
  tokens: typeof tokens;
  modes: typeof modes;
  components: NuiComponents;
};

export type NuiComponents = Record<string, NuiComponentRecipe>;

export type NuiComponentRecipe = {
  base?: string[];
  variants?: Record<string, NuiVariantOptions>;
  slots?: Record<string, string[]>;
  slotProps?: Record<string, Record<string, unknown>>;
  defaultProps?: Record<string, unknown>;
};

export type NuiVariantOptions = Record<string, string | string[]>;

export type NuiVariantProps<T> = T extends {
  variants?: infer V;
  slots?: infer S;
  base?: infer B;
  defaultProps?: infer D;
}
  ? {
      // Variants
      [K in keyof V]?: keyof V[K];
    } & {
      // Slots
      [K in keyof S]?: string | string[];
    } & {
      // Base styles
      base?: B;
    } & {
      // Default props
      defaultProps?: D;
    }
  : never;

export type NuiDeepPartial<T> = {
  [K in keyof T]?: NuiDeepPartial<T[K]>;
};
