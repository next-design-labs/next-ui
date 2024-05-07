// Convert camelCase or PascalCase to kebab-case (e.g., fontSize -> font-size)
export const toKebabCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

// Stringify object values
export const stringifyValues = (obj: Record<string, string | number>) =>
  Object.fromEntries(Object.entries(obj ?? {}).map(([k, v]) => [k, `${v}`]));
