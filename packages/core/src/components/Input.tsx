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
    const { dataAttributes, componentClasses } = useComponent(
      "Input",
      inputRecipe,
      props,
    );

    return (
      <MuiInput
        className={cx(componentClasses.base, className)}
        slotProps={{
          root: {
            className: cx(componentClasses.root),
          },
          input: {
            className: cx(componentClasses.input),
          },
        }}
        ref={ref}
        {...dataAttributes}
      />
    );
  },
);

NuiInput.displayName = "NuiInput";
