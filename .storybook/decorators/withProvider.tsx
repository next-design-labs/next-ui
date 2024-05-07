import { HvProvider, cx } from "@next-design-labs/next-ui-core";
import { Global } from "@storybook/theming";
import React from "react";

import { getStoryStyles } from "../theme/storyStyles";

export default (Story, context) => {
  const storyStyles = getStoryStyles("#F4F5F5");
  const isStoryMode = context.viewMode === "story";

  return (
    <div
      className={cx(
        isStoryMode && "flex h-dvh w-full items-center justify-center"
      )}
    >
      <Global styles={storyStyles} />
      <HvProvider>
        <Story />
      </HvProvider>
    </div>
  );
};
