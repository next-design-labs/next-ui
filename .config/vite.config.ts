import { createRequire } from "node:module";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const require = createRequire(import.meta.url);

// Read the package.json file from the current working directory.
const pkg = require(`${process.cwd()}/package.json`);

// Dependencies should be treated as external and not included in the bundle.
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
].map((ext) => new RegExp(`^${ext.split("/")[0]}`));

export default defineConfig({
  build: {
    target: "ES2022",
    minify: false,
    emptyOutDir: true,
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
          entryFileNames: "[name].mjs",
          exports: "named",
          interop: "auto",
          sourcemap: "hidden",
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
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: resolve(__dirname, "vitest.setup.ts"),
    include: ["**/*.test.{ts,tsx}"],
  },
});
