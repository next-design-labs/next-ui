import type { DocsThemeConfig } from "nextra-theme-docs";
import { ThemeSwitch } from "nextra-theme-docs";

import { Logo } from "@components/logo";

const config: DocsThemeConfig = {
  project: {
    link: "https://github.com/next-design-labs/next-ui",
  },
  banner: {
    content: () => <a href="/">🎉 NEXT UI 1.0 is coming. Read more →</a>,
  },
  head: () => {
    return (
      <>
        <title>NEXT UI</title>
        <link rel="icon" href="/img/favicon.png" type="image/png" />
      </>
    );
  },
  logo: () => {
    return <Logo height={40} className="logo" />;
  },
  navbar: {
    extraContent: () => {
      return <ThemeSwitch lite className="button-switch theme-switch" />;
    },
  },
  footer: {
    component: null,
  },
};

export default config;
