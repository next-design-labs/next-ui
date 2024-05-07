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
 * Creates CSS shortcuts for a given component's styles, including base, slots, and variants.
 */
const createStylesShortcuts = (
  componentName: string,
  recipe: NuiComponentRecipe,
): [string, string][] => {
  const shortcuts: [string, string][] = [];
  const { base, slots, variants } = recipe;

  // Add a shortcut for the base styles if defined
  if (base) {
    shortcuts.push([`${componentName}-base`, joinStyles(base)]);
  }

  // Generate shortcuts for each slot in the component
  if (slots) {
    Object.entries(slots).forEach(([slotName, styles]) => {
      shortcuts.push([`${componentName}-slot-${slotName}`, joinStyles(styles)]);
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

        shortcuts.push([`${prefix}-${optionKey}`, joinStyles(value)]);
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
