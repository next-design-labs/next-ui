import { Button } from "./ui/button";

type FooterProps = {
  onSync: () => void;
  onDeleteAll: () => void;
};

const Footer = ({ onSync, onDeleteAll }: FooterProps) => {
  return (
    <footer className="fixed bottom-0 w-full border-t bg-white flex h-12 items-center px-2">
      <Button
        className="text-xs"
        variant="ghost"
        size="sm"
        onClick={onDeleteAll}
      >
        Delete
      </Button>
      <Button className="text-xs" variant="ghost" size="sm" onClick={onSync}>
        Sync
      </Button>
    </footer>
  );
};

export default Footer;
