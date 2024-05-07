import type { NuiComponentConfig, NuiTheme } from "../types";
import { generateColorTokens } from "./color";
import { applyCSSRule } from "./cssVars";

type Variant = keyof NuiTheme["variants"];
type Color = keyof NuiTheme["colors"];

/**
 * Computes variant-specific classes for a component based on its configuration and provided properties.
 *
 * This function evaluates the variants defined in the configuration against the given props
 * to compute the appropriate class names for the base component and its parts.
 */
const getVariantClasses = (
  variants: NuiComponentConfig["variants"] = {},
  props: Record<string, unknown> = {},
) => {
  // Initialize the result object for storing computed classes
  const result = { base: "", parts: {} as Record<string, string> };

  // Iterate over each variant defined in the configuration
  for (const [variantName, variantValues] of Object.entries(variants)) {
    // Retrieve styles for the current variant based on the prop value
    const variantStyles = variantValues[props[variantName] as string];

    // Skip processing if no styles are defined for the current prop value
    if (!variantStyles) continue;

    // Handle different types of variant styles
    if (typeof variantStyles === "string") {
      // Append string styles to the base class
      result.base = `${result.base} ${variantStyles}`.trim();
    } else if (Array.isArray(variantStyles)) {
      // Append array styles to the base class
      result.base = `${result.base} ${variantStyles.join(" ")}`.trim();
    } else if (typeof variantStyles === "object") {
      // Merge object styles into the corresponding parts
      for (const [partName, partValue] of Object.entries(variantStyles)) {
        result.parts[partName] =
          `${result.parts[partName] || ""} ${partValue}`.trim();
      }
    }
  }

  // Return the computed class names for the base and parts
  return result;
};

/**
 * Computes the class names for a component based on its configuration and provided default props.
 *
 * This function combines base styles, part-specific styles, and variant-specific styles
 * into a unified set of class names for the component and its parts.
 */
export const getComponentClasses = (config: NuiComponentConfig) => {
  const { base = [], parts = {}, variants = {}, defaultProps = {} } = config;

  // Compute variant-specific classes using the provided default properties
  const { base: variantBase, parts: variantParts } = getVariantClasses(
    variants,
    defaultProps,
  );

  // Merge base classes with variant-specific base classes
  const mergedBase = [...base, variantBase]
    .filter(Boolean) // Remove falsy values like empty strings or null
    .join(" "); // Combine classes into a single string

  // Merge part-specific classes with variant-specific part classes
  const mergedParts = Object.fromEntries(
    Object.entries(parts).map(([partName, partClasses]) => [
      partName,
      [
        partClasses.join(" "), // Combine static part-specific classes
        variantParts[partName] || "", // Add variant-specific classes if present
      ]
        .filter(Boolean) // Remove falsy values
        .join(" "), // Combine classes into a single string
    ]),
  );

  // Return the computed classes for the base component and its parts
  return {
    base: mergedBase.trim(), // Ensure no leading or trailing whitespace
    parts: mergedParts,
  };
};

/**
 * Computes and organizes properties for a component based on its configuration.
 *
 * This function extracts default properties, properties for specific parts of the component,
 * and converts certain properties (e.g., "variant" and "color") into `data-*` attributes
 * for easier use in the DOM.
 */
export const getComponentProps = (config: NuiComponentConfig) => {
  const { defaultProps: baseProps = {}, partsProps = {} } = config;

  // Convert specific default properties into `data-*` attributes for DOM use
  const dataAttributes = Object.fromEntries(
    Object.entries(baseProps)
      .filter(([key]) => ["variant", "color"].includes(key)) // Filter only 'variant' and 'color' properties
      .map(([key, value]) => [`data-${key}`, value]), // Transform keys to `data-*` attributes
  );

  return {
    base: baseProps, // The default component properties
    parts: partsProps, // Properties for specific component parts
    attributes: dataAttributes, // `data-*` attributes for DOM usage
  };
};

/**
 * Dynamically sets CSS variables for a component based on its variant and color.
 *
 * This function generates CSS rules that define custom properties (`--*`) for
 * the given variant and color, and applies them to elements with matching attributes.
 */
export const applyComponentCSSVars = (
  props: Record<string, unknown>,
  theme: NuiTheme,
): void => {
  const { variant = "solid", color = "primary" } = props;

  // Exit early if either `variant` or `color` is missing
  if (!variant || !color) return;

  // Generate the tokens for the specified variant and color
  const colorTokens =
    generateColorTokens(theme, variant as Variant, color as Color) || {};

  // Convert colorTokens into CSS variable declarations (e.g., `--property: value;`)
  const cssVars = Object.entries(colorTokens)
    .map(([property, value]) => `--${property}: ${value};`)
    .join("\n");

  // Create a CSS selector for the component's `data-variant` and `data-color` attributes
  const selector = `[data-variant="${variant}"][data-color="${color}"]`;

  // Construct the full CSS rule
  const cssRule = `${selector} {\n${cssVars}\n}`;

  // Apply the CSS rule to the document's stylesheet
  applyCSSRule("nui-component-styles", selector, cssRule);
};
