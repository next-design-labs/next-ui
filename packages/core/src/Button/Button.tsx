import {
  Button as MuiButton,
  type ButtonProps as MuiButtonProps,
} from "@mui/base/Button";
import { forwardRef } from "react";

import { Loader } from "../Loader";
import { useComponentProps } from "../hooks";
import { type VariantProps, cva, cx } from "../utils";
import { getLoaderColor } from "./utils";

export const buttonVariants = cva({
  base: [
    "flex items-center justify-center transition-all focus:z-10 border",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:(outline-none ring-4 ring-offset-0)",
    "bg-[var(--button-background)]",
    "text-[var(--button-text)]",
    "border-[var(--button-border)]",
    "hover:(bg-[var(--button-hover)] text-[var(--button-hoverText)])",
    "active:bg-[var(--button-active)]",
  ],
  variants: {
    variant: {
      solid: [],
      outline: [],
      ghost: [],
      link: ["hover:underline hover:underline-offset-4"],
    },
    size: {
      sm: ["h-6 min-w-6 px-3 text-captionLabel", "data-[icon=true]:p-[4px]"],
      md: ["h-8 min-w-8 px-4 text-label", "data-[icon=true]:p-[8px]"],
      lg: ["h-11 min-w-11 px-5 text-label", "data-[icon=true]:p-[10px]"],
    },
    radius: {
      none: "rounded-0",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "md",
    radius: "xl",
  },
});

export interface ButtonProps
  extends Omit<MuiButtonProps, "color">,
    VariantProps<typeof buttonVariants> {
  /** Icon or any other element placed before the children. */
  leftIcon?: React.ReactNode;
  /** Icon or any other element placed after the children. */
  rightIcon?: React.ReactNode;
  /** If `true`, adjust the button layout to the icon. */
  iconOnly?: boolean;
  /** If `true`, display a loader component inside the button. */
  loading?: boolean;
  /** If `true`, set the button as pressed. */
  selected?: boolean;
  /** If `true`, the component is disabled. */
  disabled?: boolean;
  /** The initial color to generate accessible colors from. */
  color?: string;
}

/**
 * Buttons allow users to make choices and take actions.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      iconOnly,
      leftIcon,
      rightIcon,
      loading,
      selected,
      variant,
      color,
      size,
      radius,
      ...props
    },
    ref,
  ) => {
    const defaultProps = useComponentProps("Button", {
      variant,
      color,
      size,
      radius,
      ...props,
    });

    const { cssVars } = defaultProps;

    const buttonClasses = buttonVariants(defaultProps);
    const loaderColor = getLoaderColor(buttonClasses);

    return (
      <MuiButton
        className={cx(buttonClasses, className)}
        ref={ref}
        style={cssVars}
        {...props}
        {...(iconOnly && { "data-icon": "true" })}
        {...(selected && { "aria-pressed": "true" })}
      >
        {leftIcon && (
          <span className={cx(children ? "mr-2" : undefined)}>{leftIcon}</span>
        )}
        {loading && (
          <Loader
            className={cx(children ? "mr-2" : undefined)}
            color={loaderColor}
          />
        )}
        {children}
        {rightIcon && (
          <span className={cx(children ? "ml-2" : undefined)}>{rightIcon}</span>
        )}
      </MuiButton>
    );
  },
);
