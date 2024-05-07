const solid = {
  text: "textColor",
  background: "baseColor",
  border: "baseColor",
  hover: "darken(10)",
  hoverText: "textColor",
  active: "darken(15)",
  activeText: "textColor",
  selected: "darken(20)",
  selectedHover: "darken(25)",
  selectedText: "textColor",
};

const outline = {
  text: "baseColor",
  background: "transparent",
  border: "baseColor",
  hover: "alpha(10)",
  hoverText: "baseColor",
  active: "alpha(20)",
  activeText: "darken(10)",
  selected: "baseColor",
  selectedHover: "baseColor",
  selectedText: "textColor",
};

const ghost = {
  text: "baseColor",
  background: "transparent",
  border: "transparent",
  hover: "alpha(10)",
  hoverText: "baseColor",
  active: "alpha(20)",
  activeText: "darken(10)",
  selected: "alpha(30)",
  selectedHover: "alpha(40)",
  selectedText: "darken(20)",
};

const link = {
  text: "baseColor",
  background: "transparent",
  border: "transparent",
  hover: "transparent",
  hoverText: "baseColor",
  active: "transparent",
  activeText: "darken(15)",
  selected: "alpha(20)",
  selectedHover: "alpha(30)",
  selectedText: "darken(20)",
};

const semantic = {
  text: "themeColor[700]",
  background: "themeColor[50]",
  border: "themeColor[200]",
  hover: "themeColor[100]",
  hoverText: "themeColor[700]",
  active: "",
  activeText: "",
  selected: "",
  selectedHover: "",
  selectedText: "",
};

const categorical = {
  text: "themeColor[600]",
  background: "themeColor[50]",
  border: "themeColor[200]",
  hover: "themeColor[100]",
  hoverText: "themeColor[600]",
  active: "",
  activeText: "",
  selected: "",
  selectedHover: "",
  selectedText: "",
};

export const variantTokens = {
  solid,
  outline,
  ghost,
  link,
  semantic,
  categorical,
};
