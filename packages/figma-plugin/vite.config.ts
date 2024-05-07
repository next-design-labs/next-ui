import path from "node:path";
import { type PluginOption, defineConfig } from "vite";
import { figmaPlugin, figmaPluginInit, runAction } from "vite-figma-plugin";
import { viteSingleFile } from "vite-plugin-singlefile";

import react from "@vitejs/plugin-react";

import { config } from "./figma.config";

const action = process.env.ACTION;
const mode = process.env.MODE;

if (action)
  runAction(
    {},
    // config,
    action,
  );

figmaPluginInit();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react() as PluginOption,
    viteSingleFile(),
    figmaPlugin(config, mode) as PluginOption,
  ],
  build: {
    assetsInlineLimit: Number.POSITIVE_INFINITY,
    emptyOutDir: false,
    outDir: ".tmp",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
