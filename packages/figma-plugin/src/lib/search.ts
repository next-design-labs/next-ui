/**
 * A type representing values that can be searched recursively.
 */
type SearchableValue = string | Record<string, unknown> | unknown[];

/**
 * Recursively searches for a string in an object or array.
 * @param obj - The object to search within.
 * @param searchString - The string to search for.
 * @returns A filtered object or array containing matches, or null if no match is found.
 */
export const search = (
  obj: Record<string, unknown>,
  searchString: string,
): Record<string, unknown> | null => {
  const normalizedSearch = searchString.toLowerCase();

  /**
   * Helper function to search recursively within the current value.
   */
  const recursiveSearch = (value: SearchableValue): SearchableValue | null => {
    if (typeof value === "string") {
      // Direct string match
      return value.toLowerCase().includes(normalizedSearch) ? value : null;
    }

    if (Array.isArray(value)) {
      // Search within array elements
      const filteredArray = value
        .map((item) => recursiveSearch(item as SearchableValue))
        .filter((item) => item !== null);

      return filteredArray.length > 0 ? filteredArray : null;
    }

    if (value && typeof value === "object") {
      // Search within object keys and values
      const filteredEntries = Object.entries(value).reduce(
        (acc, [key, val]) => {
          const matchedValue = recursiveSearch(val as SearchableValue);
          const keyMatches = key.toLowerCase().includes(normalizedSearch);

          if (matchedValue !== null || keyMatches) {
            acc[key] = matchedValue !== null ? matchedValue : val;
          }

          return acc;
        },
        {} as Record<string, unknown>,
      );

      return Object.keys(filteredEntries).length > 0 ? filteredEntries : null;
    }

    return null; // Non-searchable value
  };

  return recursiveSearch(obj) as Record<string, unknown> | null;
};
