import { themeVars } from "@next-design-labs/next-ui-styles";
import { type VariantProps, cva, cx } from "../utils";

export type NuiLoaderColor = keyof typeof themeVars.colors;

const barStyle = (
  color: NuiLoaderColor,
  delay: number,
): React.CSSProperties => {
  const { colors } = themeVars;
  const themeColor = colors[color];

  const backgroundColor =
    typeof themeColor === "object" && "100" in themeColor
      ? themeColor["100"]
      : typeof themeColor === "string"
        ? themeColor
        : colors.primary;

  return {
    backgroundColor,
    animation: `scaleAnimation 1s ease-in-out ${delay}s infinite`,
  };
};

const loaderVariants = cva({
  base: cx("flex gap-.5"),
  variants: {
    /** Adjust loader size based on the size prop */
    size: {
      sm: "[&>span]:h-1.2 [&>span]:w-.5",
      md: "[&>span]:h-1.5 [&>span]:w-.5",
      lg: "[&>span]:h-2.5 [&>span]:w-.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface NuiLoaderProps extends VariantProps<typeof loaderVariants> {
  /** Use the color prop to change the color of the loader. */
  color?: NuiLoaderColor;
  /** Add a custom class to the loader. */
  className?: string;
}

export const NuiLoader = (props: NuiLoaderProps) => {
  const { color = "blue", className } = props;

  return (
    <span className={cx(loaderVariants(props), className)}>
      <span style={barStyle(color, 0.5)} />
      <span style={barStyle(color, 0.6)} />
      <span style={barStyle(color, 0.7)} />
      <span style={barStyle(color, 0.8)} />
    </span>
  );
};
