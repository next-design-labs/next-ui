import { NuiCheckbox } from "@next-design-labs/next-ui-core";
import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof NuiCheckbox> = {
  title: "Components/Checkbox",
  component: NuiCheckbox,
};

export default meta;

export const Main: StoryFn<typeof NuiCheckbox> = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex items-center space-x-2">
      <NuiCheckbox
        checked={checked}
        onCheckedChange={(state) => setChecked(!!state)}
      />
    </div>
  );
};
