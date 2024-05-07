import { theme } from "@next-design-labs/next-ui-styles";
import type { CSSObject, Rule } from "@unocss/core";
import type { Theme } from "@unocss/preset-uno";

const toKebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();

const typographyToRules = (
  typography: Record<string, Record<string, unknown>>
) => {
  return Object.entries(typography).reduce((acc, entry) => {
    const [variant, { color, ...styles }] = entry;

    const style = Object.entries(styles).reduce((acc, entry) => {
      const [property, value] = entry;

      acc[toKebabCase(property)] = value as string;

      return acc;
    }, {} as CSSObject);

    acc.push([`text-${variant}`, style]);

    return acc;
  }, [] as Rule<Theme>[]);
};

export const rules: Rule<Theme>[] = [
  ["bg-default", { "background-color": theme.colors.background }],
  ...typographyToRules(theme.typography),
];
