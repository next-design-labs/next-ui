import { theme } from "@next-design-labs/next-ui-styles";
import { defineConfig } from "cva";
import { extendTailwindMerge } from "tailwind-merge";

export { type VariantProps } from "cva";

// Fetch an array of class names based on a given theme token
const getThemeClassNames = (token: string, classGroup: string) =>
  Object.keys(theme[token as keyof typeof theme]).map(
    (token) => `${classGroup}-${token}`
  );

// Extend the Tailwind CSS merge function to include theme class names
const twMerge = extendTailwindMerge<"text">({
  extend: {
    classGroups: {
      rounded: getThemeClassNames("radii", "rounded"),
      text: getThemeClassNames("typography", "text"),
    },
  },
});

export const { cva, cx, compose } = defineConfig({
  hooks: {
    onComplete: (className) => {
      return twMerge(className);
    },
  },
});
