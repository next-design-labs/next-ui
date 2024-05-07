import clsx from "clsx"; // For conditional classes
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type HeaderProps = {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (id: string) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// Tab Button Component
const TabButton = ({
  id,
  label,
  isActive,
  onClick,
}: {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <Button
    key={id}
    variant="ghost"
    size="sm"
    aria-selected={isActive}
    className={clsx(
      "h-7 text-xs transition-colors",
      isActive
        ? "font-bold text-black"
        : "text-neutral-500 hover:text-neutral-700",
    )}
    onClick={onClick}
  >
    {label}
  </Button>
);

const Header = ({
  tabs,
  activeTab,
  onTabChange,
  onSearchChange,
}: HeaderProps) => {
  return (
    <header className="fixed w-full h-12 flex items-center border-b bg-white px-2">
      {/* Tabs */}
      <nav className="flex gap-2">
        {tabs.map(({ id, label }) => (
          <TabButton
            key={id}
            id={id}
            label={label}
            isActive={activeTab === id}
            onClick={() => onTabChange(id)}
          />
        ))}
      </nav>

      {/* Search Input */}
      <Input
        placeholder="Search"
        className="ml-auto h-7 w-50 px-2 text-xs text-neutral-700 bg-neutral-50 border rounded"
        onChange={onSearchChange}
        aria-label="Search"
      />
    </header>
  );
};

export default Header;
