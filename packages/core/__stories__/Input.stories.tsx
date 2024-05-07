import { NuiInput } from "@next-design-labs/next-ui-core";
import { EnvelopeSimple, User } from "@phosphor-icons/react";
import type { Meta, StoryFn, StoryObj } from "@storybook/react";

const meta: Meta<typeof NuiInput> = {
  title: "Components/Input",
  component: NuiInput,
  decorators: [
    (Story: StoryFn) => (
      <div className="flex flex-col gap-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof NuiInput>;

export const Main: Story = {
  render: () => (
    <>
      <NuiInput placeholder="Username" startAdornment={<User size={16} />} />
      <NuiInput
        placeholder="Your Email"
        endAdornment={<EnvelopeSimple size={16} />}
      />
    </>
  ),
};
