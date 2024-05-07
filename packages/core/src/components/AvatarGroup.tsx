import { Children, forwardRef } from "react";
import { NuiAvatar } from "./Avatar";

export type NuiAvatarGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Maximum number of avatars to show */
  max?: number;
  /** Size of the avatars */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Border radius of the avatars */
  radius?: "none" | "sm" | "md" | "lg" | "full";
  /** Children should be Avatar components */
  children: React.ReactNode;
};

export const NuiAvatarGroup = forwardRef<HTMLDivElement, NuiAvatarGroupProps>(
  (
    { max = 5, size = "md", radius = "full", children, className, ...props },
    ref,
  ) => {
    const avatars = Children.toArray(children);
    const totalAvatars = avatars.length;
    const visibleAvatars = max ? avatars.slice(0, max) : avatars;
    const remainingAvatars = Math.max(totalAvatars - max, 0);

    return (
      <div
        ref={ref}
        className={`flex items-center -space-x-2 ${className || ""}`}
        {...props}
      >
        {visibleAvatars.map((avatar, index) => (
          <div key={index} className="relative inline-block">
            {avatar}
          </div>
        ))}
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
