import type { Preview } from "@storybook/react";
import "@unocss/reset/tailwind-compat.css";
import "uno.css";

import withProvider from "./decorators/withProvider";

const preview: Preview = {
  parameters: {
    docs: {
      source: { type: "dynamic" },
    },
    options: {
      storySort: {
        order: ["Theme", "Components"],
      },
    },
  },
  decorators: [withProvider],
};

export default preview;
