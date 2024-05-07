import { readFileSync } from "node:fs";
import nextra from "nextra";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: true,
  mdxOptions: {
    rehypePrettyCodeOptions: {
      theme: JSON.parse(readFileSync("./public/syntax/theme.json", "utf8")),
    },
  },
});

export default withNextra({
  output: "export",
  distDir: "dist",
  images: { unoptimized: true },
  reactStrictMode: true,
  basePath: process.env.BASE_PATH || "",
});
