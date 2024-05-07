import { capitalize } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { Plus } from "lucide-react";

interface GroupProps {
  group: string;
  items: Record<string, string>;
}

const Group = ({ group, items }: GroupProps) => {
  const isHexColor = (value: string) => /^#([0-9A-F]{3}){1,2}$/i.test(value);

  return (
    <Collapsible defaultOpen={true}>
      <CollapsibleTrigger className="w-full px-4 py-4 flex bg-gray-50 items-center justify-between border-b">
        <h3 className="text-xs font-bold text-gray-500">{capitalize(group)}</h3>
        <Plus className="w-4 h-4 text-gray-500 transition-transform" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="divide-y last:border-b">
          {Object.entries(items).map(([name, value]) => (
            <div key={name} className="grid grid-cols-2">
              <div className="py-2 px-4 text-xs font-medium text-gray-800 border-r">
                {name}
              </div>
              <div className="flex items-center gap-2 py-2 px-4 text-xs text-gray-500">
                {isHexColor(value) && (
                  <span
                    className="w-4 h-4 border rounded"
                    style={{ backgroundColor: value }}
                  />
                )}
                <code>{value}</code>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Group;
