import {
  Input as MuiInput,
  type InputProps as MuiInputProps,
} from "@mui/base/Input";
import { forwardRef } from "react";

import { useComponent } from "../hooks";
import { inputRecipe } from "../recipes";
import type { NuiVariantProps } from "../types";

export type NuiInputProps = MuiInputProps & NuiVariantProps<typeof inputRecipe>;

/**
 * Inputs allow users to enter and edit text.
 */
export const NuiInput = forwardRef<HTMLInputElement, NuiInputProps>(
  (props, ref) => {
    const { componentProps, componentSlotProps, componentClasses } =
      useComponent("Input", inputRecipe, props);

    return (
      <MuiInput
        ref={ref}
        slotProps={componentSlotProps}
        className={componentClasses}
        {...componentProps}
      />
    );
  },
);

NuiInput.displayName = "NuiInput";
