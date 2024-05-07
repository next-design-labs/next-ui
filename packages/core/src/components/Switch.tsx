import { Switch } from "@base-ui-components/react/switch";
import * as React from "react";

import { useComponent } from "../hooks";
import { switchRecipe } from "../recipes";
import type { NuiVariantProps } from "../types";
import { cx } from "../utils";

export type NuiSwitchProps = Switch.Root.Props &
  NuiVariantProps<typeof switchRecipe>;

/**
 * The `NuiSwitch` component is a customizable toggle switch, enabling users to switch between two states (on/off).
 * This component leverages a recipe-based system for styling, allowing for consistent theming and variant support.
 */
export const NuiSwitch = React.forwardRef<
  React.ElementRef<typeof Switch.Root>,
  NuiSwitchProps
>(({ className, ...props }, ref) => {
  const { baseClasses, partsClasses } = useComponent(
    "Switch",
    switchRecipe,
    props,
  );

  return (
    <Switch.Root
      className={cx(baseClasses, className)}
      ref={ref}
      {...props}
      role="switch"
      aria-checked={props.checked}
    >
      <Switch.Thumb className={cx(partsClasses.thumb)} />
    </Switch.Root>
  );
});

NuiSwitch.displayName = "NuiSwitch";
