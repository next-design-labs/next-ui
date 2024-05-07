import { Children, forwardRef, isValidElement } from "react";

import { useUUID } from "../hooks";
import { NuiAvatar } from "./Avatar";

export type NuiAvatarGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Maximum number of avatars to show */
  max?: number; // Sets a limit on the number of avatars displayed
  /** Size of the avatars */
  size?: "xs" | "sm" | "md" | "lg" | "xl"; // Ensures all avatars in the group are consistently sized
  /** Border radius of the avatars */
  radius?: "none" | "sm" | "md" | "lg" | "full"; // Defines the shape (circle, rounded, square) of each avatar
  /** Children should be Avatar components */
  children: React.ReactNode; // Accepts a list of child components, typically NuiAvatar
};

/**
 * Displays a group of avatars, limiting the number of visible avatars if `max` is provided.
 * It handles hidden avatars by showing a fallback with the count of remaining avatars.
 */
export const NuiAvatarGroup = forwardRef<HTMLDivElement, NuiAvatarGroupProps>(
  (
    { max = 5, size = "md", radius = "full", children, className, ...props },
    ref,
  ) => {
    // Converts children into a flat array for processing
    const avatars = Children.toArray(children);

    // Total number of avatar elements in the group
    const totalAvatars = avatars.length;

    // Determine the avatars to display based on the `max` prop
    const visibleAvatars = max ? avatars.slice(0, max) : avatars;

    // Calculate the number of remaining avatars not displayed
    const remainingAvatars = Math.max(totalAvatars - max, 0);

    return (
      <div
        ref={ref}
        className={`flex items-center -space-x-2 ${className || ""}`}
        {...props}
      >
        {/* Render each visible avatar */}
        {visibleAvatars.map((avatar) =>
          isValidElement(avatar) ? (
            <div key={useUUID()} className="relative inline-block">
              {avatar} {/* Display the avatar */}
            </div>
          ) : null,
        )}
        {/* Render a fallback avatar if there are hidden avatars */}
        {remainingAvatars > 0 && (
          <NuiAvatar
            size={size}
            radius={radius}
            variant="solid"
            color="slate"
            fallback={`+${remainingAvatars}`}
          />
        )}
      </div>
    );
  },
);

NuiAvatarGroup.displayName = "NuiAvatarGroup";
