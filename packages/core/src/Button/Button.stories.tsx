import { HvButton } from "@next-design-labs/next-ui-core";
import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { IconContext } from "react-icons";
import { RxDownload, RxEnvelopeClosed, RxShare1 } from "react-icons/rx";

const meta: Meta<typeof HvButton> = {
  title: "Components/Button",
  component: HvButton,
  decorators: [
    (Story: StoryFn) => (
      <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
        <div className="flex items-center gap-4">
          <Story />
        </div>
      </IconContext.Provider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof HvButton>;

export const Main: Story = {
  render: (args) => <HvButton {...args}>Button</HvButton>,
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the `variant` prop to change the visual style of the Button.",
      },
    },
  },
  render: () => (
    <>
      <HvButton>Solid</HvButton>
      <HvButton variant="outline">Outline</HvButton>
      <HvButton variant="ghost">Ghost</HvButton>
      <HvButton variant="link" href="/">
        Link
      </HvButton>
    </>
  ),
};

export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story: "Use the `color` prop to change the color scheme of the Button.",
      },
    },
  },
  decorators: [
    (Story: StoryFn) => (
      <div className="grid grid-cols-5 gap-4">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <HvButton>Primary</HvButton>
      <HvButton color="secondary">Secondary</HvButton>
      <HvButton color="positive">Positive</HvButton>
      <HvButton color="warning">Warning</HvButton>
      <HvButton color="negative">Negative</HvButton>
      <HvButton variant="outline">Primary</HvButton>
      <HvButton variant="outline" color="secondary">
        Secondary
      </HvButton>
      <HvButton variant="outline" color="positive">
        Positive
      </HvButton>
      <HvButton variant="outline" color="warning">
        Warning
      </HvButton>
      <HvButton variant="outline" color="negative">
        Negative
      </HvButton>
    </>
  ),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: "Use the `size` prop to change the size of the button.",
      },
    },
  },
  render: () => (
    <>
      <HvButton size="sm">Small</HvButton>
      <HvButton size="md">Medium</HvButton>
      <HvButton variant="outline" size="lg">
        Large
      </HvButton>
    </>
  ),
};

export const Radius: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the `radius` prop to change the border-radius of the button.",
      },
    },
  },
  render: () => (
    <>
      <HvButton radius="sm">Small</HvButton>
      <HvButton radius="md" variant="outline">
        Medium
      </HvButton>
      <HvButton radius="lg" variant="outline">
        Large
      </HvButton>
    </>
  ),
};

export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: "Pass the `isLoading` prop to show a loader inside the button. ",
      },
    },
  },
  render: () => (
    <>
      <HvButton loading />
      <HvButton loading variant="outline" color="secondary">
        Submitting
      </HvButton>
    </>
  ),
};

export const Icons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "You can add icons to the Button component passing the `leftIcon` and `rightIcon` props respectively.",
      },
    },
  },
  render: () => (
    <>
      <HvButton leftIcon={<RxEnvelopeClosed />}>Email</HvButton>
      <HvButton rightIcon={<RxDownload />} variant="outline">
        Download
      </HvButton>
    </>
  ),
};

export const IconOnly: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "You can also display a button without text by passing the `iconOnly` prop and the desired icon as children.",
      },
    },
  },
  render: () => (
    <>
      <HvButton iconOnly size="sm" variant="outline" radius="lg">
        <RxEnvelopeClosed />
      </HvButton>
      <HvButton iconOnly>
        <RxDownload />
      </HvButton>
      <HvButton
        iconOnly
        size="lg"
        variant="outline"
        color="negative"
        radius="lg"
      >
        <RxShare1 />
      </HvButton>
    </>
  ),
};

export const Custom: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "You can customize the `Button` component by passing custom classes to the component.",
      },
    },
  },
  render: () => (
    <>
      <HvButton className="bg-gradient-to-tr from-primary to-negative text-atmo1 shadow-lg">
        Button
      </HvButton>
    </>
  ),
};
