import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as React from "react";

import { useComponent } from "../hooks/useComponent";
import { switchRecipe } from "../recipes";
import type { NuiVariantProps } from "../types";
import { cx } from "../utils";

export type NuiSwitchProps = SwitchPrimitives.SwitchProps &
  NuiVariantProps<typeof switchRecipe>;

export const NuiSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  NuiSwitchProps
>(({ className, ...props }, ref) => {
  const { componentClasses } = useComponent("Switch", switchRecipe, props);

  return (
    <SwitchPrimitives.Root
      className={cx(componentClasses.base, className)}
      ref={ref}
      {...props}
    >
      <SwitchPrimitives.Thumb className={componentClasses.thumb} />
    </SwitchPrimitives.Root>
  );
});

NuiSwitch.displayName = "NuiSwitch";
