import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combine Tailwind and custom classnames
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// Capitalize the first character of a string
export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

// Type Guards
export const isPrimitive = (value: unknown): value is string | number | null =>
  typeof value === "string" || typeof value === "number" || value == null;

export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && value.constructor === Object;

// Validate if a string is a hex color
export const isHexColor = (value: string): boolean =>
  /^#(?:[0-9a-fA-F]{3}){1,2}$/i.test(value);

// RGB Type
export type RGB = { r: number; g: number; b: number };

// Convert a hex color to RGB
export const hexToRgb = (hex: string): RGB | null => {
  if (!isHexColor(hex)) return null;

  const cleanHex = hex.slice(1);
  const bigint = Number.parseInt(
    cleanHex.length === 3
      ? cleanHex
          .split("")
          .map((c) => c + c)
          .join("") // Expand shorthand hex
      : cleanHex,
    16,
  );

  return {
    r: ((bigint >> 16) & 255) / 255,
    g: ((bigint >> 8) & 255) / 255,
    b: (bigint & 255) / 255,
  };
};

// Convert an RGB object to a hex color
export const rgbToHex = (rgb: RGB): string => {
  const toHex = (c: number) =>
    Math.max(0, Math.min(255, Math.round(c * 255))) // Clamp values
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
};

// Flatten nested object values
export type Value = Record<string, unknown> | { value: unknown } | object;

export const flattenObjectValues = (input: Record<string, Value>) => {
  const result: Record<string, unknown> = {};

  function processObject(obj: Record<string, Value>) {
    const current: Record<string, unknown> = {};
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (value && typeof value === "object" && !("value" in value)) {
        current[key as keyof typeof current] = processObject(
          value as Record<string, Value>,
        );
      } else if ("value" in value) {
        current[key as keyof typeof current] = value.value;
      }
    });
    return current;
  }

  Object.keys(input).forEach((key) => {
    result[key] = processObject(input[key] as Record<string, Value>);
  });

  return result;
};
