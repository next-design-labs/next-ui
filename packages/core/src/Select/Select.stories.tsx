import { HvSelect, HvSelectOption } from "@next-design-labs/next-ui-core";
import type { Decorator, Meta, StoryObj } from "@storybook/react";

const decorator: Decorator = (Story) => (
  <div className="w-[300px]">{Story()}</div>
);

const meta: Meta<typeof HvSelect> = {
  title: "Components/Select",
  component: HvSelect,
  // @ts-expect-error https://github.com/storybookjs/storybook/issues/20782
  subcomponents: { HvSelectOption },
  decorators: [decorator],
};

export default meta;
type Story = StoryObj<typeof HvSelect>;

export const Default: Story = {
  render: (args: typeof meta) => (
    <HvSelect defaultValue={10} {...args}>
      <HvSelectOption value={10}>Documentation</HvSelectOption>
      <HvSelectOption value={20}>Components</HvSelectOption>
      <HvSelectOption value={30}>Features</HvSelectOption>
    </HvSelect>
  ),
};

const options = [
  { value: "ar", label: "Argentina", flag: "🇦🇷" },
  { value: "bg", label: "Belgium", flag: "🇧🇪" },
  { value: "pt", label: "Portugal", flag: "🇵🇹" },
  { value: "pl", label: "Poland", flag: "🇵🇱" },
  { value: "sp", label: "Spain", flag: "🇪🇸" },
  { value: "us", label: "United States", flag: "🇺🇸" },
];

export const Other: Story = {
  render: () => (
    <HvSelect defaultValue={10} placeholder="Select countries">
      {options.map(({ value, label, flag }) => (
        <HvSelectOption key={value} value={value} label={label}>
          {`${flag} ${label}`}
        </HvSelectOption>
      ))}
    </HvSelect>
  ),
};
