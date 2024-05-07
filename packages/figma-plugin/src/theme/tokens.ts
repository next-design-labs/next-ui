import { colors } from "./colors";

// Primary: Main color for interactive and actionable elements.
const primary = {
  default: {
    value: colors.blue[600],
    usage: "Primary color for buttons, links, and interactive elements.",
  },
  hover: {
    value: colors.blue[700],
    usage: "Hover state color for primary interactive elements.",
  },
  deep: {
    value: colors.blue[800],
    usage: "Active or pressed state color for primary buttons.",
  },
  subtle: {
    value: colors.blue[200],
    usage: "Background color for disabled primary elements.",
  },
  dimmed: {
    value: colors.blue[100],
    usage: "Light background for less prominent primary elements.",
  },
};

// Secondary: Supporting color for interactive elements.
const secondary = {
  default: {
    value: colors.slate[600],
    usage: "Secondary color for buttons, links, and supporting actions.",
  },
  hover: {
    value: colors.slate[700],
    usage: "Hover state color for secondary interactive elements.",
  },
  deep: {
    value: colors.slate[800],
    usage: "Active or pressed state color for secondary buttons.",
  },
  subtle: {
    value: colors.slate[500],
    usage: "Disabled state color for secondary elements.",
  },
  dimmed: {
    value: colors.slate[300],
    usage: "Background for muted secondary components.",
  },
};

// Success: Colors for success feedback and status.
const success = {
  default: {
    value: colors.emerald[500],
    usage: "Primary success color for icons, text, and buttons.",
  },
  hover: {
    value: colors.emerald[600],
    usage: "Hover state for success buttons and elements.",
  },
  deep: {
    value: colors.emerald[700],
    usage: "Active or pressed state for success elements.",
  },
  subtle: {
    value: colors.emerald[100],
    usage: "Background color for success notifications or surfaces.",
  },
  dimmed: {
    value: colors.emerald[50],
    usage: "Soft success background for highlights.",
  },
};

// Warning: Colors for warning feedback and status.
const warning = {
  default: {
    value: colors.amber[500],
    usage: "Primary warning color for icons, text, and buttons.",
  },
  hover: {
    value: colors.amber[600],
    usage: "Hover state for warning buttons and elements.",
  },
  deep: {
    value: colors.amber[700],
    usage: "Active or pressed state for warning elements.",
  },
  subtle: {
    value: colors.amber[100],
    usage: "Background color for warning notifications or surfaces.",
  },
  dimmed: {
    value: colors.amber[50],
    usage: "Soft warning background for highlights.",
  },
};

// Error: Colors for error feedback and status.
const error = {
  default: {
    value: colors.red[600],
    usage: "Primary error color for icons, text, and buttons.",
  },
  hover: {
    value: colors.red[700],
    usage: "Hover state for error buttons and elements.",
  },
  deep: {
    value: colors.red[800],
    usage: "Active or pressed state for error elements.",
  },
  subtle: {
    value: colors.red[100],
    usage: "Background color for error notifications or surfaces.",
  },
  dimmed: {
    value: colors.red[50],
    usage: "Soft error background for highlights.",
  },
};

// Info: Colors for informational feedback and status.
const info = {
  default: {
    value: colors.sky[500],
    usage: "Primary info color for icons, text, and buttons.",
  },
  hover: {
    value: colors.sky[600],
    usage: "Hover state for info buttons and elements.",
  },
  deep: {
    value: colors.sky[700],
    usage: "Active or pressed state for info elements.",
  },
  subtle: {
    value: colors.sky[100],
    usage: "Background color for info notifications or surfaces.",
  },
  dimmed: {
    value: colors.sky[50],
    usage: "Soft info background for highlights.",
  },
};

// Text: Colors for typography and icons.
const text = {
  default: {
    value: colors.slate[600],
    usage: "Default text color for body and paragraph text.",
  },
  secondary: {
    value: colors.slate[500],
    usage: "Muted text color for secondary content or descriptions.",
  },
  contrast: {
    value: colors.slate[50],
    usage: "High-contrast text color for dark backgrounds.",
  },
  link: {
    value: colors.blue[600],
    usage: "Default color for hyperlinks.",
  },
  linkHover: {
    value: colors.blue[700],
    usage: "Hover state color for hyperlinks.",
  },
};

// Background: Colors for surfaces and backgrounds.
const background = {
  surface: {
    value: colors.slate[50],
    usage: "Neutral background color for cards and modals.",
  },
  page: {
    value: colors.slate[100],
    usage: "Default page background color.",
  },
  subtle: {
    value: colors.slate[200],
    usage: "Background for inactive or disabled components.",
  },
  deep: {
    value: colors.slate[300],
    usage: "Selected or active background for elements.",
  },
  neutral: {
    value: colors.neutral[200],
    usage: "Subtle background for dividers and form inputs.",
  },
  overlay: {
    value: "rgba(0, 0, 0, 0.5)",
    usage: "Overlay background for modals and dialogs.",
  },
};

// Border: Colors for outlines, borders, and separators.
const border = {
  default: {
    value: colors.slate[300],
    usage: "Default border color for inputs and containers.",
  },
  subtle: {
    value: colors.slate[200],
    usage: "Lighter border for subtle dividers.",
  },
  strong: {
    value: colors.slate[500],
    usage: "Stronger border for emphasized elements.",
  },
  neutral: {
    value: colors.neutral[400],
    usage: "Border for neutral dividers and components.",
  },
  focus: {
    value: colors.blue[600],
    usage: "Focus outline color for form elements.",
  },
  success: {
    value: colors.emerald[200],
    usage: "Border color for success elements.",
  },
  warning: {
    value: colors.amber[200],
    usage: "Border color for warning elements.",
  },
  error: {
    value: colors.red[200],
    usage: "Border color for error elements.",
  },
  info: {
    value: colors.sky[200],
    usage: "Border color for informational elements.",
  },
};

// Opacity: Transparency levels for overlays and UI states.
const opacity = {
  full: {
    value: "1",
    usage: "Fully opaque elements.",
  },
  high: {
    value: "0.8",
    usage: "Semi-transparent highlights or overlays.",
  },
  medium: {
    value: "0.6",
    usage: "Transparency for disabled states or overlays.",
  },
  low: {
    value: "0.2",
    usage: "Subtle transparent highlights or shadows.",
  },
  none: {
    value: "0",
    usage: "Fully transparent elements.",
  },
};

export const tokens = {
  primary,
  secondary,
  success,
  warning,
  error,
  info,
  text,
  background,
  border,
  opacity,
};
