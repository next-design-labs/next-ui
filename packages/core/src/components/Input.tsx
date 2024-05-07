import { Input } from "@base-ui-components/react/input";
import { forwardRef } from "react";

import { useComponent } from "../hooks";
import { inputRecipe } from "../recipes";
import type { NuiRecipeProps } from "../types";
import { cx } from "../utils";

export type NuiInputProps = Input.Props &
  NuiRecipeProps<typeof inputRecipe> & {
    /** Element to render at the start of the input field. */
    startAdornment?: React.ReactNode;
    /** Element to render at the end of the input field. */
    endAdornment?: React.ReactNode;
  };

/**
 * A flexible input field component designed for user input and editing.
 * It supports custom styling, layout variations, and additional elements (adornments)
 * to enhance functionality and user experience.
 */
export const NuiInput = forwardRef<
  React.ElementRef<typeof Input>,
  NuiInputProps
>(({ className, startAdornment, endAdornment, ...props }, ref) => {
  const { baseProps, baseStyles, partsStyles } = useComponent(
    "Input",
    inputRecipe,
    props,
  );

  return (
    <div className={cx(baseStyles, className)}>
      {/* Render the start adornment if provided */}
      {startAdornment && (
        <div className={cx(partsStyles.startAdornment)}>{startAdornment}</div>
      )}

      {/* Render the input element */}
      <Input className={cx(partsStyles.input)} ref={ref} {...baseProps} />

      {/* Render the end adornment if provided */}
      {endAdornment && (
        <div className={cx(partsStyles.endAdornment)}>{endAdornment}</div>
      )}
    </div>
  );
});

// Display name for debugging and documentation purposes
NuiInput.displayName = "NuiInput";
