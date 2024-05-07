import { Select, type SelectProps } from "@mui/base/Select";
import React, { forwardRef, useState } from "react";

import { type HvButtonProps, buttonVariants } from "../Button";
import { type VariantProps, cva, cx } from "../utils/cva";
import { HvSelectButton } from "./SelectButton";
import { resolveSlotProps, isTranslatedUpwards } from "./utils";

export type SelectValue = Record<string, never> | string | number;
export type SelectMulti = boolean;

export const listboxVariants = cva({
  base: [
    "border-1 bg-atmo1 py-1.5 text-body text-secondary",
    "[&>li]:mx-1.5 [&>li]:overflow-hidden [&>li]:text-ellipsis",
  ],
  variants: {
    color: {
      primary: ["border-primary"],
      secondary: ["border-secondary"],
      positive: ["border-positive"],
      warning: ["border-warning_140"],
      negative: ["border-negative_120"],
    },
    radius: {
      none: "rounded-0",
      sm: "rounded-base",
      md: "rounded-round",
      lg: "rounded-full",
    },
  },
  defaultVariants: {
    color: "secondary",
    radius: "sm",
  },
});

export interface HvSelectProps
  extends Pick<HvButtonProps, "variant" | "color" | "size">,
    Omit<SelectProps<SelectValue, SelectMulti>, "color">,
    VariantProps<typeof buttonVariants> {
  /** Spacing between listbox and select button. */
  spacing?: number;
}

/**
 * Selects allow users to select one or more options from a list.
 */
export const HvSelect = forwardRef<HTMLButtonElement, HvSelectProps>(
  (props, ref) => {
    const {
      spacing = 0,
      variant = "outline",
      color = "secondary",
      size = "md",
      radius = "md",
    } = props;

    const variantProps = { spacing, variant, color, size, radius };
    const popupRef = React.useRef<HTMLDivElement | null>(null);
    const [isPopupUpwards, setIsPopupUpwards] = useState<boolean | null>(false);
    const [isOpened, setIsOpened] = useState<boolean>(false);

    return (
      <div className={cx("relative", props.className)}>
        <Select
          ref={ref}
          {...props}
          slots={{
            root: HvSelectButton,
            ...props.slots,
          }}
          onListboxOpenChange={(opened) => {
            setIsOpened(opened);
            setIsPopupUpwards(isTranslatedUpwards(popupRef.current));
          }}
          slotProps={{
            ...props.slotProps,
            root: (ownerState) => {
              const rootProps = resolveSlotProps(
                props.slotProps?.root,
                ownerState,
              );

              const radii = cx(
                isOpened && isPopupUpwards && "rounded-t-none",
                isOpened && !isPopupUpwards && "rounded-b-none",
              );

              return {
                ...rootProps,
                className: cx(
                  "w-full",
                  buttonVariants(variantProps),
                  !spacing && radii,
                  rootProps?.className,
                ),
              };
            },
            listbox: (ownerState) => {
              const listboxProps = resolveSlotProps(
                props.slotProps?.listbox,
                ownerState,
              );

              const radii = cx(
                isOpened && isPopupUpwards && "rounded-b-none",
                isOpened && !isPopupUpwards && "rounded-t-none",
              );

              return {
                ...listboxProps,
                style: {
                  // Offset the listbox from the button if no spacing is provided
                  margin: spacing ? `${spacing}px 0` : "-1px 0",
                },
                className: cx(
                  listboxVariants({ color, radius }),
                  !spacing && radii,
                  listboxProps?.className,
                ),
              };
            },
            popup: (ownerState) => {
              const popupProps = resolveSlotProps(
                props.slotProps?.popup,
                ownerState,
              );

              return {
                ...popupProps,
                disablePortal: true,
                className: cx("z-1 w-full", popupProps?.className),
                ref: popupRef,
              };
            },
          }}
        />
      </div>
    );
  },
);
