export const avatarRecipe = {
  base: [
    "inline-flex items-center justify-center",
    "bg-[var(--background)] text-[var(--text)]",
    "border border-[var(--border)]",
    "overflow-hidden select-none",
    "relative",
  ],
  variants: {
    variant: {
      solid: [],
      outline: [],
    },
    size: {
      xs: ["h-6 w-6 text-xs"],
      sm: ["h-8 w-8 text-sm"],
      md: ["h-10 w-10 text-base"],
      lg: ["h-12 w-12 text-lg"],
      xl: ["h-14 w-14 text-xl"],
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
    variant: "solid",
    color: "primary",
    size: "md",
    radius: "full",
  },
};
