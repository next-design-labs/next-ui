import { Button } from "./ui/button";
import { Input } from "./ui/input";

type HeaderProps = {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (id: string) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Header = ({
  tabs,
  activeTab,
  onTabChange,
  onSearchChange,
}: HeaderProps) => {
  return (
    <header className="fixed w-full border-b flex items-center bg-white h-12 px-2">
      {tabs.map(({ id, label }) => (
        <Button
          key={id}
          variant="ghost"
          size="sm"
          className={`h-7 text-xs ${activeTab === id ? "text-black font-bold" : "text-neutral-500"}`}
          onClick={() => onTabChange(id)}
        >
          {label}
        </Button>
      ))}
      <Input
        placeholder="Search"
        className="ml-auto h-7 w-50 p-2 mr-2  text-xs text-neutral-700 bg-neutral-50"
        onChange={onSearchChange}
      />
    </header>
  );
};

export default Header;
