import type { SelectRootSlotProps } from "@mui/base/Select";
import { forwardRef } from "react";
import { RiArrowUpSLine } from "react-icons/ri";

import { Button } from "../Button";
import { cx } from "../utils/cva";
import type { SelectMulti, SelectValue } from "./Select";

export interface NuiSelectButtonProps
  extends SelectRootSlotProps<SelectValue, SelectMulti> {}

export const NuiSelectButton = forwardRef<
  HTMLButtonElement,
  NuiSelectButtonProps
>((props, ref) => {
  const { ownerState, ...other } = props;
  return (
    <Button {...other} ref={ref} className={props?.className}>
      {other.children}
      <RiArrowUpSLine
        className={cx(
          "ml-auto transform transition-all",
          `${other["aria-expanded"] ? "rotate-0" : "-rotate-180"}`,
        )}
      />
    </Button>
  );
});
