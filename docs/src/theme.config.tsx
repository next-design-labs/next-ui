import { Logo } from "@/components/Logo";
import { type DocsThemeConfig, ThemeSwitch, useTheme } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  project: {
    link: "https://github.com/next-design-labs/next-ui",
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
    const { theme } = useTheme();
    const color = theme === "dark" ? "white" : "black";
    return <Logo color={color} />;
  },
  navbar: {
    extraContent: () => {
      return <ThemeSwitch lite />;
    },
  },
  search: {
    placeholder: "Search...",
  },
  footer: {
    component: null,
  },
  sidebar: {
    toggleButton: false,
  },
  color: {
    hue: 215,
  },
  feedback: {
    content: null,
  },
  editLink: {
    component: null,
  },
  gitTimestamp: () => null,
};

export default config;
