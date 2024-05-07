import { NuiTypography, useTheme } from "@next-design-labs/next-ui-core";
import type { StoryFn, StoryObj } from "@storybook/react";

const meta = {
  title: "Theme/Colors",
  decorators: [
    (Story: StoryFn) => (
      <div className="flex justify-center m-15">
        <Story />
      </div>
    ),
  ],
  parameters: {
    verticalCentered: false,
  },
};

export default meta;

export const Colors: StoryObj = {
  render: () => {
    const { theme } = useTheme();
    const colors = theme?.colors ?? {};

    const { inherit, current, transparent, white, black, ...rest } = colors;

    return (
      <div className="space-y-10 max-w-[1024px]">
        {Object.entries(rest).map(([colorName, shades]) => (
          <section key={colorName}>
            {/* Section title */}
            <NuiTypography variant="title4" className="mb-4">
              {colorName}
            </NuiTypography>

            {/* Color shades grid */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(shades).map(([shade, value]) => (
                <div key={`${colorName}-${shade}`} className="w-16">
                  {/* Color block */}
                  <div
                    className="w-full h-15 border border-slate-200 rounded-xs"
                    style={{ backgroundColor: value }}
                  />

                  {/* Shade name */}
                  <NuiTypography
                    variant="caption1"
                    className="text-slate-500 mt-4"
                  >
                    {shade}
                  </NuiTypography>

                  {/* Color value */}
                  <NuiTypography
                    variant="caption1"
                    className="text-slate-400 text-xs"
                  >
                    {value}
                  </NuiTypography>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  },
};
