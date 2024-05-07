export const inputRecipe = {
  base: [
    "inline-flex items-center gap-3 p-2 bg-background-surface",
    "border border-solid border-border hover:border-primary",
    "[&:focus-within]:(ring-4 ring-offset-0)",
  ],
  parts: {
    input: ["flex-1 focus:outline-none outline-0 bg-transparent"],
    startAdornment: ["flex items-center"],
    endAdornment: ["flex items-center"],
  },
  variants: {
    size: {
      sm: ["h-6 text-captionLabel"],
      md: ["h-8 text-label"],
      lg: ["h-11 text-label"],
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-xs",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
  },
  defaultProps: {
    size: "md",
    radius: "md",
  },
};
