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

const options = [
  { value: "ar", label: "Argentina", flag: "🇦🇷" },
  { value: "bg", label: "Belgium", flag: "🇧🇪" },
  { value: "pt", label: "Portugal", flag: "🇵🇹" },
  { value: "pl", label: "Poland", flag: "🇵🇱" },
  { value: "sp", label: "Spain", flag: "🇪🇸" },
  { value: "us", label: "United States", flag: "🇺🇸" },
];

export const Main: Story = {
  render: () => (
    <NuiSelect defaultValue={10} placeholder="Select country">
      {options.map(({ value, label, flag }) => (
        <NuiSelectOption key={value} value={value} label={label}>
          {`${flag} ${label}`}
        </NuiSelectOption>
      ))}
    </NuiSelect>
  ),
};
