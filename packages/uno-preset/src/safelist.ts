import type { NuiComponentRecipe } from "@next-design-labs/next-ui-core";

import { recipes } from "./recipes";

/**
 * Creates a safelist of CSS class names for a specific component's styles.
 * This includes base, part-specific, and variant-specific class names.
 */
const createStylesSafelist = (
  componentName: string,
  recipe: NuiComponentRecipe,
): string[] => {
  const safelist: string[] = [];
  const { base, parts, variants } = recipe;

  // Add the base class if defined
  if (base) {
    safelist.push(`${componentName}-base`);
  }

  // Add classes for each part in the component
  if (parts) {
    Object.keys(parts).forEach((partName) => {
      safelist.push(`${componentName}-part-${partName}`);
    });
  }

  // Add classes for each variant and its options
  if (variants) {
    Object.entries(variants).forEach(([variantType, variantOptions]) => {
      Object.keys(variantOptions).forEach((option) => {
        const prefix =
          componentName === "typography" // TODO: Remove this once we have a better way to handle typography variants
            ? "text" // Typography uses "text" as the prefix for its variants
            : `${componentName}-${variantType}`;

        return safelist.push(`${prefix}-${option}`);
      });
    });
  }

  return safelist;
};

/**
 * Generates a safelist of CSS class names for all components' styles.
 * This aggregates the safelists for individual components into a single list.
 */
const generateStylesSafelist = (
  allRecipes: Record<string, NuiComponentRecipe>,
): string[] =>
  Object.entries(allRecipes).flatMap(([componentName, recipe]) =>
    createStylesSafelist(componentName, recipe),
  );

/**
 * The safelist of CSS class names for the project, derived from all component styles.
 * This is used to ensure critical CSS classes are preserved during purging or optimization.
 */
export const safelist = [...generateStylesSafelist(recipes)];
