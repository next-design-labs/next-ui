import { forwardRef } from "react";

import { useComponent } from "../hooks";
import { buttonRecipe } from "../recipes";
import type { NuiVariantProps } from "../types";
import { cx } from "../utils";
import { Loader } from "./Loader";

export type NuiButtonProps = React.HTMLAttributes<HTMLButtonElement> &
  NuiVariantProps<typeof buttonRecipe> & {
    /** Adjusts the button layout for icon-only mode. */
    iconOnly?: boolean;
    /** Displays a loader component inside the button */
    loading?: boolean;
    /** Sets the button as pressed. Useful for toggle buttons or states that indicate active selection. */
    selected?: boolean;
    /** Disables the button, preventing interaction. */
    disabled?: boolean;
    /** Initial color used for styling the button. Allows customization of the button's color scheme. */
    color?: string;
  };

/**
 * A versatile button component designed for user interactions.
 * Supports dynamic styling, loading states, and accessibility features.
 */
export const NuiButton = forwardRef<HTMLButtonElement, NuiButtonProps>(
  (
    {
      className,
      children,
      iconOnly = false,
      loading = false,
      selected = false,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const { baseClasses, baseProps, dataAttributes } = useComponent(
      "Button",
      buttonRecipe,
      props,
    );

    return (
      <button
        ref={ref}
        className={cx(baseClasses, className)}
        aria-busy={loading}
        aria-pressed={selected}
        disabled={disabled}
        data-icon={iconOnly}
        aria-label={iconOnly && !children ? "Icon button" : undefined}
        {...baseProps}
        {...dataAttributes}
      >
        {/* Display a loader if the button is in a loading state */}
        {loading && (
          <Loader
            className={cx(children ? "mr-2" : undefined)}
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    );
  },
);

NuiButton.displayName = "NuiButton";
