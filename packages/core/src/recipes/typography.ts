export const typographyRecipe = {
  variants: {
    variant: {
      display: "font-semibold text-4xl leading-4xl",
      title1: "font-semibold text-3xl leading-3xl",
      title2: "font-semibold text-2xl leading-2xl",
      title3: "font-semibold text-xl leading-xl",
      title4: "font-semibold text-lg leading-lg",
      body: "font-normal text-base leading-base",
      label: "font-semibold text-base leading-base",
      captionLabel: "font-semibold text-sm leading-sm",
      caption1: "font-normal text-sm leading-sm",
      caption2: "font-normal text-xs leading-xs",
    },
  },
  defaultProps: {
    variant: "body",
    variantMapping: {
      display: "h1",
      title1: "h1",
      title2: "h2",
      title3: "h3",
      title4: "h4",
      body: "p",
      label: "p",
      captionLabel: "p",
      caption1: "p",
      caption2: "p",
    },
  },
};
