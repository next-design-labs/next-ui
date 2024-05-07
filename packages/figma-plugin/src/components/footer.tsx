import { Button } from "./ui/button";

type FooterProps = {
  onSync: () => void;
  onDeleteAll: () => void;
};

const Footer = ({ onSync, onDeleteAll }: FooterProps) => {
  const buttons = [
    { label: "Delete", onClick: onDeleteAll, ariaLabel: "Delete all items" },
    { label: "Sync", onClick: onSync, ariaLabel: "Sync items" },
  ];

  return (
    <footer className="fixed bottom-0 w-full border-t bg-white flex h-12 items-center px-2">
      {buttons.map(({ label, onClick, ariaLabel }) => (
        <Button
          key={label}
          className="text-xs"
          variant="ghost"
          size="sm"
          onClick={onClick}
          aria-label={ariaLabel}
        >
          {label}
        </Button>
      ))}
    </footer>
  );
};

export default Footer;
