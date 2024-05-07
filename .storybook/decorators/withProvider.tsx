import {
  NuiProvider,
  type NuiTheme,
  cx,
  themes,
} from "@next-design-labs/next-ui-core";
import { useChannel } from "@storybook/preview-api";
import type { StoryContext, StoryFn } from "@storybook/react";
import { useState } from "react";

import { ADDON_EVENT as MODE_EVENT } from "../addons/mode-selector/constants";
import { getLocalMode } from "../addons/mode-selector/utils";
import { ADDON_EVENT as THEME_EVENT } from "../addons/theme-selector/constants";
import { getLocalTheme } from "../addons/theme-selector/utils";

export default (Story: StoryFn, context: StoryContext) => {
  const { viewMode, parameters } = context;

  const isStoryMode = viewMode === "story";
  const isVerticalCentered = parameters?.verticalCentered ?? true;

  const [theme, setTheme] = useState(getLocalTheme());
  const [mode, setMode] = useState(getLocalMode());

  useChannel({
    [THEME_EVENT]: ({ name }) => setTheme(name),
    [MODE_EVENT]: (mode) => setMode(mode),
  });

  return (
    <div
      className={cx(
        "flex gap-3 w-full justify-center",
        isStoryMode && isVerticalCentered && "h-lvh items-center",
      )}
    >
      <NuiProvider
        themes={[...Object.values(themes)]}
        theme={theme}
        colorMode={mode as NuiTheme["colorMode"]}
      >
        <Story />
      </NuiProvider>
    </div>
  );
};
