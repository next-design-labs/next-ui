import { NuiSwitch } from "@next-design-labs/next-ui-core";
import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof NuiSwitch> = {
  title: "Components/Switch",
  component: NuiSwitch,
};

export default meta;

export const Main: StoryFn<typeof NuiSwitch> = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex items-center space-x-2">
      <NuiSwitch id="airplane" checked={checked} onCheckedChange={setChecked} />
      <label
        htmlFor="airplane"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Airplane Mode {checked ? "On" : "Off"}
      </label>
    </div>
  );
};
