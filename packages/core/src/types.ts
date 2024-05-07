import type { colorTokens } from "./theme/colorTokens";
import type { colors } from "./theme/colors";
import type { designTokens } from "./theme/designTokens";
import type { variantTokens } from "./theme/variantTokens";

/**
 * Represents the full structure of a Nui theme, including base styles,
 * color modes, and configuration for components.
 */
export type NuiTheme = NuiBaseTheme & {
  /** Name of the theme (e.g., "Light", "Dark", "Custom Theme") */
  name: string;
  /** Current active color mode (e.g., "light", "dark") */
  colorMode: string;
  /** Available color modes with their respective properties */
  colorModes: NuiColorModes;
  /** CSS variables for the theme */
  cssVars: NuiThemeVars;
  /** CSS variables for the theme */
  cssVarsList: Record<string, string>;
};

/**
 * Defines the foundational structure for a Nui theme,
 * which includes design tokens, color definitions, and component configurations.
 */
export type NuiBaseTheme = {
  /** Static color definitions for the theme */
  colors: typeof colors;
  /** Tokens for defining semantic colors for various UI elements */
  colorTokens: typeof colorTokens;
  /** Tokens for design aspects (e.g., spacing, typography) */
  designTokens: typeof designTokens;
  /** Tokens for style customizations (e.g., size, appearance) */
  variantTokens: typeof variantTokens;
  /** Configuration for all components in the theme */
  components: Record<string, NuiComponentRecipe>;
};

/**
 * Defines the structure for different color modes within a Nui theme.
 * Each mode contains key-value pairs representing nested color properties.
 */
export type NuiColorModes = {
  [mode: string]: {
    [key: string]: Record<string, string>;
  };
};

/**
 * Theme structure for a Nui application with predefined and arbitrary keys.
 */
export type NuiThemeVars = Partial<typeof designTokens> & {
  colors: Partial<typeof colors>;
};

/**
 * Defines the structure of a component's recipe, which includes base styles,
 * part-specific styles, and style variants.
 */
export type NuiComponentRecipe = {
  /** Base CSS classes applied to the component */
  base?: string[];
  /** CSS classes for specific parts of the component (e.g., input, label) */
  parts?: Record<string, string[]>;
  /** Additional props for specific parts of the component */
  partsProps?: Record<string, Record<string, unknown>>;
  /** Style variants available for the component (e.g., size, color scheme) */
  variants?: Record<string, Record<string, NuiComponentStyles>>;
  /** Default props for the component */
  defaultProps?: Record<string, unknown>;
};

/**
 * Defines the structure of available options for a specific variant.
 * Variants may include simple values, arrays, or nested configuration objects.
 */
export type NuiComponentStyles =
  | {
      base?: string | string[];
      parts?: Record<string, string | string[]>;
    }
  | string
  | string[];

/**
 * Utility type to derive props for a component recipe.
 * Handles variants, parts, base styles, and default properties.
 */
export type NuiRecipeProps<T extends NuiComponentRecipe> = {
  /** Map variants to their allowed values */
  [K in keyof T["variants"]]?: keyof T["variants"][K];
} & {
  /** Optional CSS classes for individual parts of the component */
  parts?: T["parts"] extends Record<string, unknown>
    ? { [P in keyof T["parts"]]?: string | string[] }
    : never;
} & {
  /** Base CSS classes for the component */
  base?: T["base"];
} & {
  /** Default props constrained to match available variants or component-specific props */
  defaultProps?: Partial<T["defaultProps"]>;
};

/**
 * Utility type for creating deeply partial objects.
 * Useful for partially updating nested structures in a type-safe manner.
 */
export type NuiDeepPartial<T extends object> = {
  [K in keyof T]?: T[K] extends object ? NuiDeepPartial<T[K]> : T[K];
};
