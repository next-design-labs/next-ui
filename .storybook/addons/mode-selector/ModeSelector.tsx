import { IconButton } from "@storybook/components";
import { MoonIcon, SunIcon } from "@storybook/icons";
import { addons, useAddonState, useStorybookApi } from "@storybook/manager-api";

import { themes } from "../../theme";
import { ADDON_EVENT, ADDON_ID } from "./constants";
import { type Mode, getInitialMode, setLocalMode } from "./utils";

const ModeSelector = () => {
  const api = useStorybookApi();

  const initialMode: Mode = getInitialMode();

  const [selectedMode, setSelectedMode] = useAddonState<Mode>(
    "mode-selector",
    initialMode,
  );

  const switchMode = () => {
    const mode: Mode = selectedMode === "light" ? "dark" : "light";

    setLocalMode(mode);
    setSelectedMode(mode);

    api.setOptions({ theme: themes[mode] });
    addons.getChannel().emit(ADDON_EVENT, mode);
  };

  return (
    <IconButton
      key={ADDON_ID}
      title={
        selectedMode === "light"
          ? "Switch to dark mode"
          : "Switch to light mode"
      }
      onClick={switchMode}
    >
      {selectedMode === "light" ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
};

export default ModeSelector;
