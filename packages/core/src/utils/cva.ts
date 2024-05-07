import { type NuiTheme, themeVars } from "@next-design-labs/next-ui-styles";
import { defineConfig } from "cva";
import { extendTailwindMerge } from "tailwind-merge";

export { type VariantProps } from "cva";

// Fetch an array of class names based on a given theme token
const getThemeClassNames = (
  themePart: NuiTheme[keyof NuiTheme],
  classGroup: string,
): string[] => {
  if (!themePart) return [];
  return Object.keys(themePart).map((itemKey) => `${classGroup}-${itemKey}`);
};

// Extend the Tailwind CSS merge function to include theme class names
const twMerge = extendTailwindMerge<"text">({
  extend: {
    classGroups: {
      rounded: getThemeClassNames(themeVars.tokens.radii, "rounded"),
      text: getThemeClassNames(themeVars.typography, "text"),
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
