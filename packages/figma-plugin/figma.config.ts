import type { FigmaConfig, PluginManifest } from "vite-figma-plugin/lib/types";
import { version } from "./package.json";

export const manifest: PluginManifest = {
  name: "Next UI Figma Plugin",
  id: "next-ui-figma-plugin",
  api: "1.0.0",
  main: "code.js",
  ui: "index.html",
  editorType: ["figma"],
};

export const config: FigmaConfig = {
  manifest,
  version,
};
