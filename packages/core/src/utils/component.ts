import type { NuiComponentRecipe, NuiTheme } from "../types";
import { generateColorVariants } from "./color";
import { applyCSSRule } from "./cssVars";

type Variant = keyof NuiTheme["variants"];
type Color = keyof NuiTheme["colors"];

/**
 * Computes variant-specific classes for a component based on its recipe and provided props.
 */
const getVariantClasses = (
  variants: NuiComponentRecipe["variants"] = {},
  props: Record<string, unknown> = {},
) => {
  // Initialize the result object for base and part-specific classes
  const result = { base: "", parts: {} as Record<string, string> };

  // Iterate through each variant to determine matching styles
  for (const [variantName, variantValues] of Object.entries(variants)) {
    const variantStyles = variantValues[props[variantName] as string];

    // Skip if no styles are defined for the current prop value
    if (!variantStyles) continue;

    // Handle different types of variantStyles
    if (typeof variantStyles === "string") {
      // Add string styles to the base class
      result.base = `${result.base} ${variantStyles}`.trim();
    } else if (Array.isArray(variantStyles)) {
      // Add array styles to the base class
      result.base = `${result.base} ${variantStyles.join(" ")}`.trim();
    } else if (typeof variantStyles === "object") {
      // Merge object styles into the corresponding parts
      for (const [partName, partValue] of Object.entries(variantStyles)) {
        result.parts[partName] =
          `${result.parts[partName] || ""} ${partValue}`.trim();
      }
    }
  }

  // Return the computed base and part-specific classes
  return result;
};

/**
 * Computes class names for a component based on its recipe and provided props.
 */
export const getComponentClasses = (config: NuiComponentRecipe) => {
  const { base = [], parts = {}, variants = {}, defaultProps = {} } = config;

  // Get variant-specific classes based on provided defaultProps
  const { base: variantBase, parts: variantParts } = getVariantClasses(
    variants,
    defaultProps,
  );

  // Merge base classes with variant base classes
  const mergedBase = [...base, variantBase]
    .filter(Boolean) // Remove any falsy values (e.g., empty strings or null)
    .join(" "); // Join all classes into a single string

  // Merge part-specific styles with variant-specific part styles
  const mergedParts = Object.fromEntries(
    Object.entries(parts).map(([partName, partValue]) => [
      partName,
      [
        partValue.join(" "), // Join static part classes
        variantParts[partName] || "", // Add variant-specific part classes if available
      ]
        .filter(Boolean) // Remove any falsy values
        .join(" "), // Join all classes into a single string
    ]),
  );

  // Return the computed classes for the component
  return {
    base: mergedBase.trim(), // Ensure no trailing whitespace for the base classes
    ...mergedParts,
  };
};

/**
 * Computes props for a component based on its recipe and provided props.
 */
export const getComponentProps = (config: {
  defaultProps?: Record<string, unknown>;
  partsProps?: Record<string, unknown>;
}): Record<string, unknown> => {
  // Extract default and part-specific props from the config
  const { defaultProps = {}, partsProps = {} } = config;

  // Combine default props under "base" and spread part-specific props
  return {
    ...defaultProps,
    ...partsProps,
  };
};

/**
 * Sets CSS variables for a component's variant and color
 * by generating and applying a CSS rule.
 */
export const applyComponentCSSVars = (
  props: Record<string, unknown>,
  theme: NuiTheme,
): void => {
  const { variant = "solid", color = "primary" } = props;

  if (!variant || !color) return;

  // Retrieve styles for the given variant and color
  const colorVariants =
    generateColorVariants(theme, variant as Variant, color as Color) || {};

  // Convert styles into CSS variable declarations
  const cssVars = Object.entries(colorVariants)
    .map(([property, value]) => `--${property}: ${value};`)
    .join("\n");

  // Generate a selector for the component's variant and color
  const selector = `[data-variant="${variant}"][data-color="${color}"]`;

  // Apply the CSS rule
  const cssRule = `${selector} {\n${cssVars}\n}`;
  applyCSSRule("nui-component-styles", selector, cssRule);
};
