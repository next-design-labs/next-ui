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
    const { baseClasses, baseProps, dataAttributes } = useComponent(
      "Tag",
      tagRecipe,
      props,
    );

    const { removable, onRemove } = baseProps as {
      removable?: boolean;
      onRemove?: () => void;
    };

    return (
      <div ref={ref} className={cx(baseClasses, className)} {...dataAttributes}>
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
