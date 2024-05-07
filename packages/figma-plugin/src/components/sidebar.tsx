import { capitalize } from "@/lib/utils";

type Items = Record<string, Record<string, unknown>>;

type SidebarProps = {
  items: Items;
  active: string | null;
  onChange: (group: string) => void;
};

const countItems = (obj: Record<string, unknown>): number => {
  let count = 0;

  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      count += countItems(obj[key] as Record<string, unknown>);
    } else {
      count += 1;
    }
  }

  return count;
};

const Sidebar = ({ items, active, onChange }: SidebarProps) => {
  return (
    <aside className="w-[170px] border-r overflow-y-auto">
      <nav>
        <ul>
          {Object.entries(items).map(([group, groupItems]) => (
            <li key={group} className="">
              <button
                type="button"
                onClick={() => onChange(group)}
                className={`text-xs w-full px-4 py-2 hover:bg-gray-50 ${active === group ? "bg-gray-50 text-black font-semibold" : "text-neutral-500"}`}
              >
                <div className="flex justify-between items-center">
                  <span>{capitalize(group)}</span>
                  <span className="text-xs">{countItems(groupItems)}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
