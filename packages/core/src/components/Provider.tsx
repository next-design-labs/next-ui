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

/**
 * Context properties provided by `NuiProvider`.
 */
type NuiContextProps = {
  /** List of available themes. */
  themes: NuiTheme[];
  /** Currently active theme. */
  theme: NuiTheme;
  /** Function to change the active theme or color mode. */
  changeTheme: (themeName?: string, mode?: NuiTheme["colorMode"]) => void;
};

/** React context for managing Nui themes. */
export const NuiContext = createContext<NuiContextProps>({
  themes: [],
  theme: {} as NuiTheme,
  changeTheme: () => {}, // Default no-op
});

/**
 * Props for the `NuiProvider` component.
 */
type NuiProviderProps = {
  /** ID of the root element where theme attributes are applied (defaults to `document.body`). */
  rootId?: string;
  /** List of available themes (defaults to a unique filtered list or a fallback theme). */
  themes?: NuiTheme[];
  /** Name of the initially active theme (defaults to the first theme in the list). */
  theme?: string;
  /** Initial color mode (defaults to the theme's default color mode). */
  colorMode?: NuiTheme["colorMode"];
  /** Children components wrapped by the provider. */
  children: React.ReactNode;
};

/**
 * `NuiProvider` sets up theme management for the application.
 * It manages the active theme, applies theme-related CSS variables and attributes,
 * and provides a context for dynamically changing themes.
 */
export const NuiProvider: React.FC<NuiProviderProps> = ({
  rootId,
  themes = [],
  theme,
  colorMode,
  children,
}) => {
  // Deduplicate and ensure a valid list of themes
  const themeList = useMemo(() => getUniqueThemes(themes), [themes]);

  // State for the active theme
  const [activeTheme, setActiveTheme] = useState<NuiTheme>(
    getActiveTheme(themeList, theme, colorMode),
  );

  if (typeof window !== "undefined") {
    // Apply the active theme's CSS variables and attributes
    applyThemeCSSVars(activeTheme);
    applyThemeAttributes(activeTheme, rootId);
  }

  // Update the active theme when props or theme list changes
  useEffect(() => {
    setActiveTheme(getActiveTheme(themeList, theme, colorMode));
  }, [themeList, theme, colorMode]);

  /**
   * Dynamically changes the active theme or color mode.
   */
  const changeTheme = useCallback(
    (themeName?: string, newColorMode?: NuiTheme["colorMode"]) => {
      const updatedTheme = getActiveTheme(themeList, themeName, newColorMode);
      setActiveTheme(updatedTheme);
    },
    [themeList],
  );

  // Context value for providing theme data and actions
  const contextValue = useMemo(
    () => ({
      themes: themeList,
      theme: activeTheme,
      changeTheme,
    }),
    [themeList, activeTheme, changeTheme],
  );

  // Return the context provider wrapping the children
  return (
    <NuiContext.Provider value={contextValue}>{children}</NuiContext.Provider>
  );
};
