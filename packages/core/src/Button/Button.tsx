import { Button, type ButtonProps } from "@mui/base/Button";
import { forwardRef } from "react";

import { HvLoader } from "../Loader";
import { type VariantProps, cva, cx } from "../utils/cva";
import { resolveLoaderColor } from "./utils";

export const buttonVariants = cva({
  base: [
    "flex items-center justify-center transition-all focus:z-10",
    "disabled:(pointer-events-none opacity-50)",
    "focus-visible:(outline ring-4 ring-offset-0)",
  ],
  variants: {
    /** The color scheme of the Button. */
    color: {
      primary: [
        "border-primary bg-primary text-primary",
        "active:bg-primary hover:bg-primary_80",
      ],
      secondary: [
        "border-secondary bg-secondary text-secondary",
        "active:bg-secondary hover:bg-secondary_80",
      ],
      positive: [
        "border-positive bg-positive text-positive",
        "active:bg-positive hover:bg-positive_80",
      ],
      warning: [
        "border-warning_140 bg-warning_140 text-warning_140",
        "active:bg-warning_140 hover:bg-warning_120",
      ],
      negative: [
        "border-negative_120 bg-negative_120 text-negative_120",
        "active:bg-negative_120 hover:bg-negative_80",
      ],
    },
    /** The visual style of the Button. */
    variant: {
      solid: "text-atmo1",
      outline: [
        "border-1 bg-transparent",
        "active:bg-primary_30 hover:bg-primary_20",
      ],
      ghost: ["bg-transparent", "active:bg-primary_20 hover:bg-primary_30"],
      link: [
        "bg-transparent text-secondary underline-offset-4",
        "hover:(underline bg-transparent bg-transparent)",
      ],
    },
    /** The size of the button. */
    size: {
      sm: [
        "min-h-3 min-w-3 px-2 text-captionLabel",
        "data-[icon=true]:(p-[4px] text-1.5)",
      ],
      md: [
        "min-h-4 min-w-4 px-2 text-label",
        "data-[icon=true]:(p-[8px] text-2)",
      ],
      lg: [
        "min-h-6 min-w-6 px-3 text-label",
        "data-[icon=true]:(p-[11px] text-3)",
      ],
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

export interface HvButtonProps
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
export const HvButton = forwardRef<HTMLButtonElement, HvButtonProps>(
  (
    {
      className,
      children,
      variant = "solid",
      color = "primary",
      size = "md",
      radius = "sm",
      ...props
    },
    ref,
  ) => {
    const { leftIcon, rightIcon, loading, selected, iconOnly, ...rest } = props;
    const buttonClasses = buttonVariants({ variant, color, size, radius });
    const loaderColor = resolveLoaderColor(buttonClasses);

    return (
      <Button
        className={cx(buttonClasses, className)}
        ref={ref}
        {...rest}
        {...(iconOnly && { "data-icon": "true" })}
        {...(selected && { "aria-pressed": "true" })}
      >
        {leftIcon && <span className={cx(children && "mr-1")}>{leftIcon}</span>}
        {loading && (
          <HvLoader className={cx(children && "mr-1")} color={loaderColor} />
        )}
        {children}
        {rightIcon && (
          <span className={cx(children && "ml-1")}>{rightIcon}</span>
        )}
      </Button>
    );
  },
);
