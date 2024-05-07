import {
  type NuiTheme,
  createCSSVars,
  filterTheme,
  themes,
} from "@next-design-labs/next-ui-styles";

/**
 * Processes the provided themes and returns a list of unique themes.
 */
export const processThemes = (themesList: NuiTheme[] | undefined) => {
  if (Array.isArray(themesList)) {
    // Remove duplicate themes by name
    const uniqueThemes = themesList?.filter(
      (theme, index, self) =>
        self.findIndex((t) => t.name === theme.name) === index,
    );

    return uniqueThemes;
  }

  // If no themes are provided use the default theme
  return [themes.pentaho];
};

/**
 * Gets the selected theme based on the provided theme name and color mode.
 */
export const getSelectedTheme = (
  themes: NuiTheme[],
  activeTheme?: string,
  activeMode = "light",
) => {
  // Find the selected theme by name, or default to the first theme
  const theme = themes.find((t) => t.name === activeTheme) || themes[0];

  // Extract the available modes from the selected theme
  const colorModes = Object.keys(theme.modes);

  // Determine the selected color mode based on the provided activeMode, or default to the first colorMode
  const colorMode = colorModes.includes(activeMode)
    ? activeMode
    : colorModes[0];

  return { ...theme, colorMode };
};

/**
 * Sets theme attributes on a specified HTML element or the document body.
 */
export const setThemeAttrs = (theme: NuiTheme, elementId?: string) => {
  const { name, colorMode, tokens } = theme;
  const mode = theme.modes[colorMode as keyof NuiTheme["modes"]];

  // Determine the target element, default to document.body
  const element = elementId
    ? document.getElementById(elementId)
    : document.body;

  if (element) {
    // Set data attributes for the theme name and color mode
    element.setAttribute("data-theme", name);
    element.setAttribute("data-colorMode", colorMode);

    // Set style attributes for color colorScheme, background color, and font family
    element.style.colorScheme = colorMode;
    element.style.fontFamily = tokens.fontFamily.body;
    element.style.backgroundColor = mode.bgPage || "";
    element.style.color = mode.text || "";
  }
};

/**
 * Sets the theme variables dynamically by creating and appending a style element to the document head.
 */
export const setThemeVars = (theme: NuiTheme) => {
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
 * Generates a CSS variable string for a given theme.
 */
const generateCSSVarString = (theme: NuiTheme) => {
  const { name, colorMode } = theme;

  // Create a theme attribute selector
  const themeSelector = `[data-theme="${name}"][data-colorMode="${colorMode}"]`;

  // Filter theme and create a flat object of CSS variables
  const cssVars = createCSSVars(filterTheme(theme));

  // Generate the CSS string with generated CSS variables
  const cssVarString = Object.entries(cssVars).reduce(
    (cssString, [varName, varValue]) => {
      return `${cssString}  ${varName}: ${varValue};\n`;
    },
    `${themeSelector} {\n`,
  );

  return cssVarString;
};
