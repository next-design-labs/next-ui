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
  title: "Theme/Color Tokens",
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

/**
 * TokenInfo Component
 */
const TokenInfo = ({
  value,
  textColor,
  r,
  g,
  b,
  contrast,
  contrastRating,
}: {
  value: string;
  textColor: string;
  r: number;
  g: number;
  b: number;
  contrast: number;
  contrastRating: string;
}) => (
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
      className={`text-xs font-medium ${
        contrastRating === "Fail" ? "text-red-500" : ""
      }`}
    >
      Contrast: {contrast.toFixed(2)} ({contrastRating})
    </NuiTypography>
  </div>
);

// ColorTokens story
export const ColorTokens: StoryObj = {
  render: () => {
    const { theme } = useTheme();
    const activeMode = theme.colorMode;

    return (
      <div className="space-y-16 max-w-[1024px] mx-auto">
        {Object.entries(theme.colorTokens).map(([category, categoryValues]) => (
          <section key={category}>
            {/* Category Title */}
            <NuiTypography
              variant="title4"
              className="mb-6 text-slate-700 font-semibold"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </NuiTypography>

            {/* Tokens Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {Object.entries(categoryValues).map(([state, token]) => {
                const value =
                  token[activeMode as keyof typeof token] || token.light;
                const textColor = getAccessibleTextColor(value);
                const contrast = contrastRatio(value, textColor);
                const contrastRating = getContrastRating(contrast);
                const { r, g, b } = hexToRgb(value);

                return (
                  <div
                    key={state}
                    className="relative flex flex-col justify-between w-full h-48 p-4 border border-slate-200 rounded-lg transition-shadow hover:shadow-md"
                    style={{ backgroundColor: value }}
                    aria-label={`Color Token ${category} ${state}`}
                  >
                    {/* Token Name */}
                    <NuiTypography
                      variant="caption1"
                      style={{ color: textColor }}
                      className="font-semibold"
                    >
                      {state}
                    </NuiTypography>

                    {/* Token Description */}
                    <NuiTypography
                      variant="caption1"
                      style={{ color: textColor }}
                      className="text-sm"
                    >
                      {token.description}
                    </NuiTypography>

                    {/* Hex, RGBA values, and contrast info */}
                    <TokenInfo
                      value={value}
                      textColor={textColor}
                      r={r}
                      g={g}
                      b={b}
                      contrast={contrast}
                      contrastRating={contrastRating}
                    />
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
