import type { colors } from "./theme/colors";
import type { designTokens } from "./theme/designTokens";
import type { variants } from "./theme/variants";
import type { colorModes } from "./utils/modes";

/**
 * Represents the Nui Theme structure.
 */
export type NuiTheme = NuiBaseTheme & {
  name: string; // Theme name
  colorMode: keyof typeof colorModes; // Current color mode (e.g., light, dark)
};

/**
 * Base structure for a Nui theme.
 */
export type NuiBaseTheme = {
  colors: typeof colors; // Color definitions
  modes: typeof colorModes; // Available modes (e.g., light/dark)
  tokens: typeof designTokens; // Design tokens
  variants: typeof variants; // Variants for components
  components: Record<string, NuiComponentConfig>;
};

/**
 * Represents a single component recipe.
 */
export type NuiComponentConfig = {
  base?: string[]; // Base styles for the component
  parts?: Record<string, string[]>; // Styles for specific parts of the component
  variants?: Record<string, NuiVariantOptions>; // Variants for the component
  partsProps?: Record<string, Record<string, unknown>>; // Additional props for parts
  defaultProps?: Record<string, unknown>; // Default props for the component
};

/**
 * Represents the options available for a variant.
 */
export type NuiVariantOptions = Record<
  string,
  string | string[] | Record<string, string | string[]>
>;

/**
 * Derives variant-specific props and other configurations for a component.
 */
export type NuiVariantProps<T> = T extends {
  variants?: infer V;
  parts?: infer P;
  base?: infer B;
  defaultProps?: infer D;
}
  ? {
      // Variant props
      [K in keyof V]?: keyof V[K];
    } & {
      // Parts props
      [K in keyof P]?: string | string[];
    } & {
      // Base styles
      base?: B;
    } & {
      // Default props
      defaultProps?: D;
    }
  : never;

/**
 * A utility type for deep partials, allowing partial updates of deeply nested objects.
 */
export type NuiDeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? NuiDeepPartial<T[K]> : T[K];
};
