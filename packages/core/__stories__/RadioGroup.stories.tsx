import {
  NuiRadioGroup,
  NuiRadioGroupItem,
} from "@next-design-labs/next-ui-core";
import type { Meta, StoryFn } from "@storybook/react";

const meta: Meta<typeof NuiRadioGroup> = {
  title: "Components/RadioGroup",
  component: NuiRadioGroup,
};

export default meta;

export const Main: StoryFn<typeof NuiRadioGroup> = () => {
  return (
    <div className="flex items-center space-x-2">
      <NuiRadioGroup>
        <NuiRadioGroupItem value="1">1</NuiRadioGroupItem>
        <NuiRadioGroupItem value="2">2</NuiRadioGroupItem>
        <NuiRadioGroupItem value="3">3</NuiRadioGroupItem>
      </NuiRadioGroup>
    </div>
  );
};
