import { ds, pentaho, shadcn } from "@next-design-labs/next-ui-styles";
import {
  IconButton,
  TooltipLinkList,
  WithTooltip,
} from "@storybook/components";
import { addons } from "@storybook/manager-api";
import React, { useState } from "react";

import { ADDON_EVENT, ADDON_ID } from "./constants";
import {
  type Theme,
  getInitialTheme,
  getThemesList,
  setLocalTheme,
} from "./utils";

const ThemeSelector = () => {
  const themesList = getThemesList([ds, shadcn, pentaho]);
  const initialTheme = getInitialTheme(themesList);
  const [selectedTheme, setSelectedTheme] = useState(initialTheme);

  const switchTheme = (theme: Theme) => {
    setLocalTheme(theme.name);
    setSelectedTheme(theme);

    addons.getChannel().emit(ADDON_EVENT, theme);
  };

  const links = themesList.map((theme) => ({
    id: theme.name,
    title: theme.label,
    active: theme.label === selectedTheme?.label,
    onClick: () => switchTheme(theme),
  }));

  return (
    <>
      <WithTooltip
        placement="top"
        trigger="click"
        tooltip={<TooltipLinkList links={links} />}
      >
        <IconButton
          key={ADDON_ID}
          active={false}
          title="Select theme"
          style={{ display: "flex", width: 110, justifyContent: "flex-start" }}
        >
          Theme: {selectedTheme?.label}
        </IconButton>
      </WithTooltip>
    </>
  );
};

export default ThemeSelector;
