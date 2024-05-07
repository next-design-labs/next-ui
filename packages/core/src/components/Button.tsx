import {
  Button as MuiButton,
  type ButtonProps as MuiButtonProps,
} from "@mui/base/Button";
import { forwardRef } from "react";

import { useComponent } from "../hooks";
import { buttonRecipe } from "../recipes";
import type { NuiVariantProps } from "../types";
import { cx } from "../utils";
import { Loader } from "./Loader";

export type NuiButtonProps = MuiButtonProps &
  NuiVariantProps<typeof buttonRecipe> & {
    /** Adjusts the button layout for icon-only mode. */
    iconOnly?: boolean;
    /** Displays a loader component inside the button. */
    loading?: boolean;
    /** Sets the button as pressed. */
    selected?: boolean;
    /** Disables the button if true. */
    disabled?: boolean;
    /** Initial color to generate accessible colors from. */
    color?: string;
  };

/**
 * Buttons allow users to make choices and take actions.
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
    const { componentClasses, dataAttributes } = useComponent(
      "Button",
      buttonRecipe,
      props,
    );

    return (
      <MuiButton
        ref={ref}
        className={cx(componentClasses.base, className)}
        aria-busy={loading}
        aria-pressed={selected}
        disabled={disabled}
        data-icon={iconOnly}
        {...dataAttributes}
      >
        {loading && <Loader className={cx(children ? "mr-2" : undefined)} />}
        {children}
      </MuiButton>
    );
  },
);

NuiButton.displayName = "NuiButton";
