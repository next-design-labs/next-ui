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
      <div className="flex justify-center p-10">
        <Story />
      </div>
    ),
  ],
  parameters: {
    verticalCentered: false,
  },
};

export default meta;

type Story = StoryObj<typeof NuiTypography>;

const variants = [
  {
    label: "Display",
    variant: "display",
    fontSize: "48px",
    lineHeight: "56px",
    fontWeight: "600",
  },
  {
    label: "Title 1",
    variant: "title1",
    fontSize: "32px",
    lineHeight: "40px",
    fontWeight: "600",
  },
  {
    label: "Title 2",
    variant: "title2",
    fontSize: "28px",
    lineHeight: "36px",
    fontWeight: "600",
  },
  {
    label: "Title 3",
    variant: "title3",
    fontSize: "24px",
    lineHeight: "32px",
    fontWeight: "600",
  },
  {
    label: "Title 4",
    variant: "title4",
    fontSize: "20px",
    lineHeight: "28px",
    fontWeight: "600",
  },
  {
    label: "Body",
    variant: "body",
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: "400",
  },
  {
    label: "Label",
    variant: "label",
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "500",
    className: "block",
  },
  {
    label: "Caption Label",
    variant: "captionLabel",
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: "500",
  },
  {
    label: "Caption 1",
    variant: "caption1",
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: "400",
  },
  {
    label: "Caption 2",
    variant: "caption2",
    fontSize: "10px",
    lineHeight: "12px",
    fontWeight: "400",
  },
];

export const Typography: Story = {
  render: () => {
    return (
      <div className="space-y-16 max-w-[1024px] mx-auto">
        <section>
          {/* Section Title */}
          <NuiTypography
            variant="title4"
            className="mb-6 text-slate-700 font-semibold"
          >
            Typography
          </NuiTypography>

          {/* Tokens Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {variants.map(
              ({
                label,
                variant,
                fontSize,
                lineHeight,
                fontWeight,
                className,
              }) => (
                <div
                  key={variant}
                  className="relative flex flex-col justify-between w-full h-48 p-4 border border-slate-200 rounded-lg transition-shadow hover:shadow-md bg-white"
                >
                  {/* Token Name */}
                  <NuiTypography
                    variant="caption1"
                    className="font-semibold text-slate-800"
                  >
                    {label}
                  </NuiTypography>

                  {/* Typography Preview */}
                  <NuiTypography
                    variant={variant as NuiTypographyProps["variant"]}
                    className={className}
                  >
                    Welcome to NEXT UI
                  </NuiTypography>

                  {/* Typography Details */}
                  <div className="text-right">
                    <NuiTypography
                      variant="caption1"
                      className="text-slate-600"
                    >
                      Font Size: {fontSize}
                    </NuiTypography>
                    <NuiTypography
                      variant="caption1"
                      className="text-slate-600"
                    >
                      Line Height: {lineHeight}
                    </NuiTypography>
                    <NuiTypography
                      variant="caption1"
                      className="text-slate-600"
                    >
                      Font Weight: {fontWeight}
                    </NuiTypography>
                  </div>
                </div>
              ),
            )}
          </div>
        </section>
      </div>
    );
  },
};
