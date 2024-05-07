import { definePreset, mergeConfigs } from "@unocss/core";

import {
  type PresetUnoOptions,
  type Theme,
  presetUno,
} from "@unocss/preset-uno";

export interface UnoOptions extends PresetUnoOptions {}

export const presetNextUI = definePreset<UnoOptions, Theme>((options) => {
  return {
    name: "@next-design-labs/next-ui-uno-preset",
    ...mergeConfigs([
      // base uno config
      presetUno(options),
    ]),
  };
});
