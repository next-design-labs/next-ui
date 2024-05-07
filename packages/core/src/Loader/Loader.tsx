import { type NuiColorMode, themeVars } from "@next-design-labs/next-ui-styles";
import { type VariantProps, cva, cx } from "../utils";

// Fix NuiLoaderColor type by merging the keys of NuiColorMode and themeVars.colors
export type NuiLoaderColor = keyof NuiColorMode | keyof typeof themeVars.colors;

const barStyle = (
  baseColor: NuiLoaderColor,
  delay: number,
): React.CSSProperties => {
  const paletteColor =
    themeVars.colors[baseColor as keyof typeof themeVars.colors]?.["100"];
  const tokenColor = themeVars[baseColor as keyof typeof themeVars] as string;
  const backgroundColor = paletteColor || tokenColor || themeVars.primary;

  return {
    backgroundColor,
    animation: `scaleAnimation 1s ease-in-out ${delay}s infinite`,
  };
};

const loaderVariants = cva({
  base: cx("flex gap-.5"),
  variants: {
    /** Use the size prop to change the size of the loader. */
    size: {
      sm: "[&>span]:h-4 [&>span]:w-4",
      md: "[&>span]:h-1.5 [&>span]:w-.5",
      lg: "[&>span]:h-6 [&>span]:w-7",
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
