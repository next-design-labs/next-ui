import type { NuiTheme } from "../types";
import { applyCSSRule, flattenCSSVars } from "./cssVars";

/**
 * Filters and returns a unique list of themes based on their names.
 * If no themes are provided, returns an empty array.
 */
export const getUniqueThemes = (themesList: NuiTheme[] | undefined) => {
  if (Array.isArray(themesList)) {
    // Ensure each theme in the list is unique by filtering based on name
    const uniqueThemes = themesList.filter(
      (theme, index, self) =>
        self.findIndex((t) => t.name === theme.name) === index,
    );
    return uniqueThemes;
  }

  return [];
};

/**
 * Determines the active theme and the preferred color mode.
 * Defaults to the first theme if the target theme name is not found.
 */
export const getActiveTheme = (
  themesList: NuiTheme[],
  targetThemeName?: string,
  preferredColorMode: NuiTheme["colorMode"] = "light",
) => {
  // Select the theme matching the target name, or default to the first theme
  const activeTheme =
    themesList.find((theme) => theme.name === targetThemeName) || themesList[0];

  console.log("🚀 ~ activeTheme:", activeTheme);

  // Identify available color modes for the selected theme
  const availableColorModes = Object.keys(activeTheme.modes);
  // Use preferred color mode if available; otherwise, default to the first color mode
  const activeColorMode = availableColorModes.includes(preferredColorMode)
    ? preferredColorMode
    : availableColorModes[0];

  return {
    ...activeTheme,
    colorMode: activeColorMode as NuiTheme["colorMode"],
  };
};

/**
 * Generates and applies CSS variables for the given theme.
 * Creates a CSS rule targeting the theme and color mode.
 */
export const applyThemeCSSVars = (theme: NuiTheme) => {
  const { name, colorMode, colors, modes, tokens } = theme;

  // Combine base colors with color mode-specific overrides
  const cssVariables = flattenCSSVars({
    colors: {
      ...colors,
      ...modes[colorMode as keyof NuiTheme["modes"]],
    },
    ...tokens,
  });

  // Generate CSS rule for theme-specific variables
  const cssVars = Object.entries(cssVariables)
    .map(([key, value]) => `${key}: ${value};`)
    .join("\n");

  const selector = `[theme="${name}"][color-mode="${colorMode}"]`;
  const cssRule = `${selector} {\n${cssVars}\n}`;

  // Apply the CSS rule to the document
  applyCSSRule("nui-theme-styles", selector, cssRule);
};

/**
 * Updates the DOM element attributes and inline styles to apply the active theme.
 * Sets data attributes for theme name and color mode and applies inline styles for color scheme.
 */
export const applyThemeAttributes = (theme: NuiTheme, elementId?: string) => {
  const { name, colorMode, tokens, modes } = theme;
  const activeModeStyles = modes[colorMode as keyof NuiTheme["modes"]];

  // Identify the target element for theme application
  const targetElement = elementId
    ? document.getElementById(elementId)
    : document.body;

  if (targetElement) {
    // Apply data attributes for theme and color mode
    targetElement.setAttribute("theme", name);
    targetElement.setAttribute("color-mode", colorMode);

    // Apply inline styles for color scheme, font, and background
    targetElement.style.colorScheme = colorMode;
    targetElement.style.fontFamily = tokens.font.body;
    targetElement.style.backgroundColor = activeModeStyles.background || "";
    targetElement.style.color = activeModeStyles.text || "";
  }
};
