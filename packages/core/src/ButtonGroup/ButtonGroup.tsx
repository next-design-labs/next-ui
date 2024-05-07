import {
  Children,
  type ReactElement,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react";

import type { ButtonProps } from "../Button";
import { type VariantProps, cva, cx } from "../utils";

export const buttonGroupVariants = cva({
  base: [
    "aria-pressed:text-[var(--button-selectedText)]",
    "aria-pressed:border-[var(--button-selected)]",
    "aria-pressed:bg-[var(--button-selected)]",
    "aria-pressed:hover:bg-[var(--button-selectedHover)]",
    "aria-pressed:hover:text-[var(--button-selectedText)]",
  ],
});

export interface ButtonGroupProps
  extends ButtonProps,
    VariantProps<typeof buttonGroupVariants> {
  variant?: Exclude<ButtonProps["variant"], "ghost" | "link">;
  children?: React.ReactNode;
  className?: string;
  vertical?: boolean;
  spacing?: number;
}

/**
 * ButtonGroup: A collection of buttons grouped together for managing state.
 */
export const ButtonGroup = forwardRef<HTMLFieldSetElement, ButtonGroupProps>(
  (
    {
      children,
      className,
      vertical,
      spacing,
      iconOnly,
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const validChildren = Children.toArray(children).filter(
      isValidElement,
    ) as ReactElement[];

    const getClasses = (idx: number) => {
      const isFirst = idx === 0;
      const isLast = idx === validChildren.length - 1;
      const roundedClasses = {
        "rounded-none": idx > 0 && idx < validChildren.length - 1,
        [vertical ? "rounded-b-none" : "rounded-r-none"]: isFirst,
        [vertical ? "rounded-t-none" : "rounded-l-none"]: isLast,
      };

      return cx(
        buttonGroupVariants(),
        !spacing && (vertical ? "mt-[-1px]" : "ml-[-1px]"),
        !spacing && roundedClasses,
        vertical && "w-full",
      );
    };

    const handleClick = (evt: React.FormEvent<HTMLButtonElement>) => {
      onChange?.(evt);
    };

    return (
      <fieldset
        ref={ref}
        style={{ gap: spacing }}
        className={cx(vertical ? "flex-col" : "flex", className)}
      >
        {validChildren.map((elem, idx) => {
          const isSelected = Array.isArray(value)
            ? value.includes(elem.props.value)
            : value === elem.props.value;

          return cloneElement(elem, {
            onClick: handleClick,
            className: cx(
              isSelected && "z-1 border-inherit",
              getClasses(idx),
              elem.props.className,
            ),
            iconOnly,
            selected: isSelected,
            ...props,
          });
        })}
      </fieldset>
    );
  },
);
