export const components = {
  Button: {
    defaultProps: {
      variant: "solid",
      color: "primary",
      size: "md",
      radius: "lg",
    },
  },
  Typography: {
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
  },
};
