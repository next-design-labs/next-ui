import type { themeVars } from "@next-design-labs/next-ui-styles";

// Utility to convert camelCase or PascalCase to kebab-case (e.g., fontSize -> font-size)
export const toKebabCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

// Stringify object values
export const stringifyValues = (obj: Record<string, string | number>) =>
  Object.fromEntries(Object.entries(obj ?? {}).map(([k, v]) => [k, `${v}`]));

// Extracts the color tokens from the theme variables object
export const extractColorTokens = (vars: typeof themeVars) => {
  const colorTokens: Record<string, string | number> = {};

  for (const [key, value] of Object.entries(vars)) {
    if (typeof value === "string" || typeof value === "number") {
      colorTokens[key] = value;
    }
  }

  return colorTokens;
};

export function generateColorSafelist(vars: typeof themeVars) {
  const safelist = [];
  const colors = vars.colors;
  const opacityValues = [0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; // List of opacity percentages (0-100)

  const opacityClasses = opacityValues.map((opacity) => `/${opacity}`);

  // Iterate over each color and its shades
  for (const [color, shades] of Object.entries(colors)) {
    for (const shade in shades) {
      safelist.push(...[`bg-${color}-${shade}`, `hover:bg-${color}-${shade}`]);

      safelist.push(
        ...opacityClasses.flatMap((opacity) => [
          `bg-${color}-${shade}/${opacity}`,
          `hover:bg-${color}-${shade}/${opacity}`,
        ]),
      );
    }
  }

  return safelist;
}
