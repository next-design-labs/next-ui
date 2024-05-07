import { Button } from "@next-design-labs/next-ui-core";
import type { Meta, StoryContext, StoryFn, StoryObj } from "@storybook/react";
import { memo } from "react";
import { IconContext } from "react-icons";
import { RxDownload, RxEnvelopeClosed, RxShare1 } from "react-icons/rx";

const IconProviderDecorator = memo(
  ({ children }: { children: React.ReactNode }) => (
    <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
      <div className="flex items-center gap-4">{children}</div>
    </IconContext.Provider>
  ),
);

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  decorators: [
    (Story: StoryFn) => (
      <IconProviderDecorator>
        <Story />
      </IconProviderDecorator>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Main: Story = {
  render: () => (
    <>
      <Button>Button</Button>
    </>
  ),
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
      <Button>Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
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
      <Button>Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success">Positive</Button>
      <Button color="warning">Warning</Button>
      <Button color="error">Negative</Button>
      <Button color="rebeccapurple" variant="link">
        Negative
      </Button>
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
      <Button size="sm">Small</Button>
      <Button size="md" color="pink">
        Medium
      </Button>
      <Button variant="outline" size="lg">
        Large
      </Button>
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
      <Button radius="sm">Small</Button>
      <Button radius="md" variant="outline">
        Medium
      </Button>
      <Button radius="lg" variant="outline">
        Large
      </Button>
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
      <Button loading />
      <Button loading variant="outline">
        Submitting
      </Button>
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
      <Button leftIcon={<RxEnvelopeClosed />}>Email</Button>
      <Button rightIcon={<RxDownload />} variant="outline">
        Download
      </Button>
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
      <Button iconOnly size="sm" variant="outline" radius="lg">
        <RxEnvelopeClosed />
      </Button>
      <Button iconOnly>
        <RxDownload />
      </Button>
      <Button iconOnly size="lg" variant="outline">
        <RxShare1 />
      </Button>
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
    <Button className="bg-gradient-to-tr from-primary to-error" radius="none">
      Custom Button
    </Button>
  ),
};

export const Tests: Story = {
  parameters: {
    docs: {
      description: {
        story: "Story to be used on visual tests.",
      },
    },
  },
  render: () => {
    const sections = [
      Variants,
      Colors,
      Sizes,
      Radius,
      Loading,
      Icons,
      IconOnly,
      Custom,
    ];

    return (
      <div className="flex flex-col gap-3">
        {sections.map((story, index) => (
          <div
            key={`${story.name}-${index}`}
            className="flex items-center gap-3"
          >
            {story?.render ? story.render({}, {} as StoryContext) : null}
          </div>
        ))}
      </div>
    );
  },
};
