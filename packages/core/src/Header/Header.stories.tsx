import { HvHeader } from "@next-design-labs/next-ui-core";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof HvHeader> = {
  title: "Widgets/Header",
  component: HvHeader,
};

export default meta;
type Story = StoryObj<typeof HvHeader>;

export const Default: Story = {
  render: (args: typeof meta) => <HvHeader {...args} />,
};
