import { useContext } from "react";

import { NuiContext } from "../components";

export const useTheme = () => {
  const context = useContext(NuiContext);
  if (!context) {
    throw new Error("useTheme must be used within NuiProvider");
  }
  return context;
};
