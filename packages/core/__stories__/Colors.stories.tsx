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

export const Palette: StoryObj = {
  render: () => {
    const { theme } = useTheme();
    const colors = theme?.colors ?? {};

    const { inherit, current, transparent, white, black, ...rest } = colors;

    return (
      <div className="space-y-10 max-w-[1024px]">
        {Object.entries(rest).map(([colorName, shades]) => (
          <section key={colorName}>
            {/* Section title */}
            <NuiTypography
              variant="title4"
              className="mb-4 pb-4 border-b border-slate-300"
            >
              {colorName}
            </NuiTypography>

            {/* Color shades grid */}
            <div className="flex flex-wrap gap-4">
              {Object.entries(shades).map(([shade, value]) => (
                <div key={`${colorName}-${shade}`} className="w-19 mb-10">
                  {/* Color block */}
                  <div
                    className="w-full h-18 border border-slate-300 rounded-sm"
                    style={{ backgroundColor: value }}
                  />

                  {/* Shade name */}
                  <NuiTypography variant="caption1" className="mt-2">
                    {`${colorName}-${shade}`}
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
