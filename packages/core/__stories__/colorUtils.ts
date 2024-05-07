// Utility to convert hex to RGB
export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const normalizedHex = hex.replace(/^#/, "");
    const [r, g, b] = normalizedHex
      .match(/.{1,2}/g)
      ?.map((x) => Number.parseInt(x, 16)) ?? [0, 0, 0];
    return { r, g, b };
  };

  // Utility to calculate relative luminance (WCAG-compliant)
export const relativeLuminance = (hex: string): number => {
    const [r, g, b] = hex
      .replace(/^#/, "")
      .match(/.{1,2}/g)
      ?.map((x) => Number.parseInt(x, 16) / 255) ?? [0, 0, 0];
    const normalize = (c: number) =>
      c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    return 0.2126 * normalize(r) + 0.7152 * normalize(g) + 0.0722 * normalize(b);
  };
  
  // Utility to calculate contrast ratio (WCAG-compliant)
  export const contrastRatio = (color1: string, color2: string): number => {
    const luminance1 = relativeLuminance(color1);
    const luminance2 = relativeLuminance(color2);
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    return (lighter + 0.05) / (darker + 0.05);
  };
  
  // Utility to determine accessible text color (black or white)
  export const getAccessibleTextColor = (bgColor: string): string => {
    return contrastRatio(bgColor, "#FFFFFF") > contrastRatio(bgColor, "#000000")
      ? "#FFFFFF"
      : "#000000";
  };
  
  // Utility to get contrast rating (AAA, AA, Fail) based on WCAG
  export const getContrastRating = (contrast: number): string => {
    if (contrast >= 7) return "AAA";
    if (contrast >= 4.5) return "AA";
    return "Fail";
  };