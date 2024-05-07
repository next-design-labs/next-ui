import { forwardRef } from "react";

import { useComponent } from "../hooks";
import { tagRecipe } from "../recipes";
import type { NuiRecipeProps } from "../types";
import { cx } from "../utils";

export type NuiTagProps = React.HTMLAttributes<HTMLDivElement> &
  NuiRecipeProps<typeof tagRecipe> & {
    /** Function triggered when the remove button is clicked. */
    onRemove?: () => void;
    /** Base color for styling the tag. */
    color?: string;
  };

/**
 * A compact element for displaying labels, categories, or attributes.
 * Includes optional functionality for tag removal with a callback.
 */
export const NuiTag = forwardRef<HTMLDivElement, NuiTagProps>(
  ({ className, children, onRemove, ...props }, ref) => {
    const { baseStyles, baseProps, dataAttributes } = useComponent(
      "Tag",
      tagRecipe,
      props,
    );

    const { removable } = baseProps as {
      removable?: boolean;
    };

    return (
      <div ref={ref} className={cx(baseStyles, className)} {...dataAttributes}>
        {/* Tag content */}
        <span>{children}</span>
        {/* Optional remove button */}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove tag"
            className="ml-2"
          >
            ×
          </button>
        )}
      </div>
    );
  },
);

NuiTag.displayName = "NuiTag";
