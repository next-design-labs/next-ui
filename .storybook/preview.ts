import type { Preview } from "@storybook/react";
import "uno.css";

import withProvider from "./decorators/withProvider";

const preview: Preview = {
  parameters: {
    docs: {
      source: { type: "dynamic" },
    },
  },
  decorators: [withProvider],
};

export default preview;
