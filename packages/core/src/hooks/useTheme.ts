import { useContext } from "react";

import { NuiThemeContext } from "../Provider";

export const useTheme = () => {
  const context = useContext(NuiThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within NuiThemeProvider");
  }
  return context;
};
