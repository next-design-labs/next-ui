import { NuiTypography } from "@next-design-labs/next-ui-core";
import { themeVars } from "@next-design-labs/next-ui-styles";
import type { StoryFn, StoryObj } from "@storybook/react";
import React from "react";

import { filterTokens, groupTokens } from "./utils";

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

export const Tokens: StoryObj = {
  render: () => {
    const rootLevelTokens = filterTokens(themeVars);
    const tokenGroups = groupTokens(rootLevelTokens);

    return (
      <div className="space-y-10 max-w-[1024px]">
        {Object.entries(tokenGroups).map(([prefix, tokens]) => (
          <div key={prefix} className="border-t border-slate-300 pt-4">
            <NuiTypography variant="title4" className="mb-4">
              {prefix}
            </NuiTypography>
            <div className="flex flex-wrap gap-4">
              {tokens.map(({ name, value }) => (
                <div key={name} className="flex items-center gap-4 w-70 mb-4">
                  <div
                    className="w-20 h-18 border border-slate-300 rounded-round"
                    style={{ backgroundColor: value }}
                  />
                  <div className="flex-1">
                    <NuiTypography variant="captionLabel">{name}</NuiTypography>
                    <NuiTypography
                      variant="caption1"
                      className="text-slate-500 "
                    >
                      {value}
                    </NuiTypography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
