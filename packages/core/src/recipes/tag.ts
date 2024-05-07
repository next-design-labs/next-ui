export const tagRecipe = {
  base: [
    "flex items-center justify-center whitespace-nowrap",
    "color-[var(--tokens-text)] bg-[var(--tokens-background)]",
    "border border-[var(--tokens-border)]",
  ],
  variants: {
    variant: {
      semantic: [],
      categorical: [],
    },
    size: {
      sm: ["h-6 min-w-6 px-3 text-captionLabel"],
      md: ["h-8 min-w-8 px-4 text-label"],
      lg: ["h-11 min-w-11 px-5 text-label"],
    },
    removable: {
      true: "pr-2", // Add padding for close button
      false: "",
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-xl",
      full: "rounded-full",
    },
  },
  defaultProps: {
    variant: "semantic",
    color: "success",
    size: "sm",
    removable: false,
    radius: "md",
  },
};
