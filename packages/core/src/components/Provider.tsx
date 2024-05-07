import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { NuiTheme } from "../types";
import {
  applyThemeAttributes,
  applyThemeCSSVars,
  getActiveTheme,
  getUniqueThemes,
} from "../utils";

type NuiContextProps = {
  themes: NuiTheme[];
  theme: NuiTheme;
  changeTheme: (themeName?: string, mode?: NuiTheme["colorMode"]) => void;
};

export const NuiContext = createContext<NuiContextProps>({
  themes: [],
  theme: {} as NuiTheme,
  changeTheme: () => {},
});

type NuiProviderProps = {
  /**
   * The root element ID where the theme is applied.
   * Defaults to the body element if not provided or invalid.
   */
  rootId?: string;
  /**
   * List of themes available within the application.
   * Defaults to the first theme if multiple themes are provided,
   * or a predefined theme if none are provided.
   */
  themes?: NuiTheme[];
  /**
   * Name of the initially active theme.
   * Defaults to the first theme if not specified or invalid.
   */
  theme?: string;
  /**
   * Initial color mode.
   * Defaults to the default color mode if unspecified or invalid.
   */
  colorMode?: NuiTheme["colorMode"];
  /**
   * Children components rendered within the provider.
   */
  children: React.ReactNode;
};

export const NuiProvider = ({
  rootId,
  themes,
  theme,
  colorMode,
  children,
}: NuiProviderProps) => {
  const themeList = useMemo(() => getUniqueThemes(themes), [themes]);

  const [activeTheme, setActiveTheme] = useState<NuiTheme>(
    getActiveTheme(themeList, theme, colorMode),
  );

  if (typeof window !== "undefined") {
    // Apply the current theme's CSS variables
    applyThemeCSSVars(activeTheme);
    // Apply the current theme attributes on the root element
    applyThemeAttributes(activeTheme, rootId);
  }

  // Update the active theme when theme or color mode changes
  useEffect(() => {
    setActiveTheme(getActiveTheme(themeList, theme, colorMode));
  }, [themeList, theme, colorMode]);

  const changeTheme = useCallback(
    (themeName?: string, colorMode?: NuiTheme["colorMode"]) => {
      setActiveTheme(getActiveTheme(themeList, themeName, colorMode));
    },
    [themeList],
  );

  const contextValue = useMemo(
    () => ({
      themes: themeList,
      theme: activeTheme,
      changeTheme,
    }),
    [themeList, activeTheme, changeTheme],
  );

  return (
    <NuiContext.Provider value={contextValue}>{children}</NuiContext.Provider>
  );
};
