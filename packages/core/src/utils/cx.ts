import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges and optimizes class names using `clsx` and `tailwind-merge`.
 *
 * This utility combines multiple class name inputs, removes duplicates,
 * and resolves TailwindCSS class conflicts for the optimal final output.
 */
export const cx = (...classes: ClassValue[]): string => {
  return twMerge(clsx(...classes));
};
