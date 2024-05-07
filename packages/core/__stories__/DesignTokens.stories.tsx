import {
  type NuiThemeVars,
  NuiTypography,
  useTheme,
} from "@next-design-labs/next-ui-core";
import type { StoryFn, StoryObj } from "@storybook/react";

/**
 * Extract the CSS variable from themeVars or return "N/A".
 */
const getCssVariable = (
  categoryVars: Record<string, unknown>,
  name: string,
): string => {
  const value = categoryVars[name];
  if (typeof value === "string") {
    const match = value.match(/--[\w-]+/);
    return match ? match[0] : "N/A";
  }
  return "N/A";
};

/**
 * Token Preview Component
 */
const TokenPreview = ({
  category,
  value,
}: { category: string; value: string }) => {
  if (category === "spacing") {
    return (
      <div
        className="w-full h-4 bg-slate-200 rounded"
        style={{ width: value }}
      />
    );
  }
  return null; // No preview for other categories
};

/**
 * Token Card Component
 */
const TokenCard = ({
  name,
  value,
  cssVariable,
  category,
}: {
  name: string;
  value: string;
  cssVariable: string;
  category: string;
}) => {
  return (
    <div className="relative flex flex-col justify-between w-full p-6 border border-slate-200 rounded-lg transition-shadow hover:shadow-md bg-white">
      {/* Token Name */}
      <NuiTypography
        variant="caption1"
        className="font-semibold text-slate-800"
      >
        {name}
      </NuiTypography>

      {/* Token Value Preview */}
      <div className="flex items-center justify-center my-4">
        <TokenPreview category={category} value={value} />
      </div>

      {/* Token Value and CSS Variable */}
      <div className="space-y-2 text-right">
        <NuiTypography variant="caption1" className="text-slate-600">
          {value}
        </NuiTypography>
        <NuiTypography variant="caption1" className="text-slate-500">
          {cssVariable}
        </NuiTypography>
      </div>
    </div>
  );
};

// Meta configuration for Storybook
const meta = {
  title: "Theme/Design Tokens",
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

// DesignTokens story
export const DesignTokens: StoryObj = {
  render: () => {
    const { theme } = useTheme();
    const { designTokens, cssVars } = theme;

    return (
      <div className="space-y-16 max-w-[1024px] mx-auto">
        {Object.entries(designTokens).map(([category, values]) => {
          const categoryVars = cssVars[category as keyof NuiThemeVars];
          if (!categoryVars || typeof values !== "object") return null;

          return (
            <section key={category}>
              {/* Section Title */}
              <div className="flex items-center mb-6">
                <NuiTypography
                  variant="title4"
                  className="text-slate-700 font-semibold"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </NuiTypography>
              </div>

              {/* Tokens Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(values as Record<string, string>).map(
                  ([name, value]) => {
                    const cssVariable = getCssVariable(
                      categoryVars as Record<string, unknown>,
                      name,
                    );

                    return (
                      <TokenCard
                        key={name}
                        name={name}
                        value={value}
                        cssVariable={cssVariable}
                        category={category}
                      />
                    );
                  },
                )}
              </div>
            </section>
          );
        })}
      </div>
    );
  },
};
