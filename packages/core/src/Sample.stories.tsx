import { theme } from "@next-design-labs/next-ui-styles";
import type { Meta, StoryObj } from "@storybook/react";

export interface SampleProps extends React.HTMLAttributes<HTMLDivElement> {}

const Sample = (props: SampleProps) => {
  return (
    <div className="text-2xl" style={{ color: theme.text?.primary }} {...props}>
      Sample
    </div>
  );
};

const meta: Meta<typeof Sample> = {
  title: "Sample",
  component: Sample,
};

export default meta;
type Story = StoryObj<typeof Sample>;

export const Default: Story = {
  render: (args: typeof meta) => <Sample {...args} />,
};
