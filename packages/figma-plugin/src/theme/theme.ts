// Spacing: Consistent spacing for padding, margins, and gaps.
export const spacing = {
  base: {
    value: "0.5rem",
    usage: "Base unit for spacing calculations and small gaps.",
  },
  xs: {
    value: "0.5rem",
    usage: "Extra small spacing: tight padding or margins.",
  },
  sm: {
    value: "1rem",
    usage: "Small spacing: between inputs, cards, or buttons.",
  },
  md: {
    value: "1.5rem",
    usage: "Medium spacing: moderate gaps between sections.",
  },
  lg: {
    value: "3rem",
    usage: "Large spacing: layout padding or section separation.",
  },
  xl: {
    value: "5rem",
    usage: "Extra large spacing: significant layout separation.",
  },
};

// Border Radii: Rounded corners for components.
export const radii = {
  none: {
    value: "0",
    usage: "No rounding for sharp edges.",
  },
  xs: {
    value: "0.125rem",
    usage: "Extra small radius: minimal rounding for inputs or buttons.",
  },
  sm: {
    value: "0.25rem",
    usage: "Small radius: default rounding for components.",
  },
  md: {
    value: "0.375rem",
    usage: "Medium radius: moderate rounding for cards and modals.",
  },
  lg: {
    value: "0.5rem",
    usage: "Large radius: significant rounding for containers.",
  },
  xl: {
    value: "1rem",
    usage: "Extra large radius: dialogs or larger surfaces.",
  },
  full: {
    value: "9999px",
    usage: "Fully rounded: pill shapes for chips or badges.",
  },
  circle: {
    value: "50%",
    usage: "Circular shape: avatars, icons, and circular buttons.",
  },
};

// Breakpoints: Responsive design thresholds for screen sizes.
export const breakpoints = {
  xs: {
    value: "0",
    usage: "Extra small devices: very small screens or phones.",
  },
  sm: {
    value: "600px",
    usage: "Small devices: phones and small tablets.",
  },
  md: {
    value: "960px",
    usage: "Medium devices: tablets and small desktops.",
  },
  lg: {
    value: "1270px",
    usage: "Large devices: standard desktops and larger tablets.",
  },
  xl: {
    value: "1920px",
    usage: "Extra large devices: large monitors or TV screens.",
  },
};

// Font Sizes: Scaled sizes for headings, body text, and labels.
export const fontSize = {
  xs: {
    value: "0.625rem",
    usage: "Extra small text: captions, tooltips, and annotations.",
  },
  sm: {
    value: "0.75rem",
    usage: "Small text: form labels, meta text, and secondary content.",
  },
  base: {
    value: "0.875rem",
    usage: "Default text size for body content.",
  },
  lg: {
    value: "1rem",
    usage: "Large text: used for emphasized body content or small headings.",
  },
  xl: {
    value: "1.25rem",
    usage: "Extra large text: suitable for subheadings.",
  },
  "2xl": {
    value: "1.5rem",
    usage: "Medium headings or highlighted sections.",
  },
  "3xl": {
    value: "2rem",
    usage: "Large headings for page sections.",
  },
  "4xl": {
    value: "2.625rem",
    usage: "Extra large headings for main titles.",
  },
};

// Line Heights: Vertical spacing for improved text readability.
export const lineHeight = {
  none: {
    value: "1.3125rem",
    usage: "Tight line height for compact text layouts.",
  },
  xs: {
    value: "1rem",
    usage: "Extra tight line height for small captions or tooltips.",
  },
  sm: {
    value: "1.125rem",
    usage: "Small line height for labels and meta text.",
  },
  base: {
    value: "1.3125rem",
    usage: "Default line height for body text readability.",
  },
  lg: {
    value: "1.5rem",
    usage: "Slightly loose line height for larger text blocks.",
  },
  xl: {
    value: "1.875rem",
    usage: "Loose line height for small headings or emphasized text.",
  },
  "2xl": {
    value: "2.25rem",
    usage: "Medium line height for headings or titles.",
  },
  "3xl": {
    value: "3rem",
    usage: "Large line height for main headings.",
  },
  "4xl": {
    value: "3.9375rem",
    usage: "Very large line height for prominent headings.",
  },
};

// Font Weights: Levels of text thickness for emphasis and style.
export const fontWeight = {
  hairline: {
    value: "100",
    usage: "Ultra-thin weight for minimal emphasis.",
  },
  thin: {
    value: "200",
    usage: "Thin weight for subtle text.",
  },
  light: {
    value: "300",
    usage: "Light weight for less prominent content.",
  },
  normal: {
    value: "400",
    usage: "Standard weight for body text.",
  },
  medium: {
    value: "500",
    usage: "Medium weight for moderate emphasis.",
  },
  semibold: {
    value: "600",
    usage: "Semi-bold weight for strong emphasis.",
  },
  bold: {
    value: "700",
    usage: "Bold weight for headings and highlighted text.",
  },
  extrabold: {
    value: "800",
    usage: "Extra bold weight for impactful headings.",
  },
  black: {
    value: "900",
    usage: "Heaviest weight for maximum emphasis.",
  },
};

// Fonts: Font families for headings, body text, and code.
export const fonts = {
  heading: {
    value:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    usage: "Primary font family for headings.",
  },
  body: {
    value:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    usage: "Primary font family for body text.",
  },
  mono: {
    value:
      '"Fira Mono", "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    usage: "Monospace font family for code and technical content.",
  },
};

// Shadows: Levels of depth and elevation for UI components.
export const shadows = {
  xs: {
    value: "0 1px 2px rgba(0, 0, 0, 0.05)",
    usage: "Subtle shadow for small elements like inputs or buttons.",
  },
  sm: {
    value: "0 2px 4px rgba(0, 0, 0, 0.1)",
    usage: "Light shadow for elevated cards or small modals.",
  },
  md: {
    value: "0 4px 8px rgba(0, 0, 0, 0.15)",
    usage: "Medium shadow for dropdowns or larger components.",
  },
  lg: {
    value: "0 8px 16px rgba(0, 0, 0, 0.2)",
    usage: "Strong shadow for modals, overlays, or emphasized elements.",
  },
};

// Z-Index: Stacking order for overlapping components.
export const zIndex = {
  hide: {
    value: "-1",
    usage: "Hidden or behind other elements.",
  },
  base: {
    value: "0",
    usage: "Default stacking order for content.",
  },
  dropdown: {
    value: "1000",
    usage: "Dropdown menus and popovers.",
  },
  sticky: {
    value: "1100",
    usage: "Sticky elements like headers.",
  },
  overlay: {
    value: "1300",
    usage: "Overlays and semi-transparent layers.",
  },
  modal: {
    value: "1400",
    usage: "Modal dialogs and high-priority content.",
  },
  tooltip: {
    value: "1800",
    usage: "Tooltips or contextual popups.",
  },
  max: {
    value: "2147483647",
    usage: "Maximum z-index for critical overlays.",
  },
};

export const theme = {
  spacing,
  radii,
  breakpoints,
  fontSize,
  lineHeight,
  fontWeight,
  fonts,
  shadows,
  zIndex,
};
