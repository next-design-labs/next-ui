import type { DeepPartial } from "./types";
/**
 * Maps a theme object to CSS variables.
 */
export const mapCSSVars = <T extends object>(obj: T, prefix = "--nextui") =>
  Object.entries(obj).reduce(
    (acc, [key, value]) => {
      // biome-ignore lint/suspicious/noExplicitAny: Type assertion to bypass the index signature issue
      const castedAcc = acc as any;

      if (typeof value === "object") {
        castedAcc[key] = mapCSSVars(value, `${prefix}-${key}`);
      } else {
        castedAcc[key] = `var(${prefix}-${key})`;
      }

      return acc;
    },
    {} as DeepPartial<T>,
  );

/**
 * Extracts CSS variables from a theme object.
 */
export const extractCSSVars = (obj: object, prefix = "--nextui") => {
  const vars = {} as Record<string, string>;

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object") {
      const nestedVars = extractCSSVars(value, `${prefix}-${key}`);

      for (const [nestedKey, nestedValue] of Object.entries(nestedVars)) {
        vars[nestedKey] = nestedValue;
      }
    } else {
      vars[`${prefix}-${key}`] = value;
    }
  }

  return vars;
};
