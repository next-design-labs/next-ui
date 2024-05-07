import { NuiButton, type NuiButtonProps } from "@next-design-labs/next-ui-core";
import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { IconContext } from "react-icons";
import { RxDownload, RxEnvelopeClosed, RxShare1 } from "react-icons/rx";

const meta: Meta<typeof NuiButton> = {
  title: "Components/Button",
  component: NuiButton,
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

type Story = StoryObj<typeof NuiButton>;

export const Main: Story = {
  render: (args) => <NuiButton {...args}>Button</NuiButton>,
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
      <NuiButton>Solid</NuiButton>
      <NuiButton variant="outline">Outline</NuiButton>
      <NuiButton variant="subtle">Subtle</NuiButton>
      <NuiButton variant="ghost">Ghost</NuiButton>
      <NuiButton variant="link" href="/">
        Link
      </NuiButton>
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
      <NuiButton>Primary</NuiButton>
      <NuiButton color="secondary">Secondary</NuiButton>
      <NuiButton color="positive">Positive</NuiButton>
      <NuiButton color="warning">Warning</NuiButton>
      <NuiButton color="negative">Negative</NuiButton>
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
      <NuiButton size="sm">Small</NuiButton>
      <NuiButton size="md">Medium</NuiButton>
      <NuiButton variant="outline" size="lg">
        Large
      </NuiButton>
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
      <NuiButton radius="sm">Small</NuiButton>
      <NuiButton radius="md" variant="outline">
        Medium
      </NuiButton>
      <NuiButton radius="lg" variant="outline">
        Large
      </NuiButton>
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
      <NuiButton loading />
      <NuiButton loading variant="outline">
        Submitting
      </NuiButton>
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
      <NuiButton leftIcon={<RxEnvelopeClosed />}>Email</NuiButton>
      <NuiButton rightIcon={<RxDownload />} variant="outline">
        Download
      </NuiButton>
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
      <NuiButton iconOnly size="sm" variant="outline" radius="lg">
        <RxEnvelopeClosed />
      </NuiButton>
      <NuiButton iconOnly>
        <RxDownload />
      </NuiButton>
      <NuiButton iconOnly size="lg" variant="outline">
        <RxShare1 />
      </NuiButton>
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
      <NuiButton
        className="bg-gradient-to-tr from-primary to-error"
        radius="none"
      >
        Custom Button
      </NuiButton>
    </>
  ),
};

const variants = [
  "solid",
  "outline",
  "subtle",
  "ghost",
] satisfies NuiButtonProps["variant"][];

const colors = [
  "primary",
  "secondary",
  "positive",
  "warning",
  "negative",
] satisfies NuiButtonProps["color"][];

export const Tests: Story = {
  parameters: {
    docs: {
      description: {
        story: "Story to be used on visual tests.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-4 max-w-[400px]">
      {colors.map((color) =>
        variants.map((variant) => (
          <>
            {/* Standard Button */}
            <NuiButton
              key={`${color}-${variant}`}
              color={color}
              variant={variant}
            >
              Button
            </NuiButton>

            {/* Button with left icon */}
            <NuiButton
              key={`${color}-${variant}-leftIcon`}
              color={color}
              variant={variant}
              leftIcon={<RxEnvelopeClosed />}
            >
              Button
            </NuiButton>

            {/* Button with right icon */}
            <NuiButton
              key={`${color}-${variant}-rightIcon`}
              color={color}
              variant={variant}
              rightIcon={<RxDownload />}
            >
              Button
            </NuiButton>

            {/* Icon only button */}
            <NuiButton
              key={`${color}-${variant}-iconOnly`}
              color={color}
              variant={variant}
              iconOnly
            >
              <RxEnvelopeClosed />
            </NuiButton>
          </>
        )),
      )}
    </div>
  ),
};
