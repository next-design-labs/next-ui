import {
  Children,
  type ReactElement,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react";

import { useComponent } from "../hooks";
import { buttonGroupRecipe } from "../recipes";
import type { NuiRecipeProps } from "../types";
import { cx } from "../utils";
import type { NuiButtonProps } from "./Button";

export type NuiButtonGroupProps = NuiButtonProps &
  NuiRecipeProps<typeof buttonGroupRecipe> & {
    /** Variant type for buttons in the group. */
    variant?: Exclude<NuiButtonProps["variant"], "ghost" | "link">;
    /** Arranges buttons vertically if true. */
    vertical?: boolean;
    /** Specifies the spacing between buttons, in pixels. */
    spacing?: number;
  };

/**
 * A component for grouping multiple buttons together with shared styling, layout, and state management.
 * Supports horizontal and vertical layouts, adjustable spacing, and active state propagation.
 */
export const NuiButtonGroup = forwardRef<
  HTMLFieldSetElement,
  NuiButtonGroupProps
>(
  (
    {
      children,
      className,
      vertical = false,
      spacing = 0,
      iconOnly = false,
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    // Filter valid React elements from the children
    const validChildren = Children.toArray(children).filter(
      isValidElement,
    ) as ReactElement[];

    // Extract base classes from the component hook
    const { baseStyles } = useComponent(
      "ButtonGroup",
      buttonGroupRecipe,
      props,
    );

    /**
     * Resolves CSS classes for each button in the group.
     * - Applies conditional styling for button positions (first, middle, last).
     * - Handles overlap styles when `spacing` is set to zero.
     */
    const getButtonClasses = (idx: number) => {
      const isFirst = idx === 0;
      const isLast = idx === validChildren.length - 1;

      const roundedClasses = {
        "rounded-none": idx > 0 && idx < validChildren.length - 1,
        [vertical ? "rounded-b-none" : "rounded-r-none"]: isFirst,
        [vertical ? "rounded-t-none" : "rounded-l-none"]: isLast,
      };

      return cx(
        !spacing && (vertical ? "mt-[-1px]" : "ml-[-1px]"),
        !spacing && roundedClasses,
      );
    };

    /**
     * Handles button click events.
     * - Calls the `onChange` handler if provided.
     */
    const handleClick = (evt: React.FormEvent<HTMLButtonElement>) => {
      onChange?.(evt);
    };

    return (
      <fieldset
        ref={ref}
        style={{ gap: spacing }}
        className={cx(
          vertical ? "flex-col" : "flex-row",
          baseStyles,
          className,
        )}
      >
        {/* Map over valid children to render buttons with group-specific styling */}
        {validChildren.map((elem, idx) => {
          const isSelected = Array.isArray(value)
            ? value.includes(elem.props.value)
            : value === elem.props.value;

          return cloneElement(elem, {
            onClick: handleClick,
            className: cx(getButtonClasses(idx), elem.props.className),
            iconOnly,
            selected: isSelected,
            ...props,
          });
        })}
      </fieldset>
    );
  },
);

NuiButtonGroup.displayName = "NuiButtonGroup";
