import { Button, type ButtonProps } from "@mui/base/Button";
import { forwardRef } from "react";

import { NuiLoader } from "../Loader";
import { type VariantProps, cva, cx } from "../utils";
import { resolveLoaderColor } from "./utils";

export const buttonVariants = cva({
  base: [
    "flex items-center justify-center transition-all focus:z-10 border-1",
    "disabled:(pointer-events-none opacity-50)",
    "focus-visible:(outline ring-4 ring-offset-0)",
  ],
  variants: {
    /** The color scheme of the Button. */
    color: {
      primary: [
        "bg-buttonPrimary border-buttonPrimary text-primary",
        "active:bg-buttonPrimaryPressed hover:bg-buttonPrimaryHover",
      ],
      secondary: [
        "bg-neutralStrong border-neutralStrong text-text",
        "active:bg-buttonSecondaryLabel hover:bg-buttonSecondaryLabel",
      ],
      positive: [
        "bg-success border-success text-success",
        "active:bg-successStrong hover:bg-successStrong",
      ],
      warning: [
        "bg-warning border-warning text-warning",
        "active:bg-warningStrong hover:bg-warningStrong",
      ],
      negative: [
        "bg-error border-error text-error",
        "active:bg-errorStrong hover:bg-errorStrong",
      ],
    },
    /** The visual style of the Button. */
    variant: {
      solid: "border-transparent text-white",
      outline: [
        "bg-transparent",
        "active:bg-buttonSubtlePressed hover:bg-buttonSubtleHover",
      ],
      subtle: [
        "bg-buttonSubtle border-transparent",
        "active:bg-buttonSubtlePressed hover:bg-buttonSubtleHover",
        "shadow-[inset_0_-1px_1px_rgba(0,0,0,0.2)]",
      ],
      ghost: [
        "bg-transparent border-transparent",
        "active:bg-buttonSubtlePressed hover:bg-buttonSubtleHover",
      ],
      link: [
        "bg-transparent border-transparent underline-offset-4",
        "active:bg-transparent hover:(underline bg-transparent)",
      ],
    },
    /** The size of the button. */
    size: {
      sm: [
        "min-h-6 min-w-6 px-3 text-captionLabel",
        "data-[icon=true]:(p-[4px])",
      ],
      md: ["min-h-8 min-w-5 px-4 text-label", "data-[icon=true]:(p-[8px])"],
      lg: ["min-h-11 min-w-11 px-5 text-label", "data-[icon=true]:(p-[10px])"],
    },
    /** The border-radius of the button.*/
    radius: {
      none: "rounded-0",
      sm: "rounded-base",
      md: "rounded-round",
      lg: "rounded-full",
    },
  },
});

export interface NuiButtonProps
  extends Omit<ButtonProps, "color">,
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
}

/**
 * Buttons allow users to make choices and take actions.
 */
export const NuiButton = forwardRef<HTMLButtonElement, NuiButtonProps>(
  (
    {
      className,
      children,
      variant = "solid",
      color = "primary",
      size = "md",
      radius = "lg",
      ...props
    },
    ref,
  ) => {
    const { leftIcon, rightIcon, loading, selected, iconOnly, ...rest } = props;
    const buttonClasses = buttonVariants({ variant, size, radius, color });
    const loaderColor = resolveLoaderColor(buttonClasses);

    return (
      <Button
        className={cx(buttonClasses, className)}
        ref={ref}
        {...rest}
        {...(iconOnly && { "data-icon": "true" })}
        {...(selected && { "aria-pressed": "true" })}
      >
        {leftIcon && <span className={cx(children && "mr-2")}>{leftIcon}</span>}
        {loading && (
          <NuiLoader className={cx(children && "mr-2")} color={loaderColor} />
        )}
        {children}
        {rightIcon && (
          <span className={cx(children && "ml-2")}>{rightIcon}</span>
        )}
      </Button>
    );
  },
);
