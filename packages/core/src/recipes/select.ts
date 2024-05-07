export const selectRecipe = {
  slots: {
    root: [
      "w-full",
      "color-[var(--nui-colors-text)]",
      "border border-[var(--nui-colors-border)]",
      "bg-[var(--nui-colors-container)]",
      "hover:(bg-[var(--nui-colors-container)] color-[var(--nui-colors-text)])",
      "active:bg-[var(--nui-colors-container)]",
    ],
    listbox: [
      "bg-[var(--nui-colors-container)] py-1.5 mt-[-1px]",
      "border-(1 [var(--nui-colors-border)])",
      "[&>li]:mx-1.5 [&>li]:text-ellipsis",
    ],
    popup: ["w-full"],
  },
  slotProps: {
    popup: {
      disablePortal: true,
    },
  },
  defaultProps: {
    variant: "outline",
    size: "md",
    radius: "md",
  },
};
