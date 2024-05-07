import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../packages/**/src/**/*.stories.@(ts|tsx)"],
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
  },
  staticDirs: ["./assets"],
  async viteFinal(config) {
    const unoCSS = await import("unocss/vite");

    return mergeConfig(config, {
      plugins: [unoCSS.default()],
    });
  },
};

export default config;
