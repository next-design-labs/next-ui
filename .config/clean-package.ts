module.exports = {
  remove: ["clean-package", "main"],
  replace: {
    sideEffects: false,
    exports: {
      ".": {
        require: "./dist/cjs/index.cjs",
        import: "./dist/esm/index.js",
      },
    },
    main: "dist/cjs/index.cjs",
    module: "dist/esm/index.js",
    types: "dist/types/index.d.ts",
    files: ["dist"],
  },
};
