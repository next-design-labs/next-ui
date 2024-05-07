import { deepmerge } from "deepmerge-ts";
import type { NuiBaseTheme, NuiComponentConfig } from "../types";
import {
  applyComponentCSSVars,
  getComponentClasses,
  getComponentProps,
} from "../utils";
import { useTheme } from "./useTheme";

type Component = {
  baseClasses: string;
  baseProps: Record<string, unknown>;
  partsClasses: Record<string, string>;
  partsProps: Record<string, unknown>;
  dataAttributes: Record<string, unknown>;
};

export const useComponent = <T extends Record<string, unknown>>(
  componentId: keyof NuiBaseTheme["components"],
  recipe: NuiComponentConfig,
  props: T,
): Component => {
  const { theme } = useTheme();
  const componentConfig = theme.components?.[componentId];

  const mergedConfig = deepmerge(recipe, componentConfig, {
    defaultProps: props,
  });

  // Get base and part-specific classes
  const { base: baseClasses, parts: partsClasses } =
    getComponentClasses(mergedConfig);

  // Get base and part-specific props and data attributes
  const {
    base: baseProps,
    parts: partsProps,
    attributes: dataAttributes,
  } = getComponentProps(mergedConfig);

  // Apply CSS variables for component styles and variants
  applyComponentCSSVars(baseProps, theme);

  return {
    baseClasses,
    partsClasses,
    baseProps,
    partsProps,
    dataAttributes,
  };
};
