export const filterTokens = (obj) => {
  const filtered = {};

  Object.keys(obj).forEach((key) => {
    if (
      typeof obj[key] !== "object" ||
      obj[key] === null ||
      Array.isArray(obj[key])
    ) {
      filtered[key] = obj[key];
    }
  });

  return filtered;
};

export const groupTokens = (tokens) => {
  const groups = {};

  Object.entries(tokens).forEach(([key, value]) => {
    // Convert camelCase to a more readable prefix (e.g., "dividerSubtle" -> "divider")
    const prefix = key.replace(/([a-z])([A-Z])/g, "$1-$2").split("-")[0];

    if (!groups[prefix]) {
      groups[prefix] = [];
    }
    groups[prefix].push({ name: key, value });
  });

  return groups;
};
