import { NuiButton, NuiButtonGroup } from "@next-design-labs/next-ui-core";
import {
  DownloadSimple,
  EnvelopeSimple,
  Gear,
  TextAlignCenter,
  TextAlignJustify,
  TextAlignLeft,
  TextAlignRight,
} from "@phosphor-icons/react";
import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { useState } from "react";

import { GridLayout } from "./GridLayout";

const meta: Meta<typeof NuiButtonGroup> = {
  title: "Components/Button Group",
  component: NuiButtonGroup,
  decorators: [
    (Story: StoryFn) => (
      <div className="flex flex-col gap-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof NuiButtonGroup>;

export const Main: Story = {
  render: (args) => {
    return (
      <>
        <NuiButtonGroup {...args} value="download">
          <NuiButton value="email">
            Email <EnvelopeSimple size={16} className="ml-2" />
          </NuiButton>
          <NuiButton value="download">
            Download <DownloadSimple size={16} className="ml-2" />
          </NuiButton>
          <NuiButton value="settings">
            Settings <Gear size={16} className="ml-2" />
          </NuiButton>
        </NuiButtonGroup>
      </>
    );
  },
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the `size`, `color` and `radius` props to control the visual style of the button group.",
      },
    },
  },
  render: () => {
    return (
      <>
        <NuiButtonGroup value="option2">
          <NuiButton value="option1">Option 1</NuiButton>
          <NuiButton value="option2">Option 2</NuiButton>
          <NuiButton value="option3">Option 3</NuiButton>
          <NuiButton value="option4">Option 4</NuiButton>
        </NuiButtonGroup>
        <NuiButtonGroup
          variant="outline"
          value="option2"
          color="success"
          size="lg"
        >
          <NuiButton value="option1">Option 1</NuiButton>
          <NuiButton value="option2">Option 2</NuiButton>
          <NuiButton value="option3">Option 3</NuiButton>
          <NuiButton value="option4">Option 4</NuiButton>
        </NuiButtonGroup>
      </>
    );
  },
};

export const Single_and_Multi_Selection: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the `value` and `onChange` props to control the selected state of the button group.",
      },
    },
  },
  render: () => {
    const [singleValue, setSingleValue] = useState("option1");
    const [multipleValue, setMultipleValue] = useState(["option1", "option2"]);

    const handleSingle = (evt: React.MouseEvent<HTMLButtonElement>) => {
      const val = evt.currentTarget.value;
      setSingleValue(val);
    };

    const handleMultiple = (evt: React.MouseEvent<HTMLButtonElement>) => {
      const val = evt.currentTarget.value;
      const newValue = multipleValue.includes(val)
        ? multipleValue.filter((f) => f !== val)
        : multipleValue.concat([val]);

      setMultipleValue(newValue);
    };

    return (
      <>
        <NuiButtonGroup value={singleValue} onChange={handleSingle}>
          <NuiButton value="option1">Option 1</NuiButton>
          <NuiButton value="option2">Option 2</NuiButton>
          <NuiButton value="option3">Option 3</NuiButton>
          <NuiButton value="option4">Option 4</NuiButton>
        </NuiButtonGroup>
        <NuiButtonGroup
          variant="outline"
          value={multipleValue}
          onChange={handleMultiple}
        >
          <NuiButton value="option1">Option 1</NuiButton>
          <NuiButton value="option2">Option 2</NuiButton>
          <NuiButton value="option3">Option 3</NuiButton>
          <NuiButton value="option4">Option 4</NuiButton>
        </NuiButtonGroup>
      </>
    );
  },
};

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the `vertical` prop to control the orientation of the button group.",
      },
    },
  },
  decorators: [
    (Story: StoryFn) => (
      <div className="flex gap-4">
        <Story />
      </div>
    ),
  ],
  render: () => {
    return (
      <>
        <NuiButtonGroup value="option2" vertical variant="outline" radius="md">
          <NuiButton value="option1">
            <TextAlignLeft />
          </NuiButton>
          <NuiButton value="option2">
            <TextAlignCenter />
          </NuiButton>
          <NuiButton value="option3">
            <TextAlignRight />
          </NuiButton>
          <NuiButton value="option4">
            <TextAlignJustify />
          </NuiButton>
        </NuiButtonGroup>
        <NuiButtonGroup value="option2" vertical radius="md">
          <NuiButton value="option1">Option 11</NuiButton>
          <NuiButton value="option2">Option 2</NuiButton>
          <NuiButton value="option3">Option 3</NuiButton>
          <NuiButton value="option4">Option 4</NuiButton>
        </NuiButtonGroup>
      </>
    );
  },
};

export const Custom: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "You can customize the `Button Group` component by passing custom classes to the component.",
      },
    },
  },
  render: () => (
    <NuiButtonGroup
      className="rounded bg-white p-2"
      color="#C8C8C8"
      value="option2"
      size="lg"
      radius="sm"
      spacing={4}
      iconOnly
    >
      <NuiButton value="option1">
        <TextAlignLeft />
      </NuiButton>
      <NuiButton value="option2">
        <TextAlignCenter />
      </NuiButton>
      <NuiButton value="option3">
        <TextAlignRight />
      </NuiButton>
      <NuiButton value="option4">
        <TextAlignJustify />
      </NuiButton>
    </NuiButtonGroup>
  ),
};

export const Tests: Story = {
  parameters: {
    docs: {
      description: {
        story: "Story to be used on visual tests.",
      },
    },
    verticalCentered: false,
  },
  render: () => (
    <GridLayout
      sections={[
        { name: "Main", component: Main },
        { name: "Variants", component: Variants },
        {
          name: "Single and Multi Selection",
          component: Single_and_Multi_Selection,
        },
        { name: "Vertical", component: Vertical },
        { name: "Custom", component: Custom },
      ]}
    />
  ),
};
