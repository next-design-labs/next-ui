import { HvButton, HvButtonGroup } from "@next-design-labs/next-ui-core";
import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  RxDownload,
  RxEnvelopeClosed,
  RxGear,
  RxShare1,
  RxTextAlignCenter,
  RxTextAlignJustify,
  RxTextAlignLeft,
  RxTextAlignRight,
} from "react-icons/rx";

const meta: Meta<typeof HvButtonGroup> = {
  title: "Components/Button Group",
  component: HvButtonGroup,
  decorators: [
    (Story: StoryFn) => (
      <div className="flex flex-col gap-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof HvButtonGroup>;

export const Main: Story = {
  render: (args) => {
    return (
      <HvButtonGroup value="download" {...args}>
        <HvButton value="email" leftIcon={<RxEnvelopeClosed />}>
          Email
        </HvButton>
        <HvButton value="download" leftIcon={<RxDownload />}>
          Download
        </HvButton>
        <HvButton value="settings" leftIcon={<RxGear />}>
          Settings
        </HvButton>
        <HvButton value="support" leftIcon={<RxShare1 />}>
          Share
        </HvButton>
      </HvButtonGroup>
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
        <HvButtonGroup
          variant="solid"
          color="primary"
          size="sm"
          value="option2"
        >
          <HvButton value="option1">Option 1</HvButton>
          <HvButton value="option2">Option 2</HvButton>
          <HvButton value="option3">Option 3</HvButton>
          <HvButton value="option4">Option 4</HvButton>
        </HvButtonGroup>
        <HvButtonGroup
          variant="outline"
          color="primary"
          size="md"
          value="option2"
        >
          <HvButton value="option1">Option 1</HvButton>
          <HvButton value="option2">Option 2</HvButton>
          <HvButton value="option3">Option 3</HvButton>
          <HvButton value="option4">Option 4</HvButton>
        </HvButtonGroup>
        <HvButtonGroup
          variant="outline"
          color="secondary"
          size="lg"
          radius="lg"
          value="option2"
        >
          <HvButton value="option1">Option 1</HvButton>
          <HvButton value="option2">Option 2</HvButton>
          <HvButton value="option3">Option 3</HvButton>
          <HvButton value="option4">Option 4</HvButton>
        </HvButtonGroup>
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
        <HvButtonGroup value={singleValue} onChange={handleSingle}>
          <HvButton value="option1">Option 1</HvButton>
          <HvButton value="option2">Option 2</HvButton>
          <HvButton value="option3">Option 3</HvButton>
          <HvButton value="option4">Option 4</HvButton>
        </HvButtonGroup>
        <HvButtonGroup
          color="primary"
          variant="solid"
          value={multipleValue}
          onChange={handleMultiple}
        >
          <HvButton value="option1">Option 1</HvButton>
          <HvButton value="option2">Option 2</HvButton>
          <HvButton value="option3">Option 3</HvButton>
          <HvButton value="option4">Option 4</HvButton>
        </HvButtonGroup>
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
        <HvButtonGroup value="option2" vertical iconOnly>
          <HvButton value="option1" leftIcon={<RxTextAlignLeft />} />
          <HvButton value="option2" leftIcon={<RxTextAlignCenter />} />
          <HvButton value="option3" leftIcon={<RxTextAlignRight />} />
          <HvButton value="option4" leftIcon={<RxTextAlignJustify />} />
        </HvButtonGroup>
        <HvButtonGroup value="option2" vertical>
          <HvButton value="option1">Option 1</HvButton>
          <HvButton value="option2">Option 2</HvButton>
          <HvButton value="option3">Option 3</HvButton>
          <HvButton value="option4">Option 4</HvButton>
        </HvButtonGroup>
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
  decorators: [
    (Story: StoryFn) => (
      <div className="flex gap-4">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <HvButtonGroup
        className="rounded border-1 border-atmo4 bg-atmo1 p-.5"
        value="option2"
        variant="ghost"
        size="lg"
        spacing={1}
        iconOnly
      >
        <HvButton value="option1" leftIcon={<RxTextAlignLeft />} />
        <HvButton value="option2" leftIcon={<RxTextAlignCenter />} />
        <HvButton value="option3" leftIcon={<RxTextAlignRight />} />
        <HvButton value="option4" leftIcon={<RxTextAlignJustify />} />
      </HvButtonGroup>
    </>
  ),
};
