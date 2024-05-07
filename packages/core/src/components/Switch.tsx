import { Switch } from "@base-ui-components/react/switch";
import * as React from "react";

import { useComponent } from "../hooks";
import { switchRecipe } from "../recipes";
import type { NuiRecipeProps } from "../types";
import { cx } from "../utils";

export type NuiSwitchProps = Switch.Root.Props &
  NuiRecipeProps<typeof switchRecipe>;

/**
 * The `NuiSwitch` component is a customizable toggle switch, enabling users to switch between two states (on/off).
 * This component leverages a recipe-based system for styling, allowing for consistent theming and variant support.
 */
export const NuiSwitch = React.forwardRef<
  React.ElementRef<typeof Switch.Root>,
  NuiSwitchProps
>(({ className, ...props }, ref) => {
  const { baseStyles, partsStyles } = useComponent(
    "Switch",
    switchRecipe,
    props,
  );

  return (
    <Switch.Root
      className={cx(baseStyles, className)}
      ref={ref}
      {...props}
      role="switch"
      aria-checked={props.checked}
    >
      <Switch.Thumb className={cx(partsStyles.thumb)} />
    </Switch.Root>
  );
});

NuiSwitch.displayName = "NuiSwitch";
