import { Checkbox } from "@base-ui-components/react/checkbox";
import { Check } from "@phosphor-icons/react";
import React from "react";

import { useComponent } from "../hooks";
import { checkboxRecipe } from "../recipes";
import type { NuiRecipeProps } from "../types";
import { cx } from "../utils";

export type NuiCheckboxProps = Checkbox.Root.Props &
  NuiRecipeProps<typeof checkboxRecipe>;

/**
 * A styled checkbox component built on top of a base checkbox implementation.
 * Supports custom styling, behavior, and dynamic variants using `checkboxRecipe`.
 */
export const NuiCheckbox = React.forwardRef<
  React.ElementRef<typeof Checkbox.Root>,
  NuiCheckboxProps
>(({ className, ...props }, ref) => {
  // Extracts base classes, props, and part-specific classes
  const { baseProps, baseStyles, partsStyles } = useComponent(
    "Checkbox",
    checkboxRecipe,
    props,
  );

  return (
    <Checkbox.Root
      ref={ref}
      className={cx(baseStyles, className ?? "")}
      {...baseProps}
    >
      <Checkbox.Indicator className={partsStyles.indicator}>
        <Check className="h-4 w-4" aria-hidden="true" />
      </Checkbox.Indicator>
    </Checkbox.Root>
  );
});

NuiCheckbox.displayName = "NuiCheckbox";
