import { NuiTypography, useTheme } from "@next-design-labs/next-ui-core";
import type { StoryFn, StoryObj } from "@storybook/react";

import {
  hexToRgb,
  contrastRatio,
  getAccessibleTextColor,
  getContrastRating,
} from "./colorUtils";

// Meta configuration for Storybook
const meta = {
  title: "Theme/Colors",
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

// Colors story
export const Colors: StoryObj = {
  render: () => {
    const { theme } = useTheme();
    const colors = theme?.colors ?? {};

    // Exclude non-shade colors
    const { inherit, current, transparent, white, black, ...shadeColors } =
      colors;

    return (
      <div className="space-y-16 max-w-[1024px] mx-auto">
        {Object.entries(shadeColors).map(([colorName, shades]) => (
          <section key={colorName}>
            {/* Section title */}
            <NuiTypography
              variant="title4"
              className="mb-6 text-slate-700 font-semibold"
            >
              {colorName.charAt(0).toUpperCase() + colorName.slice(1)}
            </NuiTypography>

            {/* Color shades grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {Object.entries(shades).map(([shade, value]) => {
                const textColor = getAccessibleTextColor(value);
                const contrast = contrastRatio(value, textColor);
                const contrastRating = getContrastRating(contrast);
                const { r, g, b } = hexToRgb(value);

                return (
                  <div
                    key={`${colorName}-${shade}`}
                    className="relative flex flex-col justify-between w-full min-w-[200px] h-32 p-4 border border-slate-200 rounded-lg transition-shadow hover:shadow-md"
                    style={{ backgroundColor: value }}
                    aria-label={`Color ${colorName} ${shade}`}
                  >
                    {/* Shade number */}
                    <NuiTypography
                      variant="caption1"
                      style={{ color: textColor }}
                      className="font-semibold"
                    >
                      {shade}
                    </NuiTypography>

                    {/* Hex, RGBA values, and contrast info */}
                    <div className="text-right">
                      <NuiTypography
                        variant="caption1"
                        style={{ color: textColor }}
                        className="mb-2"
                      >
                        {value}
                      </NuiTypography>
                      <NuiTypography
                        variant="caption1"
                        style={{ color: textColor }}
                        className="text-xs"
                      >
                        rgb({r}, {g}, {b})
                      </NuiTypography>
                      <NuiTypography
                        variant="caption1"
                        style={{ color: textColor }}
                        className={`text-xs font-medium ${contrastRating === "Fail" ? "text-red-500" : ""}`}
                      >
                        {contrast.toFixed(2)} ({contrastRating})
                      </NuiTypography>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    );
  },
};
