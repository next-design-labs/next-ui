import { forwardRef } from "react";
import { useComponent } from "../hooks/useComponent";
import { avatarRecipe } from "../recipes";
import type { NuiVariantProps } from "../types";
import { cx } from "../utils";

export type NuiAvatarProps = React.HTMLAttributes<HTMLDivElement> &
  NuiVariantProps<typeof avatarRecipe> & {
    /** Source URL for the avatar image */
    src?: string;
    /** Alt text for the avatar image */
    alt?: string;
    /** Fallback text to show when image fails to load or no src provided */
    fallback?: string;
    /** Whether to show a border */
    bordered?: boolean;
    /** Size of the avatar */
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    /** Border radius of the avatar */
    radius?: "none" | "sm" | "md" | "lg" | "full";
    /** Visual style variant */
    variant?: "solid" | "outline";
    /** Color scheme */
    color?: string;
  };

export const NuiAvatar = forwardRef<HTMLDivElement, NuiAvatarProps>(
  ({ src, alt, fallback, className, ...props }, ref) => {
    const { componentClasses, dataAttributes } = useComponent(
      "Avatar",
      avatarRecipe,
      props,
    );

    const getFallback = () => {
      if (fallback) {
        return fallback.slice(0, 2).toUpperCase();
      }
      return alt?.slice(0, 2).toUpperCase() || "??";
    };

    return (
      <div
        ref={ref}
        className={cx(componentClasses.base, className)}
        {...dataAttributes}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "";
            }}
          />
        ) : (
          <span className="text-inherit">{getFallback()}</span>
        )}
      </div>
    );
  },
);

NuiAvatar.displayName = "NuiAvatar";
