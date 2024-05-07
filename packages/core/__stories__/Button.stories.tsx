import { NuiButton } from "@next-design-labs/next-ui-core";
import {
  DownloadSimple,
  EnvelopeSimple,
  ShareNetwork,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";

import { GridLayout } from "./GridLayout";

const meta: Meta<typeof NuiButton> = {
  title: "Components/Button",
  component: NuiButton,
};

export default meta;

type Story = StoryObj<typeof NuiButton>;

export const Main: Story = {
  render: () => <NuiButton>Button</NuiButton>,
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
      <NuiButton variant="ghost">Ghost</NuiButton>
      <NuiButton variant="link">Link</NuiButton>
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
  render: () => (
    <>
      <NuiButton>Primary</NuiButton>
      <NuiButton color="secondary">Secondary</NuiButton>
      <NuiButton color="success">Positive</NuiButton>
      <NuiButton color="warning">Warning</NuiButton>
      <NuiButton color="error">Negative</NuiButton>
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
        story: "Pass the `isLoading` prop to show a loader inside the button.",
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
      <NuiButton>
        <EnvelopeSimple size={16} className="mr-2" />
        Email
      </NuiButton>
      <NuiButton variant="outline">
        <DownloadSimple size={16} className="mr-2" />
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
      <NuiButton iconOnly size="sm" variant="outline">
        <EnvelopeSimple size={16} />
      </NuiButton>
      <NuiButton iconOnly>
        <DownloadSimple size={16} />
      </NuiButton>
      <NuiButton iconOnly size="lg" variant="outline">
        <ShareNetwork size={20} />
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
    <NuiButton
      className="bg-gradient-to-tr from-primary to-error "
      radius="none"
    >
      Custom Button
    </NuiButton>
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
        { name: "Colors", component: Colors },
        { name: "Sizes", component: Sizes },
        { name: "Radius", component: Radius },
        { name: "Loading", component: Loading },
        { name: "Icons", component: Icons },
        { name: "IconOnly", component: IconOnly },
        { name: "Custom", component: Custom },
      ]}
    />
  ),
};
