import { resolve } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const unoConfig = resolve(__dirname, "../.config/uno.config.ts");

const config: StorybookConfig = {
  stories: ["../packages/**/__stories__/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-controls",
    `${__dirname}/addons/theme-selector`,
    `${__dirname}/addons/mode-selector`,
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
  },
  staticDirs: ["./assets"],
  async viteFinal(config) {
    const unoCSS = await import("unocss/vite");

    return mergeConfig(config, {
      plugins: [
        unoCSS.default({
          configFile: unoConfig,
        }),
      ],
    });
  },
};

export default config;
