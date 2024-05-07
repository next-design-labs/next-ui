import { ThemeProvider, cx } from "@next-design-labs/next-ui-core";
import { ds, pentaho, shadcn } from "@next-design-labs/next-ui-styles";
import { useChannel } from "@storybook/preview-api";
import React, { useState } from "react";

import { ADDON_EVENT as MODE_EVENT } from "../addons/mode-selector/constants";
import { getLocalMode } from "../addons/mode-selector/utils";
import { ADDON_EVENT as THEME_EVENT } from "../addons/theme-selector/constants";
import { getLocalTheme } from "../addons/theme-selector/utils";

export default (Story, context) => {
  const isStoryMode = context.viewMode === "story";

  const [selectedTheme, setSelectedTheme] = useState(getLocalTheme());
  const [selectedMode, setSelectedMode] = useState(getLocalMode());

  useChannel({
    [THEME_EVENT]: ({ name }) => setSelectedTheme(name),
    [MODE_EVENT]: (mode) => setSelectedMode(mode),
  });

  return (
    <div
      className={cx(
        isStoryMode && "flex h-dvh w-full items-center justify-center",
      )}
    >
      <ThemeProvider
        themes={[ds, pentaho, shadcn]}
        theme={selectedTheme}
        mode={selectedMode}
      >
        <Story />
      </ThemeProvider>
    </div>
  );
};
