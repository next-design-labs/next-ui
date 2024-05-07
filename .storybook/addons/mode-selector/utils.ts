const STORAGE_MODE_KEY = "sb-next-ui-mode";

export type Mode = "light" | "dark";

export const setLocalMode = (value: Mode): void => {
  localStorage?.setItem(STORAGE_MODE_KEY, value);
};

export const getLocalMode = (): string | undefined => {
  return localStorage?.getItem(STORAGE_MODE_KEY) || undefined;
};

export const getInitialMode = (): Mode => {
  const localMode = getLocalMode() as Mode;

  if (localMode) {
    return localMode;
  }

  const prefersDark = window?.matchMedia?.(
    "(prefers-color-scheme: dark)",
  )?.matches;

  return prefersDark ? "dark" : "light";
};
