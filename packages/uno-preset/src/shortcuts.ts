import type { NuiComponentRecipe } from "@next-design-labs/next-ui-core";
import type { UserShortcuts } from "@unocss/core";
import type { Theme } from "@unocss/preset-uno";

import { recipes } from "./recipes";

/**
 * Joins an array of styles into a single string or returns the style string directly.
 */
const joinStyles = (style: string | string[]): string =>
  Array.isArray(style) ? style.join(" ") : style;

/**
 * Creates CSS shortcuts for a given component's styles, including base, parts, and variants.
 */
const createStylesShortcuts = (
  componentName: string,
  recipe: NuiComponentRecipe,
): [string, string][] => {
  const shortcuts: [string, string][] = [];
  const { base, parts, variants } = recipe;

  // Add a shortcut for the base styles if defined
  if (base) {
    shortcuts.push([`${componentName}-base`, joinStyles(base)]);
  }

  // Generate shortcuts for each part in the component
  if (parts) {
    Object.entries(parts).forEach(([partName, styles]) => {
      shortcuts.push([`${componentName}-part-${partName}`, joinStyles(styles)]);
    });
  }

  // Generate shortcuts for each variant and its options
  if (variants) {
    Object.entries(variants).forEach(([variantName, styles]) => {
      Object.entries(styles).forEach(([optionKey, value]) => {
        const prefix =
          componentName === "typography"
            ? "text" // Typography uses "text" as the prefix for its variants
            : `${componentName}-${variantName}`;

        if (typeof value === "string" || Array.isArray(value)) {
          shortcuts.push([`${prefix}-${optionKey}`, joinStyles(value)]);
        }
      });
    });
  }

  return shortcuts;
};

/**
 * Generates CSS shortcuts for all components and their respective styles.
 */
const generateStylesShortcuts = (
  allRecipes: Record<string, NuiComponentRecipe>,
): [string, string][] =>
  Object.entries(allRecipes).flatMap(([componentName, recipe]) =>
    createStylesShortcuts(componentName, recipe),
  );

/**
 * Exports CSS shortcuts for UnoCSS, based on the styles defined in the project.
 * These shortcuts allow easy reference to component styles in templates.
 */
export const shortcuts: UserShortcuts<Theme> = [
  ...generateStylesShortcuts(recipes),
];
