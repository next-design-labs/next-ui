import type { Theme } from "@next-design-labs/next-ui-styles";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  type ActiveTheme,
  getActiveTheme,
  processThemes,
  setActiveThemeAttrs,
  setGlobalBaseline,
  setGlobalThemesVars,
} from "../utils/theme";

type ThemeContextValue = {
  themes?: Theme[];
  activeTheme?: ActiveTheme;
  changeTheme: (theme?: string, mode?: string) => void;
  changeColorMode: (mode?: string) => void;
};

export const HvThemeContext = createContext<ThemeContextValue>({
  themes: [],
  activeTheme: undefined,
  changeTheme: () => {},
  changeColorMode: () => {},
});

type ProviderProps = {
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
  colorMode?: string;
  /**
   * The children to be rendered.
   */
  children: React.ReactNode;
};

export const HvProvider = ({
  rootId,
  themes: themesList,
  theme,
  colorMode,
  children,
}: ProviderProps) => {
  const themes = processThemes(themesList);
  const initTheme = getActiveTheme(themes, theme, colorMode);
  const [activeTheme, setActiveTheme] = useState(initTheme);

  // Set global baseline styles
  if (typeof window !== "undefined") setGlobalBaseline();

  // Set global CSS variables scoped by theme and color mode
  if (typeof window !== "undefined") setGlobalThemesVars(themes);

  useEffect(() => {
    // Set active theme attributes to the root element
    setActiveThemeAttrs(activeTheme, rootId);
  }, [activeTheme, rootId]);

  const changeTheme = (theme?: string, mode?: string) => {
    const active = getActiveTheme(themes, theme, mode);
    setActiveTheme(active);
  };

  const changeColorMode = (mode?: string) => {
    const active = getActiveTheme(themes, activeTheme.name, mode);
    setActiveTheme(active);
  };

  const value = useMemo(
    () => ({
      themes,
      activeTheme,
      changeTheme,
      changeColorMode,
    }),
    [themes, activeTheme, changeTheme, changeColorMode]
  );

  return (
    <HvThemeContext.Provider value={value}>{children}</HvThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(HvThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a Provider");
  }
  return context;
};
