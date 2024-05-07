export const selectRecipe = {
  parts: {
    root: [
      "w-full",
      "color-text",
      "border border-border",
      "bg-container",
      "hover:(bg-container color-text)",
      "active:bg-container",
    ],
    listbox: [
      "bg-container py-1.5 mt-[-1px]",
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
