import { NuiSelect, NuiSelectOption } from "@next-design-labs/next-ui-core";
import type { Decorator, Meta, StoryObj } from "@storybook/react";

const decorator: Decorator = (Story) => (
  <div className="w-[300px]">{Story()}</div>
);

const meta: Meta<typeof NuiSelect> = {
  title: "Components/Select",
  component: NuiSelect,
  decorators: [decorator],
};

export default meta;
type Story = StoryObj<typeof NuiSelect>;

export const Default: Story = {
  render: (args: typeof meta) => (
    <NuiSelect defaultValue={10} {...args}>
      <NuiSelectOption value={10}>Documentation</NuiSelectOption>
      <NuiSelectOption value={20}>Components</NuiSelectOption>
      <NuiSelectOption value={30}>Features</NuiSelectOption>
    </NuiSelect>
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
    <NuiSelect defaultValue={10} placeholder="Select countries">
      {options.map(({ value, label, flag }) => (
        <NuiSelectOption key={value} value={value} label={label}>
          {`${flag} ${label}`}
        </NuiSelectOption>
      ))}
    </NuiSelect>
  ),
};
