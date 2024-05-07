import { NuiProvider, pentahoTheme } from "@next-design-labs/next-ui-core";
import { render } from "@testing-library/react";
import type { ReactNode } from "react";

const customRender = (ui: ReactNode, options = {}) => {
  return render(ui, {
    wrapper: ({ children }: { children: ReactNode }) => (
      <NuiProvider themes={[pentahoTheme]}>{children}</NuiProvider>
    ),
    ...options,
  });
};

export * from "@testing-library/react";

export { customRender as render };
