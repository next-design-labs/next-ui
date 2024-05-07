import type { NuiTheme } from "@next-design-labs/next-ui-styles";
import { getCSSVarsColors } from "../utils/color";
import { useTheme } from "./useTheme";

export const useComponentProps = <T extends object>(
  componentName: keyof NuiTheme["components"],
  props: T,
): T & { cssVars: Record<string, string> } => {
  const { theme } = useTheme();
  const { defaultProps = {} } = theme.components[componentName] || {};

  const mergedProps = { ...defaultProps, ...props } as T & {
    color?: string;
    variant?: string;
  };

  const cssVarsColors = getCSSVarsColors(theme, mergedProps);

  const cssVars = Object.fromEntries(
    Object.entries(cssVarsColors || {}).map(([key, value]) => [
      `--${componentName.toLowerCase()}-${key}`,
      value,
    ]),
  );

  return {
    ...mergedProps,
    cssVars,
  };
};
