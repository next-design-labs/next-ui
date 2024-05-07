import {
  type NuiColorMode,
  type NuiTheme,
  createCSSVars,
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
 * Sets the CSS variables for the given theme by injecting or updating a <style> element in the document head.
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
 * Sets theme attributes on a specified HTML element or the document body.
 */
export const setThemeAttrs = (theme: NuiTheme, elementId?: string) => {
  const { name, colorMode, fontFamily } = theme;
  const themeScheme = theme.modes[colorMode as keyof NuiColorMode];

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
    element.style.fontFamily = fontFamily.body;
    element.style.backgroundColor = themeScheme.bgPage || "";
    element.style.color = themeScheme.text || "";
  }
};

/**
 * Generates a CSS variable string for a given theme.
 */
const generateCSSVarString = (theme: NuiTheme) => {
  // Destructure the theme object to exclude not needed properties for CSS variables
  const { name, colorMode, modes, components, ...rest } = theme;

  // Create a theme attribute selector
  const themeSelector = `[data-theme="${name}"][data-colorMode="${colorMode}"]`;

  // Create CSS variables from the theme object
  const cssVars = createCSSVars({
    ...rest,
    ...modes[colorMode as keyof NuiColorMode],
  });

  // Generate the CSS string with generated CSS variables
  const cssVarString = Object.entries(cssVars).reduce(
    (cssString, [varName, varValue]) => {
      return `${cssString}  ${varName}: ${varValue};\n`;
    },
    `${themeSelector} {\n`,
  );

  return cssVarString;
};
