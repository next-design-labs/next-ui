import type { NuiTheme } from "../types";
import { applyCSSRule, flattenCSSVars } from "./cssVars";

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
  preferredColorMode: NuiTheme["colorMode"] = "light",
): NuiTheme => {
  // Find the theme matching the target name or fallback to the first theme
  const activeTheme =
    themesList.find((theme) => theme.name === targetThemeName) || themesList[0];

  // Get the available color modes for the selected theme
  const availableColorModes = Object.keys(activeTheme.modes);

  // Use the preferred color mode if valid, otherwise default to the first available color mode
  const activeColorMode = availableColorModes.includes(preferredColorMode)
    ? preferredColorMode
    : availableColorModes[0];

  // Return the active theme with the resolved color mode
  return {
    ...activeTheme,
    colorMode: activeColorMode as NuiTheme["colorMode"],
  };
};

/**
 * Generates and applies CSS variables for the specified theme.
 *
 * This function creates CSS variables by combining the base colors and color mode-specific
 * overrides, along with tokens from the theme. It applies these variables to a CSS rule
 * targeting the theme and color mode.
 */
export const applyThemeCSSVars = (theme: NuiTheme): void => {
  const { name, colorMode, colors, modes, tokens } = theme;

  // Merge base colors with color mode-specific overrides
  const cssVariables = flattenCSSVars({
    colors: {
      ...colors,
      ...modes[colorMode as keyof NuiTheme["modes"]], // Merge current mode's overrides
    },
    ...tokens, // Include additional tokens
  });

  // Convert CSS variables into CSS declarations
  const cssVars = Object.entries(cssVariables)
    .map(([key, value]) => `${key}: ${value};`)
    .join("\n");

  // Create a selector for the theme and color mode
  const selector = `[theme="${name}"][color-mode="${colorMode}"]`;

  // Generate the CSS rule
  const cssRule = `${selector} {\n${cssVars}\n}`;

  // Apply the CSS rule to the document
  applyCSSRule("nui-theme-styles", selector, cssRule);
};

/**
 * Updates the attributes and inline styles of a DOM element to apply the active theme.
 *
 * This function sets data attributes for the theme name and color mode, and applies inline styles
 * to define the color scheme, font family, background color, and text color.
 */
export const applyThemeAttributes = (
  theme: NuiTheme,
  elementId?: string,
): void => {
  const { name, colorMode, tokens, modes } = theme;

  // Get the styles for the active color mode
  const activeModeStyles = modes[colorMode as keyof NuiTheme["modes"]];

  // Determine the target element (default to `document.body` if no ID is provided)
  const targetElement = elementId
    ? document.getElementById(elementId)
    : document.body;

  if (!targetElement) return;

  // Apply data attributes for theme and color mode
  targetElement.setAttribute("theme", name);
  targetElement.setAttribute("color-mode", colorMode);

  // Apply inline styles for the theme
  targetElement.style.colorScheme = colorMode; // Set the color scheme (e.g., "light" or "dark")
  targetElement.style.fontFamily = tokens.font.body; // Apply the font family
  targetElement.style.backgroundColor = activeModeStyles.page || ""; // Set the page background color
  targetElement.style.color = activeModeStyles.text || ""; // Set the default text color
};
