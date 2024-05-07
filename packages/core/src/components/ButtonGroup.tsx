import {
  Children,
  type ReactElement,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react";

import { useComponent } from "../hooks";
import { buttonGroupRecipe } from "../recipes";
import type { NuiVariantProps } from "../types";
import { cx } from "../utils";
import type { NuiButtonProps } from "./Button";

export type NuiButtonGroupProps = NuiButtonProps &
  NuiVariantProps<typeof buttonGroupRecipe> & {
    /** Variant type for buttons, excluding ghost and link */
    variant?: Exclude<NuiButtonProps["variant"], "ghost" | "link">;
    /** Layout buttons vertically if true */
    vertical?: boolean;
    /** Spacing between buttons */
    spacing?: number;
  };

/**
 * ButtonGroup: A collection of buttons grouped together for managing state.
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
    // Filter valid React elements from children
    const validChildren = Children.toArray(children).filter(
      isValidElement,
    ) as ReactElement[];

    // Extract component-specific classes
    const { baseClasses } = useComponent(
      "ButtonGroup",
      buttonGroupRecipe,
      props,
    );

    // Resolve button-specific classes
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

    // Handle button clicks
    const handleClick = (evt: React.FormEvent<HTMLButtonElement>) => {
      onChange?.(evt);
    };

    return (
      <fieldset
        ref={ref}
        style={{ gap: spacing }}
        className={cx(
          vertical ? "flex-col" : "flex-row",
          baseClasses,
          className,
        )}
      >
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
