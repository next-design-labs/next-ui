import type { SelectedTheme, Theme } from "@next-design-labs/next-ui-styles";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getSelectedTheme,
  processThemes,
  setThemeAttrs,
  setThemeVars,
} from "../utils/theme";

type ThemeContextValue = {
  themes?: Theme[];
  selected?: SelectedTheme;
  changeTheme: (theme?: string, mode?: string) => void;
};

export const ThemeContext = createContext<ThemeContextValue>({
  themes: [],
  selected: undefined,
  changeTheme: () => {},
});

type ThemeProviderProps = {
  /**
   * Id of the DOM element where the theme will be applied.
   * - If invalid or no value is provided, the theme will be applied to body element.
   */
  rootId?: string;
  /**
   * The themes to be used.
   * - If multiple themes are provided, the first theme will be used as the default theme.
   * - If no themes are provided, the default theme will be used.
   */
  themes?: Theme[];
  /**
   * The active theme name.
   * - If invalid or no value is provided, the default theme will be used.
   */
  theme?: string;
  /**
   * The active color mode.
   * - If invalid or no value is provided, the default color mode will be used.
   */
  mode?: string;
  /**
   * The children to be rendered.
   */
  children: React.ReactNode;
};

export const ThemeProvider = ({
  rootId,
  themes: themesProp,
  theme,
  mode,
  children,
}: ThemeProviderProps) => {
  const themes = useMemo(() => processThemes(themesProp), [themesProp]);
  const [selected, setSelected] = useState<SelectedTheme>(
    getSelectedTheme(themes, theme, mode),
  );

  // Sets CSS variables based on selected theme.
  setThemeVars(selected);

  // Set selected theme attributes to the root element
  setThemeAttrs(selected, rootId);

  // Update selected theme when theme or color mode changes
  useEffect(() => {
    setSelected(getSelectedTheme(themes, theme, mode));
  }, [themes, theme, mode]);

  const changeTheme = useCallback(
    (theme?: string, mode?: string) => {
      setSelected(getSelectedTheme(themes, theme, mode));
    },
    [themes],
  );

  const value = useMemo(
    () => ({
      themes,
      selected,
      changeTheme,
    }),
    [themes, selected, changeTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a Provider");
  }
  return context;
};
