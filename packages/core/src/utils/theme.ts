import {
  type SelectedTheme,
  type Theme,
  extractCSSVars,
  pentaho,
} from "@next-design-labs/next-ui-styles";
import merge from "deepmerge";

type ThemeMode = keyof Theme["modes"];

/**
 * Processes the provided themes and returns a list of unique themes.
 */
export const processThemes = (themes: Theme[] | undefined) => {
  if (Array.isArray(themes)) {
    // Remove duplicate themes by name
    const uniqueThemes = themes.filter(
      (theme, index, self) =>
        self.findIndex((t) => t.name === theme.name) === index,
    );

    return uniqueThemes;
  }

  // If no themes are provided use the default theme
  return [pentaho];
};

/**
 * Gets the selected theme based on the provided theme name and mode.
 */
export const getSelectedTheme = (
  themes: Theme[],
  themeName?: string,
  themeMode?: string,
): SelectedTheme => {
  // Find the selected theme by name, or default to the first theme
  const theme = themes.find((t) => t.name === themeName) || themes[0];

  // Extract the available modes from the selected theme
  const modesList = Object.keys(theme.modes);

  // Determine the selected mode based on the provided mode, or default to the first mode
  const mode = modesList.includes(themeMode ?? "") ? themeMode : modesList[0];

  // Extract theme properties not needed for CSS variables
  const { modes, components, ...rest } = theme;

  return merge({ ...rest, mode }, theme.modes[mode as ThemeMode]);
};

/**
 * Sets the CSS variables for the given theme by injecting or updating a <style> element in the document head.
 */
export const setThemeVars = (theme: SelectedTheme) => {
  const themeId = "next-ui-theme";

  // Skip if window is not defined (e.g. during SSR)
  if (typeof window === "undefined") return;

  // Check if style element exists
  let styleElement = document.querySelector(`style#${themeId}`);

  // Create and append a new <style> element if style element does not exist
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = themeId;
    document.head.appendChild(styleElement);
  }

  styleElement.innerHTML = generateCSSVarString(theme);
};

/**
 * Sets theme attributes on a specified HTML element or the document body.
 */
export const setThemeAttrs = (theme: SelectedTheme, elementId?: string) => {
  const { name, mode, fontFamily, background } = theme;

  // Determine the target element, default to document.body
  const element = elementId
    ? document.getElementById(elementId)
    : document.body;

  if (element) {
    // Set data attributes for the theme name and color mode
    element.setAttribute("data-theme", name);
    element.setAttribute("data-mode", mode);

    // Set style attributes for color scheme, background color, and font family
    element.style.colorScheme = mode;
    element.style.backgroundColor = background.primary;
    element.style.fontFamily = fontFamily.body;
  }
};

/**
 * Generates a CSS variable string for a given theme.
 */
const generateCSSVarString = (theme: SelectedTheme) => {
  // Extract the theme name and mode from the theme object;
  const { name, mode, ...rest } = theme;

  // Create a theme attribute selector
  const themeSelector = `[data-theme="${name}"][data-mode="${mode}"]`;

  // Extract CSS variables from the theme object, excluding name and mode
  const cssVars = extractCSSVars(rest);

  // Generate the CSS string with custom properties
  const cssVarString = Object.entries(cssVars).reduce(
    (cssString, [varName, varValue]) => {
      return `${cssString}  ${varName}: ${varValue};\n`;
    },
    `${themeSelector} {\n`,
  );

  return cssVarString;
};
