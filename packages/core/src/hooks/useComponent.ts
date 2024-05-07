import { deepmerge } from "deepmerge-ts";
import type { NuiBaseTheme, NuiComponentRecipe } from "../types";
import {
  applyComponentCSSVars,
  getComponentClasses,
  getComponentSlotClasses,
} from "../utils";
import { useTheme } from "./useTheme";

type Component<T extends object> = {
  componentProps: T;
  componentSlotProps: Record<string, unknown>;
  componentClasses: string;
};

/**
 * Utility to transform prop names into data attributes if necessary.
 */
const transformPropName = (name: string): string =>
  ["variant", "color"].includes(name) ? `data-${name}` : name;

/**
 * Generates styling and configuration details for a component by:
 * - Merging theme defaults and provided properties.
 * - Calculating class names for the component and its slots.
 * - Applying CSS variables for the component's styles and variants.
 */
export const useComponent = <T extends object>(
  componentId: keyof NuiBaseTheme["components"],
  recipe: NuiComponentRecipe,
  props: T,
): Component<T> => {
  const { theme } = useTheme();
  const componentName = componentId.toLowerCase();
  const componentConfig = theme.components?.[componentId];

  // Merge defaults from recipe, theme, and provided props
  const mergedProps = {
    ...recipe?.defaultProps,
    ...componentConfig?.defaultProps,
    ...props,
  };

  // Merge styles from recipe and theme configurations
  const componentStyles = deepmerge(recipe, componentConfig || {});

  // Generate base and variant-specific class names for the component
  const componentClasses = getComponentClasses(
    componentName,
    componentStyles,
    mergedProps,
  );

  // Generate slot-specific class names
  const componentSlotClasses = getComponentSlotClasses(
    componentName,
    componentStyles,
  );

  // Merge slot props with slot-specific class names
  const componentSlotProps = deepmerge(
    recipe?.slotProps || {},
    componentConfig?.slotProps || {},
    componentSlotClasses,
  );

  // Apply CSS variables for component styles and variants
  applyComponentCSSVars(componentName, mergedProps, theme);

  // Transform prop names for data attributes
  const componentProps = Object.fromEntries(
    Object.entries(mergedProps).map(([propName, propValue]) => [
      transformPropName(propName),
      propValue,
    ]),
  ) as T;

  return {
    componentProps,
    componentClasses,
    componentSlotProps,
  };
};
