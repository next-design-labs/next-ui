import { createRequire } from "node:module";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const require = createRequire(import.meta.url);

// Read the package.json file from the current working directory.
const pkg = require(`${process.cwd()}/package.json`);

// Dependencies should be treated as external and not included in the bundle.
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
  ],
  build: {
    target: "ESNext",
    minify: false,
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      name: pkg.name,
      entry: `${process.cwd()}/src/index.ts`,
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
