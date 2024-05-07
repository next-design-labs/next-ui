import { colors } from "./colors";

/* Primary tokens:  
   Use for main actions, buttons, and links requiring strong emphasis. */
const primary = {
  default: colors.blue[600], // Default primary color for buttons/links.
  hover: colors.blue[700], // Hover state for interactive elements.
  active: colors.blue[800], // Active/pressed state.
  disabled: colors.blue[300], // Disabled state.
  content: colors.white, // Text/icon color on primary backgrounds.
};

/* Neutral tokens:  
   Use for general surfaces, cards, backgrounds, and subtle elements. */
const neutral = {
  default: colors.neutral[600], // Default text or subtle interactive elements.
  background: colors.neutral[50], // Neutral background for cards/surfaces.
  content: colors.neutral[900], // High-contrast text on neutral surfaces.
  disabled: colors.neutral[300], // Disabled state for neutral elements.
};

/* Success tokens:  
   Use for positive feedback like success messages, banners, and states. */
const success = {
  default: colors.green[600], // Main success color.
  background: colors.green[50], // Success background for banners/messages.
  content: colors.green[700], // Text/icons on success backgrounds.
};

/* Warning tokens:  
   Use for caution messages, alerts, and validation warnings. */
const warning = {
  default: colors.amber[600], // Main warning color.
  background: colors.amber[50], // Warning background for messages.
  content: colors.amber[700], // Text/icons on warning backgrounds.
};

/* Error tokens:  
   Use for error states, messages, and alerts. */
const error = {
  default: colors.red[600], // Main error color.
  background: colors.red[50], // Error background for messages.
  content: colors.red[700], // Text/icons on error backgrounds.
};

/* Info tokens:  
   Use for informational banners, messages, and states. */
const info = {
  default: colors.sky[600], // Main informational color.
  background: colors.sky[50], // Background for info components.
  content: colors.sky[700], // Text/icons on informational backgrounds.
};

/* Text tokens:  
   Use for consistent typography and text colors across components. */
const text = {
  default: colors.neutral[900], // Default text color for body content.
  subtle: colors.neutral[600], // Subtle text for captions or secondary content.
  disabled: colors.neutral[400], // Disabled/inactive text color.
  link: colors.blue[600], // Default link color.
};

/* Background tokens:  
   Use for surfaces, pages, and overlays. */
const background = {
  page: colors.white, // Default background for pages.
  surface: colors.neutral[50], // Background for surfaces like cards/modals.
  overlay: "rgba(0, 0, 0, 0.5)", // Overlay for modals/dialogs.
};

/* Border tokens:  
   Use for inputs, dividers, and interactive focus states. */
const border = {
  default: colors.neutral[300], // Default border for containers, inputs, etc.
  subtle: colors.neutral[200], // Subtle border for dividers.
  focus: colors.blue[600], // Focus outline for interactive components.
};

/* Opacity tokens:  
   Use for transparency effects, layering, and overlays. */
const opacity = {
  full: "1", // Fully opaque.
  high: "0.8", // Slight transparency.
  medium: "0.6", // Medium transparency for layering.
  none: "0", // Fully transparent.
};

/* Export the revised tokens for the design system. */
export const tokens = {
  primary, // For main actions and interactive components.
  neutral, // For general surfaces and subtle elements.
  success, // For positive states and feedback.
  warning, // For caution messages and validation warnings.
  error, // For error states and messages.
  info, // For informational banners and messages.
  text, // For consistent text styles and colors.
  background, // For surfaces, pages, and overlays.
  border, // For inputs, dividers, and focus states.
  opacity, // For transparency effects and layering.
};
