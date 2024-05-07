import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const isPrimitive = (value: unknown): boolean =>
  typeof value === "string" || typeof value === "number" || value == null;

export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && value.constructor === Object;

export const hexToRgb = (hex: string): RGB => {
  const bigint = Number.parseInt(hex.slice(1), 16);
  return {
    r: ((bigint >> 16) & 255) / 255,
    g: ((bigint >> 8) & 255) / 255,
    b: (bigint & 255) / 255,
  };
};

export const rgbToHex = (rgb: RGB): string => {
  const toHex = (c: number) =>
    Math.round(c * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
};
