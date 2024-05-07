import { Option, type OptionProps } from "@mui/base/Option";
import { forwardRef } from "react";

import type { SelectValue } from "./Select";

export interface HvSelectOptionProps extends OptionProps<SelectValue> {}

export const HvSelectOption = forwardRef<HTMLLIElement, HvSelectOptionProps>(
  (props, ref) => {
    return (
      <Option
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
