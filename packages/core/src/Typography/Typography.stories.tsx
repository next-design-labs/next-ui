import {
  NuiTypography,
  type NuiTypographyProps,
} from "@next-design-labs/next-ui-core";
import type { Meta, StoryFn, StoryObj } from "@storybook/react";

const meta: Meta<typeof NuiTypography> = {
  title: "Theme/Typography",
  component: NuiTypography,
  decorators: [
    (Story: StoryFn) => (
      <div className="flex-col space-y-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof NuiTypography>;

const variants = [
  { label: "display", variant: "display" },
  { label: "title1", variant: "title1" },
  { label: "title2", variant: "title2" },
  { label: "title3", variant: "title3" },
  { label: "title4", variant: "title4" },
  { label: "body", variant: "body" },
  { label: "label", variant: "label", className: "block" },
  { label: "captionLabel", variant: "captionLabel" },
  { label: "caption1", variant: "caption1" },
  { label: "caption2", variant: "caption2" },
];

export const Variants: Story = {
  render: () => (
    <>
      {variants.map(({ label, variant, className }) => (
        <div key={variant}>
          <NuiTypography variant="label">{label}</NuiTypography>
          <NuiTypography
            variant={variant as NuiTypographyProps["variant"]}
            className={className}
          >
            Welcome to NEXT UI
          </NuiTypography>
        </div>
      ))}
    </>
  ),
};
