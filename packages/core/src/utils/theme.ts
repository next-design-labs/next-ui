import {
  type SelectedTheme,
  type Theme,
  extractCSSVars,
  themes as nextThemes,
} from "@next-design-labs/next-ui-styles";
import merge from "deepmerge";

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

  // If no themes are provided then use first available theme as default.
  return [Object.values(nextThemes)[0]];
};

/**
 * Gets the selected theme based on the provided theme name and color mode.
 */
export const getSelectedTheme = (
  themes: Theme[],
  themeName: string | undefined,
  themeMode: string | undefined,
): SelectedTheme => {
  // Find the selected theme by name, or default to the first theme
  const theme = themes.find((t) => t.name === themeName) || themes[0];
  // Extract the available modes from the selected theme
  const modes = Object.keys(theme.modes);
  // Determine the selected mode based on the provided mode, or default to the first mode
  const mode = themeMode && modes.includes(themeMode) ? themeMode : modes[0];
  // Extract the available modes from the selected theme
  const { modes: themeModes, ...rest } = theme;

  const selectedTheme = { ...rest, mode };
  const selectedMode = themeModes[mode as keyof typeof theme.modes];

  return merge(selectedTheme, selectedMode) as SelectedTheme;
};

/**
 * Sets CSS variables based on the provided theme object.
 */
export const setThemeVars = (theme: SelectedTheme) => {
  const themeId = "next-ui-theme";

  // Skip if window is not defined (e.g. during SSR)
  if (typeof window === "undefined") return;

  // Find the existing <style> element by id
  let styleElement = document.querySelector(`style#${themeId}`);

  // Create and append a new <style> element if it doesn't exist
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
  const { name, mode, fontFamily, colors } = theme;

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
    element.style.backgroundColor = colors.background;
    element.style.fontFamily = fontFamily.body;
  }
};

/**
 * Generates a CSS variable string for a given theme.
 */
const generateCSSVarString = (theme: SelectedTheme) => {
  // Create theme attribute selector
  const themeAttrs = `[data-theme="${theme.name}"][data-mode="${theme.mode}"]`;

  // Extract CSS variables from the theme object
  const cssVars = extractCSSVars({
    ...theme,
  });

  // Generate the CSS string with custom properties
  const cssVarString = Object.entries(cssVars).reduce(
    (acc, [varName, varValue]) => {
      return `${acc}    ${varName}: ${varValue};\n`;
    },
    `${themeAttrs} {\n`,
  );

  return cssVarString;
};
