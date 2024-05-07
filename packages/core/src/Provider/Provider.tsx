import type { NuiTheme } from "@next-design-labs/next-ui-styles";
import {
  createContext,
  useCallback,
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
  themes: NuiTheme[];
  theme?: NuiTheme;
  changeTheme: (theme?: string, mode?: string) => void;
};

export const NuiThemeContext = createContext<ThemeContextValue>({
  themes: [],
  theme: undefined,
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
  themes?: NuiTheme[];
  /**
   * The active theme name.
   * - If invalid or no value is provided, the default theme will be used.
   */
  activeTheme?: string;
  /**
   * The active color mode.
   * - If invalid or no value is provided, the default color mode will be used.
   */
  activeMode?: string;
  /**
   * The children to be rendered.
   */
  children: React.ReactNode;
};

export const NuiThemeProvider = ({
  rootId,
  themes: themesProp,
  activeTheme,
  activeMode,
  children,
}: ThemeProviderProps) => {
  const themes = useMemo(() => processThemes(themesProp), [themesProp]);
  const [theme, setTheme] = useState<NuiTheme>(
    getSelectedTheme(themes, activeTheme, activeMode),
  );

  // Sets CSS variables based on selected theme.
  setThemeVars(theme);

  // Set selected theme attributes to the root element
  setThemeAttrs(theme, rootId);

  // Update selected theme when theme or color mode changes
  useEffect(() => {
    setTheme(getSelectedTheme(themes, activeTheme, activeMode));
  }, [themes, activeTheme, activeMode]);

  const changeTheme = useCallback(
    (newTheme?: string, newMode?: string) => {
      setTheme(getSelectedTheme(themes, newTheme, newMode));
    },
    [themes],
  );

  const value = useMemo(
    () => ({
      themes,
      theme,
      changeTheme,
    }),
    [themes, theme, changeTheme],
  );

  return (
    <NuiThemeContext.Provider value={value}>
      {children}
    </NuiThemeContext.Provider>
  );
};
