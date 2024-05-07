export const selectRecipe = {
  parts: {
    root: [
      "w-full",
      "color-text",
      "border border-border",
      "bg-backgroundSurface",
      "hover:(bg-backgroundSurface color-text)",
      "active:bg-backgroundSurface",
    ],
    listbox: [
      "bg-backgroundSurface py-1.5 mt-[-1px]",
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
