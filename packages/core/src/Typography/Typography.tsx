import { type NuiTheme, themeVars } from "@next-design-labs/next-ui-styles";
import { forwardRef } from "react";

import { useComponentProps } from "../hooks";

export interface NuiTypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: keyof NuiTheme["typography"];
  variantMapping?: Record<string, React.ElementType>;
}

export const NuiTypography = forwardRef<HTMLElement, NuiTypographyProps>(
  (props, ref) => {
    const {
      children,
      className,
      variant = "body",
      variantMapping,
    } = useComponentProps("NuiTypography", props);
    // Conditionally set the HTML tag based on variant
    const Tag = variantMapping?.[variant] ?? "p";
    // Get the typography styles based on variant
    const typographyStyles = themeVars.typography?.[variant];

    return (
      <Tag className={className} style={typographyStyles} ref={ref}>
        {children}
      </Tag>
    );
  },
);
