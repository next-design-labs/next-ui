import { forwardRef } from "react";

import { useComponent } from "../hooks";
import { typographyRecipe } from "../recipes";
import type { NuiVariantProps } from "../types";
import { cx } from "../utils";

export type NuiTypographyProps = React.HTMLAttributes<HTMLElement> &
  NuiVariantProps<typeof typographyRecipe> & {
    variantMapping?: Record<string, React.ElementType>;
  };

export const NuiTypography = forwardRef<HTMLElement, NuiTypographyProps>(
  (props, ref) => {
    const { componentProps, componentClasses } = useComponent(
      "Typography",
      typographyRecipe,
      props,
    );

    const { variant, variantMapping, className, children } = componentProps;

    const Tag = variantMapping?.[variant as string] ?? "p";

    return (
      <Tag className={cx(componentClasses, className)} ref={ref}>
        {children}
      </Tag>
    );
  },
);
