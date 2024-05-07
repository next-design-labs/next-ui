import {
  type NuiTypography,
  themeVars,
} from "@next-design-labs/next-ui-styles";
import type { CSSObject, Rule } from "@unocss/core";
import type { Theme } from "@unocss/preset-uno";

import { toKebabCase } from "./utils";

// Convert typography definitions into UnoCSS rules
const typographyToRules = (typography: NuiTypography) => {
  return Object.entries(typography).reduce((acc, entry) => {
    const [variant, { ...styles }] = entry;

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
  ...typographyToRules(themeVars.typography),
];
