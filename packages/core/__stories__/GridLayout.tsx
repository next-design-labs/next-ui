import { NuiTypography } from "@next-design-labs/next-ui-core";
import type { StoryContext, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

type Section = {
  name: string;
  component?: StoryObj;
};

type GridLayoutProps = {
  sections: Section[];
  columns?: number;
};

/**
 * A responsive grid layout to display sections with optional components.
 */
export const GridLayout = ({ sections, columns = 3 }: GridLayoutProps) => {
  // const totalRows = Math.ceil(sections.length / columns);
  const [currentColumns, setCurrentColumns] = useState(columns);
  const totalRows = Math.ceil(sections.length / currentColumns);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;

      if (width >= 1280) {
        setCurrentColumns(columns); // xl: Use the provided column count
      } else if (width >= 768) {
        setCurrentColumns(Math.min(columns, 2)); // md: Up to 2 columns
      } else {
        setCurrentColumns(1); // Default: 1 column
      }
    };

    updateColumns(); // Initial update
    window.addEventListener("resize", updateColumns);

    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, [columns]);

  return (
    <div className={"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3"}>
      {sections.map((section, index) => {
        const rowIndex = Math.floor(index / columns);
        const columnIndex = index % columns;

        // Determine if the item is in the last column or last row
        const isLastColumn = columnIndex === currentColumns - 1;
        const isLastRow = rowIndex === totalRows - 1;

        // Compose class names for dynamic borders
        const borderClasses = [
          "relative aspect-square border-neutral flex items-center justify-center p-5",
          isLastColumn ? "" : "border-r",
          isLastRow ? "" : "border-b",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div key={`${section.name}-${index}`} className={borderClasses}>
            <NuiTypography
              variant="captionLabel"
              className="absolute top-3 left-3"
            >
              {section.name}
            </NuiTypography>
            <div className="flex flex-wrap justify-center gap-3">
              {section.component?.render
                ? section.component.render({}, {} as StoryContext)
                : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};
