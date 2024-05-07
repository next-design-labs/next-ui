import { colors } from "../theme/colors";
import type { NuiRecipeProps } from "../types";

import { cx } from "../utils";

const barStyle = (color = "white", delay = 0.5): React.CSSProperties => {
  const themeColor = colors[color as keyof typeof colors];

  const backgroundColor =
    typeof themeColor === "object" && "100" in themeColor
      ? themeColor["100"]
      : typeof themeColor === "string"
        ? themeColor
        : colors.neutral["100"];

  return {
    backgroundColor,
    animation: `scaleAnimation 1s ease-in-out ${delay}s infinite`,
  };
};

const loaderStyles = {
  base: ["flex gap-.5"],
  variants: {
    /** Adjust loader size based on the size prop */
    size: {
      sm: "[&>span]:h-1.2 [&>span]:w-.5",
      md: "[&>span]:h-1.5 [&>span]:w-.5",
      lg: "[&>span]:h-2.5 [&>span]:w-.5",
    },
  },
  defaultProps: {
    size: "md",
  },
};

export type LoaderProps = NuiRecipeProps<typeof loaderStyles> & {
  /** Use the color prop to change the color of the loader. */
  color?: string;
  /** Add a custom class to the loader. */
  className?: string;
  /** Accessible label for the loader. */
  "aria-label"?: string;
};

export const Loader = (props: LoaderProps) => {
  const { color, className, "aria-label": ariaLabel = "Loading" } = props;

  return (
    <output aria-live="polite" aria-label={ariaLabel} className={cx(className)}>
      <span style={barStyle(color, 0.5)} />
      <span style={barStyle(color, 0.6)} />
      <span style={barStyle(color, 0.7)} />
      <span style={barStyle(color, 0.8)} />
    </output>
  );
};
