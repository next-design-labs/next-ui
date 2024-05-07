export const inputRecipe = {
  slots: {
    root: [
      "inline-flex items-center gap-3 p-2 bg-[var(--nui-colors-container)]",
      "border border-solid border-[var(--nui-colors-border)] hover:border-[var(--nui-colors-primary)]",
      "[&:focus-within]:(ring-4 ring-offset-0)",
    ],
    input: ["focus:outline-none outline-0 bg-transparent"],
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
