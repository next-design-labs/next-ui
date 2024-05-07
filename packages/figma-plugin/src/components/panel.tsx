import Group from "@/components/group";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";

type ItemGroup = Record<string, string>;
type ItemData = Record<string, ItemGroup | string>;

type PanelProps = {
  data: ItemData;
  defaultCategory?: string;
};

const organizeItemsByCategory = (data: ItemData) => {
  const baseGroup: ItemGroup = {};
  const categorizedGroups: Record<string, ItemGroup> = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "object" && !Array.isArray(value)) {
      categorizedGroups[key] = value;
    } else {
      baseGroup[key] = value as string;
    }
  }

  // Return combined object, including `base` only if it has items
  const result =
    Object.keys(baseGroup).length > 0
      ? { base: baseGroup, ...categorizedGroups }
      : categorizedGroups;

  const all = Object.assign({}, { all: { ...result } }, result);

  return all;
};

const Panel = ({ data }: PanelProps) => {
  // Group items by category
  const categorizedItems = organizeItemsByCategory(data);

  const defaultCategory = Object.keys(categorizedItems)[0];
  const availableCategories = Object.keys(categorizedItems).filter(
    (category) => category !== "all",
  );

  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  const itemsInSelectedCategory = categorizedItems[selectedCategory] || {};
  const isDefaultCategorySelected = selectedCategory === defaultCategory;

  useEffect(() => {
    if (data) {
      setSelectedCategory(defaultCategory);
    }
  }, [data, defaultCategory]);

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
        {!isDefaultCategorySelected ? (
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
