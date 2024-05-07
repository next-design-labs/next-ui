import {
  HvButton,
  HvHeader,
  HvSelectOption,
  HvSelect,
  useTheme,
} from "@next-design-labs/next-ui-core";

export const Navigation = () => {
  const { themes, activeTheme, changeTheme, changeColorMode } = useTheme();
  const { colorModes } = activeTheme || {};

  return (
    <HvHeader className="flex items-center gap-2 p-2">
      <HvSelect
        value={activeTheme?.name}
        onChange={(_, value) =>
          changeTheme(value as string, activeTheme?.colorMode)
        }
      >
        {themes?.map(({ name }) => (
          <HvSelectOption key={name} value={name}>
            {name}
          </HvSelectOption>
        ))}
      </HvSelect>
      <HvSelect
        value={activeTheme?.colorMode}
        onChange={(_, value) => changeColorMode(value as string)}
      >
        {colorModes?.map((mode) => (
          <HvSelectOption key={mode} value={mode}>
            {mode}
          </HvSelectOption>
        ))}
      </HvSelect>
      <HvButton>Button</HvButton>
    </HvHeader>
  );
};
