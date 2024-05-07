import type { Preview } from "@storybook/react";
import "@unocss/reset/tailwind-compat.css";
import "uno.css";

import withProvider from "./decorators/withProvider";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    docs: {
      source: { type: "dynamic" },
    },
    options: {
      storySort: {
        order: [
          "Theme",
          ["Playground", "Colors", "Color Tokens", "Design Tokens"],
          "Components",
        ],
      },
    },
  },
  decorators: [withProvider],
};

export default preview;
