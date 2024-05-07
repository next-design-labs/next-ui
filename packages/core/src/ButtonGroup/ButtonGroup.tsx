import {
  Children,
  type ReactElement,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react";

import type { HvButtonProps } from "../Button";
import { type VariantProps, cva, cx } from "../utils/cva";

export const buttonGroupVariants = cva({
  variants: {
    color: {
      primary: [
        "border-primary_60 bg-primary_80",
        "aria-pressed:(border-primary bg-atmo1 bg-primary)",
      ],
      secondary: [
        "border-secondary_60 bg-secondary_80",
        "aria-pressed:(border-secondary bg-secondary)",
      ],
      positive: [
        "border-positive_60 bg-positive_80",
        "aria-pressed:(border-positive bg-positive)",
      ],
      warning: [
        "border-warning_120 bg-warning_120",
        "aria-pressed:(border-warning_140 bg-warning_140)",
      ],
      negative: [
        "border-negative_60 bg-negative_80",
        "aria-pressed:(border-negative_120 bg-negative_120)",
      ],
    },
    /** Use the variant prop to change the visual style of the button.  */
    variant: {
      solid: "",
      outline: ["bg-transparent", "aria-pressed:(bg-atmo1)"],
      ghost: ["bg-transparent", "aria-pressed:(bg-primary_20)"],
    },
  },
});

export interface HvButtonGroupProps
  extends Pick<
      HvButtonProps,
      | "color"
      | "size"
      | "radius"
      | "iconOnly"
      | "value"
      | "onChange"
      | "disabled"
    >,
    Pick<VariantProps<typeof buttonGroupVariants>, "variant"> {
  /** Children should be HvButton components. */

  children?: React.ReactNode;
  /** Optional className to customize the button group styling. */
  className?: string;
  /** The orientation of the button group. */
  vertical?: boolean;
  /** Spacing between buttons in the group. */
  spacing?: number;
}

/**
 * Button Groups are used to manage collectionst of buttons.
 */
export const HvButtonGroup = forwardRef<HTMLDivElement, HvButtonGroupProps>(
  (
    {
      children,
      className,
      vertical = false,
      spacing = 0,
      variant = "outline",
      color = "secondary",
      size,
      radius = "sm",
      iconOnly,
      value,
      onChange,
      disabled,
    },
    ref,
  ) => {
    const validChildren = Children.toArray(children).filter(
      (child): child is ReactElement<HvButtonProps> => isValidElement(child),
    );

    const getChildClasses = (idx: number) => {
      const radii = {
        "rounded-none": idx > 0 && idx < validChildren.length - 1,
        [vertical ? "rounded-b-none" : "rounded-r-none"]: idx === 0,
        [vertical ? "rounded-t-none" : "rounded-l-none"]:
          idx === validChildren.length - 1,
      };

      return [
        buttonGroupVariants({ color, variant }),
        !spacing && vertical ? "mt-[-1px]" : "ml-[-1px]", // Offset the border of the buttons
        !spacing && radii,
      ];
    };

    return (
      <div
        ref={ref}
        style={{ gap: spacing }}
        className={cx(vertical ? "flex-col" : "flex", className)}
        role="group"
      >
        {validChildren.map((child, idx) => {
          const selected = Array.isArray(value)
            ? value.includes(child.props.value)
            : value === child.props.value;

          const childClasses = cx(
            selected && "z-1 border-inherit", // Ensure the selected button is on top
            getChildClasses(idx),
            child.props.className,
          );

          const handleClick = (evt: React.FormEvent<HTMLButtonElement>) => {
            onChange?.(evt);
          };

          return cloneElement(child as ReactElement, {
            onClick: handleClick,
            className: childClasses,
            variant,
            color,
            size,
            radius,
            iconOnly,
            selected,
            disabled,
          });
        })}
      </div>
    );
  },
);
