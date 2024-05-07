import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

const pkg = require(resolve(process.cwd(), "package.json"));

// dependencies that should not be bundled.
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
].map((ext) => new RegExp(`^${ext.split("/")[0]}`));

export default defineConfig({
  plugins: [
    dts({
      outDir: "dist/types",
      rollupTypes: true,
      tsconfigPath: resolve(__dirname, "../tsconfig.build.json"),
    }),
    react(),
    tsconfigPaths(),
    UnoCSS({
      configFile: resolve(__dirname, "../uno.config.ts"),
    }),
  ],
  build: {
    target: "ESNext",
    minify: false,
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      name: pkg.name,
      entry: resolve(process.cwd(), "src/index.ts"),
    },
    rollupOptions: {
      output: [
        {
          format: "esm",
          preserveModules: true,
          dir: "dist/esm",
          // keep react-based packages as `.js` for backwards compatibility
          entryFileNames: pkg.name.includes("react")
            ? "[name].js"
            : "[name].mjs",
          exports: "named",
          interop: "auto",
        },
        {
          format: "cjs",
          preserveModules: true,
          dir: "dist/cjs",
          entryFileNames: "[name].cjs",
          exports: "named",
          interop: "auto",
        },
      ],
      external,
    },
  },
});
