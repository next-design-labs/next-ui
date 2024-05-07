import type { NuiLoaderColor } from "../Loader";

// Function to resolve the loader color based on the provided classes
export const resolveLoaderColor = (classes: string): NuiLoaderColor => {
  // Extract all class names that start with 'bg-' or 'border-'
  const classMatches: string[] =
    classes.match(/(?:bg|border)-[a-zA-Z0-9_-]+/g) || [];

  // Check if 'bg-transparent' is one of the class names
  const hasTransparentBg = classMatches.includes("bg-transparent");

  // Find the first class name that starts with 'border-' and ignore numbers after 'border-'
  const borderColor = classMatches.find((c) => c.match(/^border-[a-zA-Z_-]+$/));

  // Return border color if background is transparent and a border color is found; else, return default color
  return hasTransparentBg && borderColor
    ? (borderColor.replace("border-", "") as NuiLoaderColor)
    : "blue";
};
