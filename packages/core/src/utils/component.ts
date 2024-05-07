import type {
  NuiComponentRecipe,
  NuiComponentStyles,
  NuiTheme,
} from "../types";
import { applyCSSRule, generateCSSRule, toCSSVarsList } from "./cssVars";
import { resolveComponentTokens } from "./tokens";

/**
 * Computes the class names for a component based on its recipe configuration.
 *
 * This function aggregates:
 * - Base styles applicable to the entire component.
 * - Part-specific styles for targeted sub-elements.
 * - Variant styles, determined by the selected variants in default props.
 *
 * The output provides consolidated class names for both the component's base and its parts.
 */
export const getComponentStyles = (recipe: NuiComponentRecipe) => {
  const { base = [], parts = {}, variants = {}, defaultProps = {} } = recipe;

  // Collect base styles and initialize part-specific styles
  const baseClasses = [...base];
  const partClasses = { ...parts };

  // Add styles for selected variants
  for (const [variant, variantOptions] of Object.entries(variants)) {
    const selectedOption = defaultProps[variant] as string | undefined;
    const variantStyles = selectedOption && variantOptions[selectedOption];

    if (variantStyles) {
      mergeVariantStyles(variantStyles, baseClasses, partClasses);
    }
  }

  // Convert part-specific class arrays to strings
  const formattedPartClasses = Object.fromEntries(
    Object.entries(partClasses).map(([part, classes]) => [
      part,
      classes.join(" "),
    ]),
  );

  return {
    baseStyles: baseClasses.join(" "),
    partsStyles: formattedPartClasses,
  };
};

/**
 * Merges variant-specific styles into the base and part-specific styles.
 *
 * - Adds `base` styles directly to the `baseClasses`.
 * - Combines `parts` styles with existing part-specific classes.
 */
const mergeVariantStyles = (
  variantStyles: NuiComponentStyles,
  baseClasses: string[],
  partClasses: Record<string, string[]>,
) => {
  if (typeof variantStyles === "string") {
    // Append a single style directly to base classes
    baseClasses.push(variantStyles);
    return;
  }

  if (Array.isArray(variantStyles)) {
    // Append multiple styles to base classes
    baseClasses.push(...variantStyles);
    return;
  }

  if (typeof variantStyles === "object" && variantStyles !== null) {
    // Merge base styles if defined
    if (variantStyles.base) {
      baseClasses.push(...variantStyles.base);
    }

    // Merge styles for specific parts if defined
    for (const [partName, partValues] of Object.entries(
      variantStyles.parts || {},
    )) {
      partClasses[partName] = [
        ...(partClasses[partName] || []),
        ...(partValues as string[]),
      ];
    }
  }
};

/**
 * Computes and organizes properties for a component based on its configuration.
 *
 * Extracts default properties, properties for specific parts of the component,
 * and converts certain properties (e.g., "variant" and "color") into `data-*` attributes
 * for easier use in the DOM.
 */
export const getComponentProps = (config: NuiComponentRecipe) => {
  const { defaultProps: baseProps = {}, partsProps = {} } = config;

  // Transform specific base properties into `data-*` attributes for DOM usage
  const dataAttributes = Object.fromEntries(
    Object.entries(baseProps)
      .filter(([key]) => ["variant", "color"].includes(key)) // Filter only 'variant' and 'color' properties
      .map(([key, value]) => [`data-${key}`, value]), // Transform keys to `data-*` attributes
  );

  return {
    baseProps, // The default component properties
    partsProps, // Properties for specific component parts
    dataAttributes, // `data-*` attributes for DOM usage
  };
};

/**
 * Generates and applies CSS variables for the specified component.
 *
 * Combines component 'variant' and 'color' to create CSS variables.
 * These variables are applied as a CSS rule targeting the component's `data-variant` and `data-color` attributes.
 */
export const applyComponentCSSVars = (
  theme: NuiTheme,
  props: Record<string, unknown>,
): void => {
  const { variant = "solid", color = "primary" } = props;

  // Resolve tokens for the specified variant and color
  const componentTokens = resolveComponentTokens(theme, props);

  // Create a CSS selector for the component's `data-variant` and `data-color` attributes
  const selector = `[data-variant="${variant}"][data-color="${color}"]`;

  // Construct the full CSS rule
  const cssRule = generateCSSRule(selector, toCSSVarsList(componentTokens));

  // Apply the CSS rule to the document's stylesheet
  applyCSSRule("nui-component-styles", selector, cssRule);
};
