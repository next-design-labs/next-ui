import { NuiTypography } from "@next-design-labs/next-ui-core";
import { theme } from "@next-design-labs/next-ui-styles";
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

export const Tokens: StoryObj = {
  render: () => {
    const renderTokens = (obj: Record<string, unknown>, prefix = "") => {
      return Object.entries(obj).map(([key, value]) => {
        const name = prefix ? `${prefix}.${key}` : key;

        if (typeof value === "object" && !Array.isArray(value)) {
          return (
            <div key={name} className="border-t border-slate-300 pt-4">
              <NuiTypography variant="title4" className="mb-4">
                {key}
              </NuiTypography>
              <div className="flex flex-wrap gap-4">
                {renderTokens(value as Record<string, unknown>, name)}
              </div>
            </div>
          );
        }

        return (
          <div key={name} className="flex items-center gap-4 w-70 mb-4">
            <div
              className="w-20 h-18 border border-slate-300 rounded-round"
              style={{ backgroundColor: value as string }}
            />
            <div className="flex-1">
              <NuiTypography variant="captionLabel">{key}</NuiTypography>
              <NuiTypography variant="caption1" className="text-slate-500">
                {value as string}
              </NuiTypography>
            </div>
          </div>
        );
      });
    };

    return (
      <div className="space-y-10 max-w-[1024px]">
        {renderTokens(theme.vars)}
      </div>
    );
  },
};
