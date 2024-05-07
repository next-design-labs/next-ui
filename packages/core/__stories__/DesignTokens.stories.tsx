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

const meta = {
  title: "Theme/Design Tokens",
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

export const DesignTokens: StoryObj = {
  render: () => {
    const { theme } = useTheme();
    const { designTokens, cssVars } = theme;
    const cellClass = "pb-2";

    return (
      <div>
        {Object.entries(designTokens).map(([category, values]) => {
          const categoryVars = cssVars[category as keyof NuiThemeVars];
          if (!categoryVars || typeof values !== "object") return null;

          return (
            <section className="mb-10" key={category}>
              {/* Section title */}
              <NuiTypography
                variant="title4"
                className="border-b border-slate-300 pb-4 mb-4"
              >
                {category}
              </NuiTypography>

              {/* Tokens table */}
              <table>
                <tbody>
                  {Object.entries(values as Record<string, string>).map(
                    ([name, value]) => {
                      const cssVariable = getCssVariable(
                        categoryVars as Record<string, unknown>,
                        name,
                      );

                      return (
                        <tr key={name}>
                          {/* Token name */}
                          <td className={`${cellClass} w-25`}>
                            <NuiTypography variant="label">
                              {name}
                            </NuiTypography>
                          </td>
                          {/* Token value */}
                          <td className={`${cellClass} w-25`}>
                            <NuiTypography variant="caption1">
                              {value}
                            </NuiTypography>
                          </td>
                          {/* CSS variable */}
                          <td className={`${cellClass} w-50`}>
                            <NuiTypography variant="caption1">
                              {cssVariable}
                            </NuiTypography>
                          </td>
                        </tr>
                      );
                    },
                  )}
                </tbody>
              </table>
            </section>
          );
        })}
      </div>
    );
  },
};
