import { defineConfig } from "cva";
import { extendTailwindMerge } from "tailwind-merge";

export { type VariantProps } from "cva";

// Extend the Tailwind CSS merge function to include theme class names
const twMerge = extendTailwindMerge<"text">({
  extend: {},
});

export const { cva, cx, compose } = defineConfig({
  hooks: {
    onComplete: (className) => {
      return twMerge(className);
    },
  },
});
