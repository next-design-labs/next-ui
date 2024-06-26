const STORAGE_THEME_KEY = "sb-next-ui-theme";

export type Theme = {
  name: string;
  label: string;
};

export const setLocalTheme = (value: string): void => {
  localStorage?.setItem(STORAGE_THEME_KEY, value);
};

export const getLocalTheme = (): string | null => {
  return localStorage?.getItem(STORAGE_THEME_KEY);
};

export const getInitialTheme = (themes: Theme[]) => {
  const initialTheme = getLocalTheme();

  return themes.find((theme) => theme.name === initialTheme) || themes[0];
};

const toPascalCase = (str: string) =>
  str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );

export const getThemesList = (themes) => {
  const themesList: Theme[] = Object.keys(themes).map((themeName) => ({
    name: `${themeName}`,
    label: `${toPascalCase(themeName)}`,
  }));

  return themesList;
};
