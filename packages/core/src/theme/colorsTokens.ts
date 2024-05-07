import { colors } from "./colors";

/* Primary tokens are used for main actions, buttons, and links. 
   They provide strong emphasis and should be reserved for primary user interactions. */
export const primary = {
  default: colors.blue[600], // Primary color for buttons and links
  hover: colors.blue[700], // Hover state for primary interactive elements
  active: colors.blue[800], // Active/pressed state for primary elements
  content: colors.white, // Text color on primary backgrounds
  dimmed: colors.blue[300], // Dimmed or disabled primary color
  border: colors.blue[500], // Border color for primary outlined components
};

/* Neutral tokens are used for text, backgrounds, and borders that don't require emphasis.
   Ideal for cards, containers, surface elements, and general UI components. */
export const neutral = {
  default: colors.neutral[600], // Default neutral text or icons
  hover: colors.neutral[700], // Hover state for neutral elements
  active: colors.neutral[800], // Active (pressed) state
  background: colors.neutral[50], // Default surface background (e.g., cards, containers)
  border: colors.neutral[300], // Neutral border for subtle UI elements
  content: colors.neutral[900], // High-contrast text on neutral backgrounds
  dimmed: colors.neutral[400], // Muted or disabled text and icons
};

/* Feedback tokens are used for states like success, warning, error, and info.
   They communicate feedback to users through visuals like banners, buttons, or badges. */
export const success = {
  default: colors.green[600], // Main success color
  hover: colors.green[700], // Hover state for success elements
  active: colors.green[800], // Activte state for success elements
  content: colors.white, // Text color on success backgrounds
  background: colors.green[50], // Light success background
  dimmed: colors.green[300], // Muted success color for subtle states
};

export const warning = {
  default: colors.amber[600], // Main warning color
  hover: colors.amber[700], // Hover state for warning elements
  active: colors.amber[800], // Active state
  content: colors.white, // Text color on warning backgrounds
  background: colors.amber[50], // Light warning background
  dimmed: colors.amber[300], // Muted warning color
};

export const error = {
  default: colors.red[600], // Main error color
  hover: colors.red[700], // Hover state for error elements
  active: colors.red[800], // Active state
  content: colors.white, // Text color on error backgrounds
  background: colors.red[50], // Light error background
  dimmed: colors.red[300], // Muted error color
};

export const info = {
  default: colors.sky[600], // Main info color
  hover: colors.sky[700], // Hover state for info elements
  active: colors.sky[800], // Active state
  content: colors.white, // Text color on informational backgrounds
  background: colors.sky[50], // Light info background
  dimmed: colors.sky[300], // Muted info color
};

/* Text tokens define consistent text colors for different states and contexts. */
export const text = {
  default: colors.neutral[900], // Default text color for body content
  subtle: colors.neutral[600], // Less prominent text (e.g., captions, secondary)
  disabled: colors.neutral[400], // Disabled text
  contrast: colors.white, // High-contrast text for dark or colored backgrounds
  link: colors.blue[600], // Default link color
  linkHover: colors.blue[700], // Hover state for links
};

/* Background tokens define colors for surfaces, overlays, and interactive backgrounds. */
export const background = {
  page: colors.white, // Default page background
  surface: colors.neutral[50], // Background for surfaces like cards and modals
  hover: colors.neutral[100], // Hover background for interactive components
  active: colors.neutral[200], // Active background for selected items
  disabled: colors.neutral[300], // Background for disabled elements
  overlay: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay for modals
};

/* Border tokens define consistent border colors for containers, inputs, and dividers. */
export const border = {
  default: colors.neutral[300], // Default border color for cards and containers
  subtle: colors.neutral[200], // Light borders for subtle dividers
  strong: colors.neutral[500], // Stronger borders for emphasis
  focus: colors.blue[600], // Focus state for inputs, buttons, etc.
  success: success.default, // Border color for success states
  warning: warning.default, // Border color for warning states
  error: error.default, // Border color for error states
};

/* Opacity tokens define levels of transparency for overlays, disabled states, etc. */
export const opacity = {
  full: "1", // Fully opaque
  high: "0.8", // Slight transparency
  medium: "0.6", // Medium transparency
  low: "0.4", // Low transparency
  subtle: "0.2", // Very subtle transparency
  none: "0", // Fully transparent
};

export const tokens = {
  primary,
  neutral,
  success,
  warning,
  error,
  info,
  text,
  background,
  border,
  opacity,
};
