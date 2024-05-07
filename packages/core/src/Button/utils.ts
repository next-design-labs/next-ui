import type { HvLoaderColor } from "../Loader";

export const resolveLoaderColor = (classes: string): HvLoaderColor => {
  const classMatches: string[] =
    classes.match(/(?:bg|border)-[a-zA-Z0-9_-]+/g) || [];
  const hasTransparentBg = classMatches.includes("bg-transparent");
  const borderColor = classMatches.find((c) => c.startsWith("border-"));

  // Return border color if background is transparent and a border color is found; else, return default color
  return hasTransparentBg && borderColor
    ? (borderColor.replace("border-", "") as HvLoaderColor)
    : "atmo1";
};
