import { colorTokens } from "../theme/colorTokens";

type ColorModes = {
  [mode: string]: {
    [key: string]: string;
  };
};

/**
 * Converts a kebab-case string to camelCase and removes "Base" from the string.
 */
const toCamelCase = (input: string): string => {
  return input
    .replace(/-([a-z])/g, (_, char) => char.toUpperCase()) // Convert to camelCase
    .replace(/Base/g, ""); // Remove "Base"
};

/**
 * Transforms `ColorTokens` configuration object into a structured `modes` object.
 *
 * This function processes the `ColorTokens` object by:
 * - Organizing color values by mode (`light`, `dark`, etc.).
 * - Flattening category and property names into camelCase keys.
 * - Ignoring metadata fields like `description`.
 */
export const colorModes: ColorModes = (() => {
  const modes: ColorModes = {};

  // Iterate through each category (e.g., "primary", "secondary")
  for (const [category, properties] of Object.entries(colorTokens)) {
    // Iterate through each property (e.g., "base", "hover") within the category
    for (const [property, values] of Object.entries(properties)) {
      // Process each mode (e.g., "light", "dark") in the property values
      for (const [mode, color] of Object.entries(values)) {
        if (mode === "description") continue; // Skip non-color metadata

        // Ensure the mode exists in the `modes` object
        modes[mode] = modes[mode] || {};
        // modes[mode][category] = modes[mode][category] || {};

        // modes[mode][category][property] = color as string;
        // Create a camelCase key from category and property and assign the color
        const key = toCamelCase(`${category}-${property}`);
        modes[mode][key] = color as string;
      }
    }
  }

  return modes;
})();
