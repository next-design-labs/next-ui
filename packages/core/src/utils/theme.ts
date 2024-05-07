import {
  type Theme,
  extractCSSVars,
  themes,
} from "@next-design-labs/next-ui-styles";

export type ActiveTheme = Theme & {
  colorMode: string;
  colorModes: string[];
  colorScheme: string;
};

/**
 * Processes a list of themes into a list of unique themes.
 */
export const processThemes = (themesList: Theme[] | undefined) => {
  if (Array.isArray(themesList)) {
    // Remove duplicate themes
    const uniqueThemes = themesList.filter(
      (theme, index, self) =>
        self.findIndex((t) => t.name === theme.name) === index
    );

    return uniqueThemes;
  }

  // If no themes are provided then use default theme
  return [themes.ds5];
};

/**
 * Gets the active theme from a list of themes.
 */
export const getActiveTheme = (
  themes: Theme[],
  themeName: string | undefined,
  themeMode: string | undefined
): ActiveTheme => {
  // Find the selected theme by name, or default to the first theme
  const theme: Theme = themes.find((t) => t.name === themeName) || themes[0];
  // Extract the available color modes from the selected theme
  const colorModes = Object.keys(theme.colors.modes);
  // Determine the selected color mode based on the provided mode, or default to the first color mode
  const colorMode =
    themeMode && colorModes.includes(themeMode) ? themeMode : colorModes[0];
  // Retrieve the color scheme associated with the selected color mode
  const colorScheme = theme.colors.modes[colorMode].scheme || "light";

  return {
    ...theme,
    colorMode,
    colorModes,
    colorScheme,
  };
};

/**
 * Sets global baseline styles for some of the HTML elements.
 */
export const setGlobalBaseline = () => {
  const globalBaseline = document.createElement("style");

  globalBaseline.innerHTML = `
    * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  `;

  document.head.appendChild(globalBaseline);
};

/**
 * Generates and appends CSS variables scoped by theme and color mode to the document's head.
 */
export const setGlobalThemesVars = (themesList: Theme[]) => {
  for (const theme of themesList) {
    const { name, colors } = theme;

    for (const colorMode of Object.keys(colors.modes)) {
      const themeId = `theme-${name}-${colorMode}`;

      let styleElement = document.querySelector(`style#${themeId}`);

      if (!styleElement) {
        // Create and append a new <style> element if it doesn't exist
        styleElement = document.createElement("style");
        styleElement.id = themeId;
        styleElement.innerHTML = createCSSVarString(theme, colorMode);
        document.head.appendChild(styleElement);
      }
    }
  }
};

/**
 * Sets active theme's attributes to a specified element or the document body.
 */
export const setActiveThemeAttrs = (
  activeTheme: ActiveTheme,
  elementId?: string
) => {
  const { name, colorScheme, colorMode, colors, fontFamily } = activeTheme;

  const element = elementId
    ? document.getElementById(elementId)
    : document.body;

  if (element) {
    element.setAttribute("data-theme", name);
    element.setAttribute("data-color-mode", colorMode);

    element.style.colorScheme = colorScheme;
    element.style.backgroundColor =
      colors.modes[colorMode].backgroundColor || "";
    element.style.fontFamily = fontFamily.body;
  }
};

/**
 * Generates a string containing CSS variables scoped to specific theme and color mode attributes.
 */
const createCSSVarString = (theme: Theme, colorMode: string) => {
  const themeAttrs = `[data-theme="${theme.name}"][data-color-mode="${colorMode}"]`;

  const cssVars = extractCSSVars({
    ...theme,
    colors: theme.colors.modes[colorMode],
  });

  const cssVarString = Object.entries(cssVars).reduce(
    (acc, [varName, varValue]) => {
      return `${acc}    ${varName}: ${varValue};\n`;
    },
    `${themeAttrs} {\n`
  );

  return cssVarString;
};
