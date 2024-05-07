import { forwardRef } from "react";

import { useComponent } from "../hooks";
import { typographyRecipe } from "../recipes";
import type { NuiRecipeProps } from "../types";
import { cx } from "../utils";

export type NuiTypographyProps = React.HTMLAttributes<HTMLElement> &
  NuiRecipeProps<typeof typographyRecipe> & {
    /**
     * Map variants to specific HTML elements or React components.
     */
    variantMapping?: Record<string, React.ElementType>;
  };

export const NuiTypography = forwardRef<HTMLElement, NuiTypographyProps>(
  ({ className, children, variantMapping = {}, ...props }, ref) => {
    const { baseProps, baseStyles } = useComponent(
      "Typography",
      typographyRecipe,
      props,
    );

    const { variant } = baseProps;

    // Determine the tag to use based on variant mapping or default to "p"
    const Tag = variantMapping[variant as keyof typeof variantMapping] ?? "p";

    return (
      <Tag className={cx(baseStyles, className)} ref={ref} {...props}>
        {children}
      </Tag>
    );
  },
);

NuiTypography.displayName = "NuiTypography";
