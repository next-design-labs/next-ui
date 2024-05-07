import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { capitalize, isHexColor } from "@/lib/utils";
import { Info, MoreHorizontal, Plus } from "lucide-react";

export type GroupProps = {
  group: string;
  items: Record<string, { value: string; usage?: string } | string>;
};

// Tooltip Info Component
const TooltipInfo = ({ usage }: { usage?: string }) =>
  usage ? (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <span>
            <Info className="w-3 h-3 text-gray-400 hover:text-gray-600 cursor-pointer" />
          </span>
        </TooltipTrigger>
        <TooltipContent className="bg-gray-800 text-white p-2 rounded text-xs">
          {usage}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : null;

// Hex Color Indicator Component
const HexColorIndicator = ({ color }: { color: string }) =>
  isHexColor(color) ? (
    <span
      className="w-4 h-4 border rounded"
      style={{ backgroundColor: color }}
    />
  ) : null;

const Group = ({ group, items }: GroupProps) => {
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger
        className="w-full px-4 py-4 flex items-center justify-between border-b"
        data-state="open"
      >
        <h3 className="text-xs font-semibold">{capitalize(group)}</h3>
        <Plus className="w-4 h-4 transition-transform" />
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="divide-y last:border-b">
          {Object.entries(items).map(([name, value]) => {
            const { value: itemValue, usage: itemUsage } =
              typeof value === "object" ? value : { value };

            return (
              <div
                key={name}
                className="grid grid-cols-[120px_1fr] items-center"
              >
                {/* Left Column */}
                <div className="flex items-center justify-between py-2 px-4 text-xs font-medium text-gray-800 border-r">
                  <span>{name}</span>
                  <TooltipInfo usage={itemUsage} />
                </div>

                {/* Right Column */}
                <div className="flex items-center justify-between py-2 px-4 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <HexColorIndicator color={itemValue} />
                    <code>{itemValue}</code>
                  </div>
                  <MoreHorizontal className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                </div>
              </div>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Group;
