export const fontFamily = {
  body: "'Open Sans', Arial, Helvetica, sans-serif",
};

export const fontSize = {
  xs: "10px",
  sm: "12px",
  base: "14px",
  lg: "16px",
  xl: "20px",
  xl2: "24px",
  xl3: "32px",
  xl4: "42px",
};

export type HvFontSize = keyof typeof fontSize;

export const fontWeight = {
  hairline: "100",
  thin: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
};

export type HvFontWeigth = keyof typeof fontWeight;

export const lineHeight = {
  none: "21px",
  xs: "16px",
  sm: "18px",
  base: "21px",
  lg: "24px",
  xl: "30px",
  xl2: "36px",
  xl3: "48px",
  xl4: "63px",
};

export type HvLineHeight = keyof typeof lineHeight;
