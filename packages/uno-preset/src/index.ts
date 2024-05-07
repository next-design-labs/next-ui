import { type UserConfig, definePreset, mergeConfigs } from "@unocss/core";
import { presetRemToPx } from "@unocss/preset-rem-to-px";
import {
  type PresetUnoOptions,
  type Theme,
  presetUno,
} from "@unocss/preset-uno";
import { presetTheme } from "unocss-preset-theme";

import { rules } from "./rules";
import { extendTheme, themeModes } from "./theme";

export { rules, extendTheme, themeModes };

export interface HvUnoOptions extends PresetUnoOptions {}

export const presetNextUI = definePreset<HvUnoOptions, Theme>((options) => {
  /** base theme configuration */
  const hvConfig: UserConfig<Theme> = {
    extendTheme,
    rules,
    preflights: [
      // Injecting global CSS
      {
        getCSS: () => `
          @keyframes scaleAnimation {
            0%, 100% {
              transform: scaleY(.5);
            }
            50% {
              transform: scaleY(2);
            }
          }
        `,
      },
    ],
  };

  return {
    name: "@next-design-labs/next-ui-uno-preset",
    ...mergeConfigs([
      // base uno config
      presetUno(options),
      // allows theme variants (light/dark) via CSS vars - aligned with NEXT UI's
      presetTheme<Theme>({ prefix: "--hv", theme: themeModes }),
      // convert rem to px & make 1 unit 8px (32px = 1rem => 1/4rem = 8px)
      presetRemToPx({ baseFontSize: 32 }),
      hvConfig,
    ]),
  };
});
