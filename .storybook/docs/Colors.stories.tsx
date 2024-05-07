import { NuiTypography, useTheme } from "@next-design-labs/next-ui-core";
import type { StoryFn, StoryObj } from "@storybook/react";
import React from "react";

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
    centerStory: false,
  },
};

export default meta;

// Render the grid of colors
export const Palette: StoryObj = {
  render: () => {
    const { theme } = useTheme();

    return (
      <div className="space-y-10 max-w-[10240px]">
        {Object.entries(theme?.colors ?? {}).map(([colorName, colorShades]) => (
          <div key={colorName} className="border-t border-slate-300 pt-4">
            <NuiTypography variant="title4" className="mb-2">
              {colorName}
            </NuiTypography>
            <div className="flex flex-wrap gap-4">
              {Object.entries(colorShades).map(([shade, value]) => (
                <div key={`${colorName}-${shade}`} className="w-20 h-20 mb-10">
                  <div
                    className="w-full h-18 border border-slate-300 rounded-round"
                    style={{
                      backgroundColor: value,
                    }}
                  />
                  <NuiTypography
                    variant="caption1"
                    className="mt-2"
                  >{`${colorName}-${shade}`}</NuiTypography>
                  <NuiTypography
                    variant="caption1"
                    className="text-slate-400 text-xs"
                  >
                    {value}
                  </NuiTypography>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
