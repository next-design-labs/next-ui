import { addons, types } from "@storybook/manager-api";

import ModeSelector from "./ModeSelector";
import { ADDON_ID, ADDON_TITLE } from "./constants";

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    title: ADDON_TITLE,
    type: types.TOOL,
    match: ({ viewMode }) => !!viewMode?.match(/^(story|docs)$/),
    render: () => <ModeSelector />,
  });
});
