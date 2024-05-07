import {
  NuiTypography,
  baseTheme,
  themeVars,
} from "@next-design-labs/next-ui-core";
import type { StoryFn, StoryObj } from "@storybook/react";

type ThemeVars = typeof themeVars;
type TokenCategory = keyof ThemeVars;
type TokenKey<Category extends TokenCategory> = keyof ThemeVars[Category];

/**
 * Extract the CSS variable from themeVars or return "N/A".
 */
const getCssVariable = <Category extends TokenCategory>(
  categoryVars: ThemeVars[Category],
  name: TokenKey<Category>,
): string => {
  const value = categoryVars?.[name];
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

export const Tokens: StoryObj = {
  render: () => {
    const { tokens } = baseTheme;
    const cellClass = "pb-2";

    return (
      <div>
        {Object.entries(tokens).map(([category, values]) => {
          // Ensure category exists in themeVars
          if (!(category in themeVars)) return null;

          const categoryVars = themeVars[category as TokenCategory];

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
                  {Object.entries(values).map(([name, value]) => {
                    const cssVariable = getCssVariable(
                      categoryVars,
                      name as TokenKey<TokenCategory>,
                    );

                    return (
                      <tr key={name}>
                        {/* Token name */}
                        <td className={`${cellClass} w-25`}>
                          <NuiTypography variant="label">{name}</NuiTypography>
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
                  })}
                </tbody>
              </table>
            </section>
          );
        })}
      </div>
    );
  },
};
