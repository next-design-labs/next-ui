// biome-ignore lint/suspicious/noExplicitAny: tmp
export const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === "function" ? fn(args) : fn;

export const isTranslatedUpwards = (ref: HTMLElement | null) => {
  // Extract numbers from the transform string
  const matches = ref?.style.transform?.match(
    /translate\((-?\d+)px,\s*(-?\d+)px\)/,
  );

  return !matches ? null : Number.parseInt(matches[2], 10) <= 0;
};
