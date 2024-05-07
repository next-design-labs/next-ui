import type * as CSS from "csstype";

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

type CSSProperties = CSS.Properties<string | number>;

type TypographyProps = Pick<
  CSSProperties,
  | "color"
  | "fontSize"
  | "letterSpacing"
  | "lineHeight"
  | "fontWeight"
  | "textDecoration"
>;

export type Typography = {
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
