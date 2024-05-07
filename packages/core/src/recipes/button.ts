export const buttonRecipe = {
  base: [
    "flex items-center justify-center whitespace-nowrap",
    "color-[var(--tokens-text)] bg-[var(--tokens-background)]",
    "border border-[var(--tokens-border)]",
    "active:bg-[var(--tokens-active)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "hover:(bg-[var(--tokens-hover)] color-[var(--tokens-hoverText)])",
    "aria-pressed:(text-[var(--tokens-selectedText)] border-[var(--tokens-selected)] bg-[var(--tokens-selected)])",
    "aria-pressed:hover:(bg-[var(--tokens-selectedHover)] text-[var(--tokens-selectedText)])",
    "focus-visible:(outline-none ring-4 ring-offset-0) focus:z-1 transition-all",
    "data-[icon=true]:p-1",
  ],
  variants: {
    variant: {
      solid: [],
      outline: [],
      ghost: [],
      link: ["hover:underline hover:underline-offset-4"],
    },
    size: {
      sm: ["h-6 min-w-6 px-3 text-captionLabel"],
      md: ["h-8 min-w-8 px-4 text-label"],
      lg: ["h-11 min-w-11 px-5 text-label"],
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
