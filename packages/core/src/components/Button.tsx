import { forwardRef } from "react";

import { useComponent } from "../hooks";
import { buttonRecipe } from "../recipes";
import type { NuiRecipeProps } from "../types";
import { cx } from "../utils";
import { Loader } from "./Loader";

export type NuiButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  NuiRecipeProps<typeof buttonRecipe> & {
    /** Whether the button is in a loading state */
    loading?: boolean;
    /** Whether the button contains only an icon */
    iconOnly?: boolean;
    /** Whether the button is selected (for use in button groups) */
    selected?: boolean;
    /** Value for the button (for use in button groups) */
    value?: string | number | string[];
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
    const { baseStyles, baseProps, dataAttributes } = useComponent(
      "Button",
      buttonRecipe,
      props,
    );

    return (
      <button
        ref={ref}
        className={cx(baseStyles, className)}
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
