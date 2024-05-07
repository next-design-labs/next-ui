import "@unocss/reset/tailwind-compat.css";
import "uno.css";

import DocsContainer from "./blocks/DocsContainer";
import DocsPage from "./blocks/DocsPage";
import withProvider from "./decorators/withProvider";
import withEnhancedArgTypes from "./decorators/withEnhancedArgTypes";

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: {
      argTypesRegex: "^on[A-Z].*",
    },
    docs: {
      source: { type: "dynamic" },
      container: DocsContainer,
      page: DocsPage,
      controls: {
        sort: "alpha",
      },
    },
  },
  argTypesEnhancers: [withEnhancedArgTypes],
  decorators: [withProvider],
};

export default preview;
