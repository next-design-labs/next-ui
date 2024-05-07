import type * as CSS from "csstype";

interface CSSProperties extends CSS.Properties<string | number> {}

export type TypographyProps = Pick<
  CSSProperties,
  | "color"
  | "fontSize"
  | "letterSpacing"
  | "lineHeight"
  | "fontWeight"
  | "textDecoration"
>;

export type Typography = {
  typography: {
    display: TypographyProps;
    title1: TypographyProps;
    title2: TypographyProps;
    title3: TypographyProps;
    title4: TypographyProps;
    label: TypographyProps;
    body: TypographyProps;
    captionLabel: TypographyProps;
    caption1: TypographyProps;
    caption2: TypographyProps;
  };
};
