import { DocsContainer } from "@storybook/addon-docs";
import { Global } from "@storybook/theming";
import React from "react";

import { getDocsStyles } from "../theme/docsStyles";

export default ({ context, children }) => {
  const docsStyles = getDocsStyles();

  return (
    <>
      <DocsContainer context={context}>
        <Global styles={docsStyles} />
        {children}
      </DocsContainer>
    </>
  );
};
