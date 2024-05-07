import { NuiTag } from "@next-design-labs/next-ui-core";
import type { Decorator, Meta, StoryObj } from "@storybook/react";

const decorator: Decorator = (Story) => (
  <div className="flex space-x-4">{Story()}</div>
);

const meta: Meta<typeof NuiTag> = {
  title: "Components/Tag",
  component: NuiTag,
  decorators: [decorator],
};

export default meta;
type Story = StoryObj<typeof NuiTag>;

export const Main: Story = {
  render: () => (
    <>
      <NuiTag>Sample 1</NuiTag>
      <NuiTag color="error">Sample 2</NuiTag>
      <NuiTag color="warning">Sample 3</NuiTag>
      <NuiTag color="neutral">Sample4</NuiTag>
    </>
  ),
};

export const Semantic: Story = {
  render: () => (
    <>
      <NuiTag color="success">Sample 1</NuiTag>
      <NuiTag color="error">Sample 2</NuiTag>
      <NuiTag color="warning">Sample 3</NuiTag>
      <NuiTag color="info">Sample 4</NuiTag>
    </>
  ),
};

export const Categorical: Story = {
  decorators: [
    (Story) => <div className="grid grid-cols-4 gap-4">{Story()}</div>,
  ],
  render: () => (
    <>
      <NuiTag color="orange" variant="categorical">
        Sample 1
      </NuiTag>
      <NuiTag color="lime" variant="categorical">
        Sample 2
      </NuiTag>
      <NuiTag color="yellow" variant="categorical">
        Sample 3
      </NuiTag>
      <NuiTag color="green" variant="categorical">
        Sample 4
      </NuiTag>
      <NuiTag color="teal" variant="categorical">
        Sample 5
      </NuiTag>
      <NuiTag color="cyan" variant="categorical">
        Sample 6
      </NuiTag>
      <NuiTag color="blue" variant="categorical">
        Sample 7
      </NuiTag>

      <NuiTag color="indigo" variant="categorical">
        Sample 8
      </NuiTag>
      <NuiTag color="violet" variant="categorical">
        Sample 9
      </NuiTag>
      <NuiTag color="purple" variant="categorical">
        Sample 10
      </NuiTag>
      <NuiTag color="fuchsia" variant="categorical">
        Sample 11
      </NuiTag>
      <NuiTag color="pink" variant="categorical">
        Sample 12
      </NuiTag>
      <NuiTag color="rose" variant="categorical">
        Sample 13
      </NuiTag>
    </>
  ),
};
