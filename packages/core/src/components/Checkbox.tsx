import { Check } from "@phosphor-icons/react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as React from "react";

import { useComponent } from "../hooks/useComponent";
import { checkboxRecipe } from "../recipes";
import type { NuiVariantProps } from "../types";
import { cx } from "../utils";

export type NuiCheckboxProps = CheckboxPrimitive.CheckboxProps &
  NuiVariantProps<typeof checkboxRecipe>;

export const NuiCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  NuiCheckboxProps
>(({ className, ...props }, ref) => {
  const { baseProps, baseClasses, partsClasses } = useComponent(
    "Checkbox",
    checkboxRecipe,
    props,
  );

  return (
    <CheckboxPrimitive.Root
      className={cx(baseClasses, className)}
      ref={ref}
      {...baseProps}
    >
      <CheckboxPrimitive.Indicator className={partsClasses.indicator}>
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

NuiCheckbox.displayName = "NuiCheckbox";
