import Group from "@/components/group";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";

// Types for ItemData and ItemGroup
export type ItemGroup = Record<string, string>;
export type ItemData = Record<string, ItemGroup>;
export type CategorizedGroups = Record<string, ItemGroup>;

type PanelProps = {
  data: ItemData;
  defaultCategory?: string;
};

// Utility function to organize items by category
const organizeItemsByCategory = (data: ItemData): CategorizedGroups => {
  const categorizedGroups: CategorizedGroups = {};

  for (const [key, value] of Object.entries(data)) {
    if (value && typeof value === "object") {
      categorizedGroups[key] = value;
    }
  }

  return { all: categorizedGroups, ...categorizedGroups };
};

const Panel = ({
  data = {},
  defaultCategory: defaultCategoryProp,
}: PanelProps) => {
  // Organize the data into categories
  const categorizedItems = organizeItemsByCategory(data);

  // Memoized keys for categories
  const categoryKeys = Object.keys(categorizedItems);
  const defaultCategory = defaultCategoryProp ?? categoryKeys[0];
  const availableCategories = categoryKeys.filter(
    (category) => category !== "all",
  );

  // State for selected category
  const [selectedCategory, setSelectedCategory] =
    useState<string>(defaultCategory);

  // Effect to reset the selected category if data changes
  useEffect(() => {
    data && setSelectedCategory(defaultCategory);
  }, [data, defaultCategory]);

  const itemsInSelectedCategory = categorizedItems[selectedCategory] ?? {};

  return (
    <>
      {/* Sidebar for category selection */}
      <Sidebar
        items={categorizedItems}
        active={selectedCategory}
        onChange={setSelectedCategory}
      />

      {/* Content area */}
      <div className="flex-1 overflow-y-auto">
        {selectedCategory !== "all" ? (
          // Display items for the selected category
          <Group
            key={selectedCategory}
            group={selectedCategory}
            items={itemsInSelectedCategory}
          />
        ) : (
          // Display items for all categories except 'all' in the default category view
          availableCategories.map((category) => (
            <Group
              key={category}
              group={category}
              items={categorizedItems[category]}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Panel;
