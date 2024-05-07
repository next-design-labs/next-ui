import { NuiThemeProvider, cx } from "@next-design-labs/next-ui-core";
import { themes } from "@next-design-labs/next-ui-styles";
import { useChannel } from "@storybook/preview-api";
import React, { useState } from "react";

import { ADDON_EVENT as MODE_EVENT } from "../addons/mode-selector/constants";
import { getLocalMode } from "../addons/mode-selector/utils";
import { ADDON_EVENT as THEME_EVENT } from "../addons/theme-selector/constants";
import { getLocalTheme } from "../addons/theme-selector/utils";

export default (Story, context) => {
  const { viewMode, parameters } = context;

  const isStoryMode = viewMode === "story";
  const isCentered = parameters?.centerStory ?? true;

  const [theme, setTheme] = useState(getLocalTheme());
  const [mode, setMode] = useState(getLocalMode());

  useChannel({
    [THEME_EVENT]: ({ name }) => setTheme(name),
    [MODE_EVENT]: (mode) => setMode(mode),
  });

  return (
    <div
      className={cx(
        isStoryMode &&
          isCentered &&
          "flex h-lvh w-full items-center justify-center",
      )}
    >
      <NuiThemeProvider
        themes={[...Object.values(themes)]}
        activeTheme={theme}
        activeMode={mode}
      >
        <Story />
      </NuiThemeProvider>
    </div>
  );
};
