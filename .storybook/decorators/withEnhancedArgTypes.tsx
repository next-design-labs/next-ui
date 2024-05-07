import merge from "deepmerge";

const propControls = {
  select: ["variant", "color", "size", "radius"],
};

export default ({ argTypes, component, initialArgs }) => {
  const enhancedArgTypes = {};

  Object.entries(argTypes).forEach(([arg]) => {
    const prop = component.__docgenInfo?.props[arg];
    if (!prop) return; // Skip if there is no prop information

    const { name, type, defaultValue } = prop;
    const isBoolean = type?.name === "boolean";

    // Initialize with existing argInfo to preserve any existing settings
    const enhancements = argTypes[arg];

    if (name?.startsWith("mui")) {
      enhancements.table = { ...enhancements.table, category: "MUI Props" };
    }

    const customControlType = Object.keys(propControls).find((control) =>
      propControls[control].includes(arg),
    );

    if (customControlType) {
      enhancements.control = { type: customControlType };
      initialArgs[arg] = defaultValue?.value;
    }

    if (isBoolean) {
      enhancements.control = { type: "boolean" };
      initialArgs[arg] = defaultValue?.value === "true";
    }

    // Merge the enhancements into the enhancedArgTypes object
    enhancedArgTypes[arg] = enhancements;
  });

  // Merge all enhancements with original argTypes to not lose any predefined configurations
  return merge(argTypes, enhancedArgTypes);
};
