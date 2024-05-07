import { definePreset, mergeConfigs } from "@unocss/core";
import {
  type PresetUnoOptions,
  type Theme,
  presetUno,
} from "@unocss/preset-uno";

import { rules } from "./rules";
import { extendTheme } from "./theme";

// Define the custom preset for Next UI
export const presetNextUI = definePreset<PresetUnoOptions, Theme>((options) => {
  return {
    name: "@next-design-labs/next-ui-uno-preset",
    // Merge base UnoCSS configuration with Next UI customizations
    ...mergeConfigs([
      presetUno(options),
      {
        // Extend the default theme with Next UI-specific theme settings
        extendTheme,
        // Include custom rules for Next UI styles
        rules,
        // Global styles and keyframe animations
        preflights: [
          {
            getCSS: () => `
              * {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
              
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
      },
    ]),
  };
});
