import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names and applies tailwind-merge for optimal class name generation.
 */
export const cx = (...classes: ClassValue[]) => twMerge(clsx(...classes));
