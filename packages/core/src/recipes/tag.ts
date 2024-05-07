export const tagRecipe = {
  base: [
    "flex items-center justify-center whitespace-nowrap",
    "color-[var(--text)] bg-[var(--background)]",
    "border border-[var(--border)]",
    "hover:(bg-[var(--hover)] color-[var(--hoverText)])",
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
    color: "blue",
    size: "sm",
    removable: false,
    radius: "md",
  },
};
