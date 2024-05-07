import { deepmerge } from "deepmerge-ts";
import type { NuiBaseTheme, NuiComponentRecipe } from "../types";
import {
  applyComponentCSSVars,
  getComponentClasses,
  getComponentProps,
} from "../utils";
import { useTheme } from "./useTheme";

type Component = {
  componentClasses: {
    base: string;
    [key: string]: string;
  };
  componentProps: Record<string, unknown>;
  dataAttributes: Record<string, unknown>;
};

/**
 * Utility to transform prop names into data attributes if necessary.
 */
const transformPropName = (name: string): string =>
  ["variant", "color"].includes(name) ? `data-${name}` : name;

export const useComponent = <T extends Record<string, unknown>>(
  componentId: keyof NuiBaseTheme["components"],
  recipe: NuiComponentRecipe,
  props: T,
): Component => {
  const { theme } = useTheme();
  const componentConfig = theme.components?.[componentId];

  const mergedConfig = deepmerge(recipe, componentConfig || {}, {
    defaultProps: props,
  });

  const componentClasses = getComponentClasses(mergedConfig);
  const componentProps = getComponentProps(mergedConfig);

  // Apply CSS variables for component styles and variants
  applyComponentCSSVars(componentProps, theme);

  // Transform prop names for data attributes
  const dataAttributes = Object.fromEntries(
    Object.entries(componentProps).map(([propName, propValue]) => [
      transformPropName(propName),
      propValue,
    ]),
  ) as T;

  return {
    componentClasses,
    componentProps,
    dataAttributes,
  };
};
