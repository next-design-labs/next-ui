import { forwardRef } from "react";

import { useComponent } from "../hooks";
import { tagRecipe } from "../recipes";
import type { NuiVariantProps } from "../types";
import { cx } from "../utils";

export type NuiTagProps = React.HTMLAttributes<HTMLDivElement> &
  NuiVariantProps<typeof tagRecipe> & {
    onRemove?: () => void;
    /** Initial color to generate accessible colors from. */
    color?: string;
  };

/**
 * Buttons allow users to make choices and take actions.
 */
export const NuiTag = forwardRef<HTMLDivElement, NuiTagProps>(
  ({ className, children, ...props }, ref) => {
    const { componentClasses, componentProps, dataAttributes } = useComponent(
      "Tag",
      tagRecipe,
      props,
    );

    const { removable, onRemove } = componentProps;

    return (
      <div
        ref={ref}
        className={cx(componentClasses.base, className)}
        {...dataAttributes}
      >
        <span>{children}</span>
        {removable && (
          <button type="button" onClick={onRemove}>
            ×
          </button>
        )}
      </div>
    );
  },
);

NuiTag.displayName = "NuiTag";
