import type { SelectRootSlotProps } from "@mui/base/Select";
import { forwardRef } from "react";
import { RiArrowUpSLine } from "react-icons/ri";

import { HvButton } from "../Button";
import { cx } from "../utils/cva";
import type { SelectMulti, SelectValue } from "./Select";

interface HvSelectButtonProps
  extends SelectRootSlotProps<SelectValue, SelectMulti> {}

export const HvSelectButton = forwardRef<
  HTMLButtonElement,
  HvSelectButtonProps
>((props, ref) => {
  const { ownerState, ...other } = props;
  return (
    <HvButton {...other} ref={ref} className={props?.className}>
      {other.children}
      <RiArrowUpSLine
        className={cx(
          "ml-auto transform transition-all",
          `${other["aria-expanded"] ? "rotate-0" : "-rotate-180"}`,
        )}
      />
    </HvButton>
  );
});
