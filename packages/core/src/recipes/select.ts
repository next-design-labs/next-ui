export const selectRecipe = {
  parts: {
    root: [
      "w-full",
      "color-text",
      "border border-border",
      "bg-background-surface",
      "hover:(bg-background-surface color-text)",
      "active:bg-background-surface",
    ],
    listbox: [
      "bg-background-surface py-1.5 mt-[-1px]",
      "border-(1 border)",
      "[&>li]:mx-1.5 [&>li]:text-ellipsis",
    ],
    popup: ["w-full"],
  },
  partsProps: {
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
