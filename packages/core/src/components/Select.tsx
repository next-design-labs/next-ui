import {
  Select as MuiSelect,
  type SelectProps as MuiSelectProps,
} from "@mui/base/Select";
import { forwardRef } from "react";

import { useComponent } from "../hooks";
import { selectRecipe } from "../recipes";
import type { NuiVariantProps } from "../types";
import { cx } from "../utils";
import type { NuiButtonProps } from "./Button";
import { NuiSelectButton } from "./SelectButton";

type SelectValue = Record<string, never> | string | number;
type SelectMulti = boolean;

export type NuiSelectProps = Pick<
  NuiButtonProps,
  "variant" | "color" | "size"
> &
  Omit<MuiSelectProps<SelectValue, SelectMulti>, "color"> &
  NuiVariantProps<typeof selectRecipe> & {
    /** Spacing between listbox and select button. */
    spacing?: number;
  };

/**
 * Selects allow users to select one or more options from a list.
 */
export const NuiSelect = forwardRef<HTMLButtonElement, NuiSelectProps>(
  (props, ref) => {
    const { baseProps, partsProps, partsClasses } = useComponent(
      "Select",
      selectRecipe,
      props,
    );

    return (
      <div className={cx("relative", props.className)}>
        <MuiSelect
          ref={ref}
          slots={{
            root: NuiSelectButton,
          }}
          slotProps={{
            root: {
              className: cx(partsClasses.root),
            },
            listbox: {
              className: cx(partsClasses.listbox),
            },
            popup: {
              className: cx(partsClasses.popup),
              ...(partsProps.popup as Record<string, unknown>),
            },
          }}
          {...baseProps}
        />
      </div>
    );
  },
);
