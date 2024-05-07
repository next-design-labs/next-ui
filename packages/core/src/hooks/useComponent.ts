import { deepmerge } from "deepmerge-ts";
import type { NuiBaseTheme, NuiComponentRecipe } from "../types";
import {
  applyComponentCSSVars,
  getComponentProps,
  getComponentStyles,
} from "../utils";
import { useTheme } from "./useTheme";

/**
 * Hook for managing a component's configuration, styles, and props.
 *
 * This hook combines the component's configuration from the theme with the provided recipe and props.
 * It generates CSS variables, classes, and extracts props for the base element and its parts.
 */
export const useComponent = <T extends Record<string, unknown>>(
  componentId: keyof NuiBaseTheme["components"],
  recipe: NuiComponentRecipe,
  props: T,
) => {
  const { theme } = useTheme();

  // Retrieve the theme's recipe configuration for the component
  const themeRecipe = theme.components?.[componentId];

  // Merge the component's recipe with the theme's configuration, including component props
  const mergedRecipe = deepmerge(recipe, themeRecipe, {
    defaultProps: props,
  });

  // Compute styles for the component's base and specific parts
  const { baseStyles, partsStyles } = getComponentStyles(mergedRecipe);

  // Compute data attributes and props for the component's base and specific parts
  const { baseProps, partsProps, dataAttributes } =
    getComponentProps(mergedRecipe);

  // Apply CSS variables based on the component's props
  applyComponentCSSVars(theme, baseProps);

  // Return the processed styles, props, and data attributes
  return {
    baseStyles,
    partsStyles,
    baseProps,
    partsProps,
    dataAttributes,
  };
};
