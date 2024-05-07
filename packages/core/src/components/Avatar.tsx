import { forwardRef } from "react";
import { useComponent } from "../hooks";
import { avatarRecipe } from "../recipes";
import type { NuiRecipeProps } from "../types";
import { cx } from "../utils";

export type NuiAvatarProps = React.HTMLAttributes<HTMLDivElement> &
  NuiRecipeProps<typeof avatarRecipe> & {
    /** URL of the avatar image. */
    src?: string;
    /** Alternative text for the avatar image for accessibility. */
    alt?: string;
    /** Fallback text to display when the image fails to load or no `src` is provided. */
    fallback?: string;
    /** Whether to show a border around the avatar. */
    bordered?: boolean;
    /** Size of the avatar. */
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    /** Border radius of the avatar. */
    radius?: "none" | "sm" | "md" | "lg" | "full";
    /** Visual style of the avatar (e.g., solid or outline). */
    variant?: "solid" | "outline";
    /** Color scheme for the avatar. */
    color?: string;
  };

/**
 * A customizable avatar component for displaying user images or initials.
 * Supports fallback text, different sizes, border radii, and color schemes.
 */
export const NuiAvatar = forwardRef<HTMLDivElement, NuiAvatarProps>(
  (
    {
      src,
      alt,
      fallback,
      bordered = false,
      size = "md",
      radius = "full",
      variant = "solid",
      color,
      className,
      ...props
    },
    ref,
  ) => {
    // Extract component-specific classes and data attributes
    const { baseStyles, dataAttributes } = useComponent(
      "Avatar",
      avatarRecipe,
      { bordered, size, radius, variant, color, ...props },
    );

    /**
     * Generates fallback text to display when the image fails to load or no `src` is provided.
     * - Uses the first two characters of the `fallback` string (if provided).
     * - Defaults to the first two characters of the `alt` string.
     * - Falls back to "??" if neither is available.
     */
    const generateFallback = () => {
      if (fallback) return fallback.slice(0, 2).toUpperCase();
      return alt?.slice(0, 2).toUpperCase() || "??";
    };

    /**
     * Handles errors when the image fails to load.
     * - Hides the broken image by setting its display to "none".
     */
    const handleImageError = (
      event: React.SyntheticEvent<HTMLImageElement>,
    ) => {
      const target = event.target as HTMLImageElement;
      target.style.display = "none";
    };

    return (
      <div
        ref={ref}
        className={cx(baseStyles, className)}
        {...dataAttributes}
        aria-label={src ? alt : generateFallback()}
      >
        {/* Render the avatar image if a source URL is provided */}
        {src ? (
          <img
            src={src}
            alt={alt || "Avatar image"}
            className="h-full w-full object-cover"
            onError={handleImageError}
          />
        ) : (
          // Render fallback text if no image source is available
          <span className="text-inherit">{generateFallback()}</span>
        )}
      </div>
    );
  },
);

NuiAvatar.displayName = "NuiAvatar";
