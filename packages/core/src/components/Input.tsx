import {
  Input as MuiInput,
  type InputProps as MuiInputProps,
} from "@mui/base/Input";
import { forwardRef } from "react";

import { useComponent } from "../hooks";
import { inputRecipe } from "../recipes";
import type { NuiVariantProps } from "../types";
import { cx } from "../utils";

export type NuiInputProps = MuiInputProps & NuiVariantProps<typeof inputRecipe>;

/**
 * Inputs allow users to enter and edit text.
 */
export const NuiInput = forwardRef<HTMLInputElement, NuiInputProps>(
  ({ className, ...props }, ref) => {
    const { baseProps, baseClasses, partsClasses } = useComponent(
      "Input",
      inputRecipe,
      props,
    );

    return (
      <MuiInput
        className={cx(baseClasses, className)}
        slotProps={{
          root: {
            className: cx(partsClasses.root),
          },
          input: {
            className: cx(partsClasses.input),
          },
        }}
        ref={ref}
        {...baseProps}
      />
    );
  },
);

NuiInput.displayName = "NuiInput";
