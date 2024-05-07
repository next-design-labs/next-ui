import type { NuiTheme } from "@next-design-labs/next-ui-styles";

import { useTheme } from "./useTheme";

export const useComponentProps = <T extends object>(
  componentName: keyof NuiTheme["components"],
  props: T,
): T => {
  const { theme } = useTheme();
  const componentProps = theme?.components?.[componentName] ?? {};

  return {
    ...componentProps,
    ...props,
  };
};
