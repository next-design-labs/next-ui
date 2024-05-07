import {
  NuiTypography,
  colorTokens,
  useTheme,
} from "@next-design-labs/next-ui-core";
import type { StoryFn, StoryObj } from "@storybook/react";

const meta = {
  title: "Theme/Color Tokens",
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

export const ColorTokens: StoryObj = {
  render: () => {
    const { theme } = useTheme();
    const activeMode = theme.colorMode;

    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(colorTokens).map(([category, categoryValues]) => (
          <div key={category} className="">
            {/* Category Title */}
            <NuiTypography variant="title4" className="mb-4">
              {category}
            </NuiTypography>

            {/* Tokens */}
            {Object.entries(categoryValues).map(([state, token]) => {
              const value =
                token[activeMode as keyof typeof token] || token.light; // Use activeMode or fallback to light mode

              return (
                <div key={state} className="flex items-center mb-4 p-4 ">
                  {/* Color Preview */}
                  <div
                    className="w-12 h-12 rounded-full flex-shrink-0"
                    style={{ backgroundColor: value }}
                  />

                  {/* Token Info */}
                  <div className="ml-4">
                    <NuiTypography variant="label" className="block">
                      {state}
                    </NuiTypography>
                    <NuiTypography
                      variant="caption1"
                      className="block text-gray-600 dark:text-gray-300"
                    >
                      {token.description}
                    </NuiTypography>
                    <NuiTypography
                      variant="caption1"
                      className="block mt-1 text-slate-500 dark:text-slate-400"
                    >
                      {value}
                    </NuiTypography>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  },
};
