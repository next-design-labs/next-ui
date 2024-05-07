import { Button, ButtonGroup } from "@next-design-labs/next-ui-core";
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

const meta: Meta<typeof ButtonGroup> = {
  title: "Components/Button Group",
  component: ButtonGroup,
  decorators: [
    (Story: StoryFn) => (
      <div className="flex flex-col gap-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Main: Story = {
  render: (args) => {
    return (
      <>
        <ButtonGroup {...args} value="download">
          <Button value="email" leftIcon={<RxEnvelopeClosed />}>
            Email
          </Button>
          <Button value="download" leftIcon={<RxDownload />}>
            Download
          </Button>
          <Button value="settings" leftIcon={<RxGear />}>
            Settings
          </Button>
          <Button value="support" leftIcon={<RxShare1 />}>
            Share
          </Button>
        </ButtonGroup>
        <ButtonGroup
          {...args}
          value="download"
          variant="outline"
          color="emerald-500"
          size="lg"
          radius="md"
        >
          <Button value="email" leftIcon={<RxEnvelopeClosed />}>
            Email
          </Button>
          <Button value="download" leftIcon={<RxDownload />}>
            Download
          </Button>
          <Button value="settings" leftIcon={<RxGear />}>
            Settings
          </Button>
          <Button value="support" leftIcon={<RxShare1 />}>
            Share
          </Button>
        </ButtonGroup>
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
        <ButtonGroup variant="solid" color="primary" size="md" value="option2">
          <Button value="option1">Option 1</Button>
          <Button value="option2">Option 2</Button>
          <Button value="option3">Option 3</Button>
          <Button value="option4">Option 4</Button>
        </ButtonGroup>
        <ButtonGroup variant="outline" value="option2" color="success">
          <Button value="option1">Option 1</Button>
          <Button value="option2">Option 2</Button>
          <Button value="option3">Option 3</Button>
          <Button value="option4">Option 4</Button>
        </ButtonGroup>
        <ButtonGroup value="option2" color="success">
          <Button value="option1">Option 1</Button>
          <Button value="option2">Option 2</Button>
          <Button value="option3">Option 3</Button>
          <Button value="option4">Option 4</Button>
        </ButtonGroup>
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
        <ButtonGroup value={singleValue} onChange={handleSingle}>
          <Button value="option1">Option 1</Button>
          <Button value="option2">Option 2</Button>
          <Button value="option3">Option 3</Button>
          <Button value="option4">Option 4</Button>
        </ButtonGroup>
        <ButtonGroup
          variant="outline"
          value={multipleValue}
          onChange={handleMultiple}
        >
          <Button value="option1">Option 1</Button>
          <Button value="option2">Option 2</Button>
          <Button value="option3">Option 3</Button>
          <Button value="option4">Option 4</Button>
        </ButtonGroup>
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
        <ButtonGroup value="option2" vertical iconOnly variant="outline">
          <Button value="option1" leftIcon={<RxTextAlignLeft />} />
          <Button value="option2" leftIcon={<RxTextAlignCenter />} />
          <Button value="option3" leftIcon={<RxTextAlignRight />} />
          <Button value="option4" leftIcon={<RxTextAlignJustify />} />
        </ButtonGroup>
        <ButtonGroup value="option2" vertical>
          <Button value="option1">Option 11</Button>
          <Button value="option2">Option 2</Button>
          <Button value="option3">Option 3</Button>
          <Button value="option4">Option 4</Button>
        </ButtonGroup>
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
      <ButtonGroup
        className="rounded bg-white p-1"
        color="#C8C8C8"
        value="option2"
        size="lg"
        radius="sm"
        spacing={4}
        iconOnly
      >
        <Button value="option1" leftIcon={<RxTextAlignLeft />} />
        <Button value="option2" leftIcon={<RxTextAlignCenter />} />
        <Button value="option3" leftIcon={<RxTextAlignRight />} />
        <Button value="option4" leftIcon={<RxTextAlignJustify />} />
      </ButtonGroup>
    </>
  ),
};
