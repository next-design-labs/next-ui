import type { NuiComponentRecipe, NuiTheme } from "../types";
import { generateColorTokens } from "./color";
import { applyCSSRule } from "./cssVars";

const isProduction = false; // import.meta.env?.PROD || process.env.NODE_ENV === "production"

/**
 * Returns class names for a component based on its recipe and provided props.
 */
export const getComponentClasses = <T extends object>(
  componentName: string,
  recipe: NuiComponentRecipe,
  props: T,
): string => {
  if (!recipe) return "";

  const { base = [], variants = {} } = recipe;

  // Determine base classes based on environment
  const baseClasses = isProduction ? [`${componentName}-base`] : base;

  // Generate variant-specific classes based on matching props
  const variantClasses = Object.entries(props)
    .filter(
      ([propName, propValue]) =>
        typeof propValue === "string" && variants[propName]?.[propValue],
    )
    .map(([propName, propValue]) => {
      const prefix =
        componentName === "typography" // Temporary handling for typography variants
          ? "text"
          : `${componentName}-${propName}`;

      return isProduction
        ? `${prefix}-${propValue}`
        : variants[propName][propValue as string];
    });

  // Combine base and variant classes into a single string
  return [...baseClasses, ...variantClasses].flat().join(" ");
};

/**
 * Returns slot-specific class names based on the component's recipe.
 */
export const getComponentSlotClasses = (
  componentName: string,
  recipe?: NuiComponentRecipe,
): Record<string, { className: string }> => {
  const { slots = {} } = recipe || {};

  return Object.fromEntries(
    Object.entries(slots).map(([slotName, slotClasses]) => [
      slotName,
      {
        className: isProduction
          ? `${componentName}-slot-${slotName}`
          : slotClasses.join(" "),
      },
    ]),
  );
};

/**
 * Sets CSS variables for a component's variant and color
 * by generating and applying a CSS rule.
 */
export const applyComponentCSSVars = (
  componentName: string,
  props: Record<string, unknown>,
  theme: NuiTheme,
): void => {
  const { variant = "solid", color = "primary" } = props;

  if (!variant || !color) return;

  // Retrieve styles for the given variant and color
  const colorTokens =
    generateColorTokens(theme, variant as string, color as string) || {};

  // Convert styles into CSS variable declarations
  const cssVars = Object.entries(colorTokens)
    .map(([property, value]) => `--tokens-${property}: ${value};`)
    .join("\n");

  // Generate a selector for the component's variant and color
  const selector = `[data-variant="${variant}"][data-color="${color}"]`;

  // Apply the CSS rule
  const cssRule = `${selector} {\n${cssVars}\n}`;
  applyCSSRule("nui-component-styles", selector, cssRule);
};
