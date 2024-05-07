import { tokens } from "./tokens";

const { fontSize, fontWeight, lineHeight } = tokens;

export const typography = {
  display: {
    fontWeight: fontWeight.semibold,
    fontSize: fontSize["4xl"],
    lineHeight: lineHeight["4xl"],
  },
  title1: {
    fontWeight: fontWeight.semibold,
    fontSize: fontSize["3xl"],
    lineHeight: lineHeight["3xl"],
  },
  title2: {
    fontWeight: fontWeight.semibold,
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["2xl"],
  },
  title3: {
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.xl,
    lineHeight: lineHeight.xl,
  },
  title4: {
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
  },
  body: {
    fontWeight: fontWeight.normal,
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
  },
  label: {
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
  },
  captionLabel: {
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },
  caption1: {
    fontWeight: fontWeight.normal,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },
  caption2: {
    fontWeight: fontWeight.normal,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  },
};
