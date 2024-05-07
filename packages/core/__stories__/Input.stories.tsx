import { NuiInput } from "@next-design-labs/next-ui-core";
import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { PiEnvelopeSimple, PiUser } from "react-icons/pi";

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
      <NuiInput placeholder="Username" startAdornment={<PiUser />} />
      <NuiInput placeholder="Your Email" endAdornment={<PiEnvelopeSimple />} />
    </>
  ),
};
