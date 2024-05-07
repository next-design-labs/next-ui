import type { SelectRootSlotProps } from "@mui/base/Select";
import { forwardRef } from "react";
import { RiArrowUpSLine } from "react-icons/ri";

import { cx } from "../utils";
import { NuiButton } from "./Button";

type SelectValue = Record<string, never> | string | number;
type SelectMulti = boolean;

export type NuiSelectButtonProps = SelectRootSlotProps<
  SelectValue,
  SelectMulti
>;

export const NuiSelectButton = forwardRef<
  HTMLButtonElement,
  NuiSelectButtonProps
>((props, ref) => {
  const { ownerState, ...other } = props;
  return (
    <NuiButton {...other} ref={ref} className={props?.className}>
      {other.children}
      <RiArrowUpSLine
        className={cx(
          "ml-auto transform transition-all",
          `${other["aria-expanded"] ? "rotate-0" : "-rotate-180"}`,
        )}
      />
    </NuiButton>
  );
});
