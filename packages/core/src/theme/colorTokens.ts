import { colors } from "./colors";

const primary = {
  base: {
    light: colors.blue[600],
    dark: colors.blue[400],
    description: "Primary color used for main actions like buttons and links.",
  },
  hover: {
    light: colors.blue[700],
    dark: colors.blue[300],
    description: "Color used for hover state of primary actions.",
  },
  active: {
    light: colors.blue[800],
    dark: colors.blue[200],
    description: "Color used for pressed or active state of primary actions.",
  },
  subtle: {
    light: colors.blue[200],
    dark: colors.blue[900],
    description: "Background for less prominent or disabled primary elements.",
  },
};

const secondary = {
  base: {
    light: colors.slate[600],
    dark: colors.slate[400],
    description: "Secondary color used for supporting actions and components.",
  },
  hover: {
    light: colors.slate[700],
    dark: colors.slate[300],
    description: "Color used for hover state of secondary actions.",
  },
  active: {
    light: colors.slate[800],
    dark: colors.slate[200],
    description: "Color used for pressed or active state of secondary actions.",
  },
  subtle: {
    light: colors.slate[200],
    dark: colors.slate[900],
    description:
      "Background for less prominent or disabled secondary elements.",
  },
};

const success = {
  base: {
    light: colors.emerald[500],
    dark: colors.emerald[400],
    description: "Color used to indicate success or positive actions.",
  },
  hover: {
    light: colors.emerald[600],
    dark: colors.emerald[300],
    description: "Color used for hover state of success actions.",
  },
  active: {
    light: colors.emerald[700],
    dark: colors.emerald[200],
    description: "Color used for pressed or active state of success actions.",
  },
  subtle: {
    light: colors.emerald[100],
    dark: colors.emerald[900],
    description: "Background for less prominent success indicators.",
  },
};

const warning = {
  base: {
    light: colors.amber[500],
    dark: colors.amber[400],
    description: "Color used to indicate warnings or important alerts.",
  },
  hover: {
    light: colors.amber[600],
    dark: colors.amber[300],
    description: "Color used for hover state of warning actions.",
  },
  active: {
    light: colors.amber[700],
    dark: colors.amber[200],
    description: "Color used for pressed or active state of warning actions.",
  },
  subtle: {
    light: colors.amber[100],
    dark: colors.amber[900],
    description: "Background for less prominent warning indicators.",
  },
};

const error = {
  base: {
    light: colors.red[500],
    dark: colors.red[400],
    description: "Color used to indicate errors or critical states.",
  },
  hover: {
    light: colors.red[600],
    dark: colors.red[300],
    description: "Color used for hover state of error actions.",
  },
  active: {
    light: colors.red[700],
    dark: colors.red[200],
    description: "Color used for pressed or active state of error actions.",
  },
  subtle: {
    light: colors.red[100],
    dark: colors.red[900],
    description: "Background for less prominent error indicators.",
  },
};

const info = {
  base: {
    light: colors.sky[500],
    dark: colors.sky[400],
    description: "Color used to display informational messages or states.",
  },
  hover: {
    light: colors.sky[600],
    dark: colors.sky[300],
    description: "Color used for hover state of informational actions.",
  },
  active: {
    light: colors.sky[700],
    dark: colors.sky[200],
    description:
      "Color used for pressed or active state of informational actions.",
  },
  subtle: {
    light: colors.sky[100],
    dark: colors.sky[900],
    description: "Background for less prominent informational indicators.",
  },
};

const text = {
  base: {
    light: colors.slate[600],
    dark: colors.slate[50],
    description: "Primary text color used for main content.",
  },
  secondary: {
    light: colors.slate[500],
    dark: colors.slate[100],
    description: "Secondary text color used for muted or less important text.",
  },
  contrast: {
    light: colors.slate[50],
    dark: colors.slate[900],
    description: "High-contrast text color used for emphasis.",
  },
  link: {
    light: colors.blue[600],
    dark: colors.blue[400],
    description: "Text color for clickable links.",
  },
  linkHover: {
    light: colors.blue[700],
    dark: colors.blue[300],
    description: "Hover state color for links.",
  },
};

const background = {
  base: {
    light: colors.slate[100],
    dark: colors.slate[800],
    description: "Background color for the main page or canvas.",
  },
  surface: {
    light: colors.slate[50],
    dark: colors.slate[900],
    description: "Background color for surface-level elements like cards.",
  },
  elevated: {
    light: colors.slate[300],
    dark: colors.slate[700],
    description: "Background color for elevated layers like modals.",
  },
};

const border = {
  base: {
    light: colors.slate[300],
    dark: colors.slate[700],
    description: "Default border color used for general components.",
  },
  focus: {
    light: colors.blue[600],
    dark: colors.blue[400],
    description: "Border color for focused states, ensuring accessibility.",
  },
};

export const colorTokens = {
  primary,
  secondary,
  success,
  warning,
  error,
  info,
  text,
  background,
  border,
};
