import {
  Option as MuiOption,
  type OptionProps as MuiOptionProps,
} from "@mui/base/Option";
import { forwardRef } from "react";

type SelectValue = Record<string, never> | string | number;

export type NuiSelectOptionProps = MuiOptionProps<SelectValue>;

export const NuiSelectOption = forwardRef<HTMLLIElement, NuiSelectOptionProps>(
  (props, ref) => {
    return (
      <MuiOption
        ref={ref}
        {...props}
        slotProps={{
          root: () => ({
            className:
              "text-body list-none p-1 hover:bg-primary_20 cursor-pointer",
          }),
        }}
      />
    );
  },
);
