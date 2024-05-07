import { theme } from "@next-design-labs/next-ui-styles";

import { type VariantProps, cva, cx } from "../utils/cva";

export type HvLoaderColor = keyof typeof theme.colors;

const barStyle = (
  color: HvLoaderColor,
  delay: number
): React.CSSProperties => ({
  backgroundColor: theme.colors[color],
  animation: `scaleAnimation 1s ease-in-out ${delay}s infinite`,
});

const loaderVariants = cva({
  base: cx("flex gap-.5"),
  variants: {
    /** Use the size prop to change the size of the loader. */
    size: {
      sm: "[&>span]:h-3 [&>span]:w-3",
      md: "[&>span]:h-1 [&>span]:w-.25",
      lg: "[&>span]:h-6 [&>span]:w-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface HvLoaderProps extends VariantProps<typeof loaderVariants> {
  /** Use the color prop to change the color of the loader. */
  color?: HvLoaderColor;
  /** Add a custom class to the loader. */
  className?: string;
}

export const HvLoader = (props: HvLoaderProps) => {
  const { color = "atmo1", className } = props;

  return (
    <span className={cx(loaderVariants(props), className)}>
      <span style={barStyle(color, 0.5)} />
      <span style={barStyle(color, 0.6)} />
      <span style={barStyle(color, 0.7)} />
      <span style={barStyle(color, 0.8)} />
    </span>
  );
};
