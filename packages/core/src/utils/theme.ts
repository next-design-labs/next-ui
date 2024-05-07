import type { NuiTheme } from "../types";
import { applyCSSRule, generateCSSRule } from "./cssVars";

/**
 * Filters and returns a unique list of themes based on their names.
 *
 * This function ensures that each theme in the list is unique by comparing their `name` property.
 * If no themes are provided, it returns an empty array.
 */
export const getUniqueThemes = (
  themesList: NuiTheme[] | undefined,
): NuiTheme[] => {
  // Return an empty array if no valid themes list is provided
  if (!Array.isArray(themesList)) {
    return [];
  }

  // Filter the list to include only unique themes based on their name
  return themesList.filter(
    (theme, index, self) =>
      self.findIndex((t) => t.name === theme.name) === index,
  );
};

/**
 * Determines the active theme and the preferred color mode.
 *
 * If the target theme name is not found, defaults to the first theme in the list.
 * Ensures the selected color mode is valid for the chosen theme, falling back
 * to the first available color mode if necessary.
 */
export const getActiveTheme = (
  themesList: NuiTheme[],
  targetThemeName?: string,
  preferredColorMode = "light",
): NuiTheme => {
  // Find the theme matching the target name or fallback to the first theme
  const activeTheme =
    themesList.find((theme) => theme.name === targetThemeName) || themesList[0];

  // Get the available color modes for the selected theme
  const availableColorModes = Object.keys(activeTheme.colorModes);

  // Use the preferred color mode if valid, otherwise default to the first available color mode
  const activeColorMode = availableColorModes.includes(
    preferredColorMode as string,
  )
    ? preferredColorMode
    : availableColorModes[0];

  // Return the active theme with the resolved color mode
  return {
    ...activeTheme,
    colorMode: activeColorMode,
  };
};

/**
 * Generates and applies CSS variables for the specified theme.
 *
 * Combines base colors, color mode-specific overrides, and theme tokens to create CSS variables.
 * These variables are applied as a CSS rule targeting the theme and color mode.
 */
export const applyThemeCSSVars = (theme: NuiTheme): void => {
  const { name, colorMode, cssVarsList } = theme;

  // Create a selector for the theme and color mode
  const selector = `[theme="${name}"][color-mode="${colorMode}"]`;

  // Generate the CSS rule for the theme
  const rule = generateCSSRule(selector, cssVarsList);

  // Apply the CSS rule to the document
  applyCSSRule("nui-theme-styles", selector, rule);
};

/**
 * Applies theme attributes and inline styles to a DOM element.
 *
 * Sets data attributes (`theme` and `color-mode`) and applies inline styles for
 * color scheme, font family, background color, and text color based on the active theme.
 */
export const applyThemeAttributes = (
  theme: NuiTheme,
  targetId?: string,
): void => {
  const { name: themeName, colorMode, designTokens, colorModes } = theme;

  // Retrieve styles for the active color mode
  const activeModeStyles = colorModes[colorMode];

  // Determine the target element (default to `document.body` if no ID is provided)
  const targetElement = targetId
    ? document.getElementById(targetId)
    : document.body;

  if (!targetElement) return;

  // Set data attributes for the theme and color mode
  targetElement.setAttribute("theme", themeName);
  targetElement.setAttribute("color-mode", colorMode);

  // Apply inline styles for the theme
  targetElement.style.colorScheme = colorMode; // Set the color scheme (e.g., "light" or "dark")
  targetElement.style.fontFamily = designTokens.font.body; // Set the font family
  targetElement.style.backgroundColor = activeModeStyles.background.base || ""; // Set background color
  targetElement.style.color = activeModeStyles.text.base || ""; // Set text color
};
