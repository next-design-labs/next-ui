export const switchRecipe = {
  base: [
    "peer inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
  ],
  parts: {
    thumb: [
      "pointer-events-none block size-5 rounded-full bg-white ring-0 transition-transform duration-300",
      "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
      "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-1",
    ],
  },
  variants: {
    size: {
      sm: {
        base: ["h-4 w-7"],
        parts: {
          thumb: ["h-3 w-3 data-[state=checked]:translate-x-3"],
        },
      },
      md: {
        base: ["h-6 w-9"],
        parts: {
          thumb: ["h-4 w-4 data-[state=checked]:translate-x-4"],
        },
      },
      lg: {
        base: ["h-6 w-11"],
        parts: {
          thumb: ["h-5 w-5 data-[state=checked]:translate-x-5"],
        },
      },
    },
    color: {
      primary: [
        "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      ],
      secondary: [
        "data-[state=checked]:bg-secondary data-[state=unchecked]:bg-primary",
      ],
    },
    radius: {
      none: ["rounded-none"],
      sm: ["rounded-sm"],
      md: ["rounded-md"],
      lg: ["rounded-lg"],
      full: ["rounded-full"],
    },
  },
  defaultProps: {
    size: "md",
    color: "primary",
    radius: "full",
  },
};
