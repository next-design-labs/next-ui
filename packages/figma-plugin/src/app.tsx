import Footer from "@/components/footer";
import Header from "@/components/header";
import Panel from "@/components/panel";
import * as theme from "@/theme";
import { useState } from "react";
import { search } from "./lib/search";
import { capitalize } from "./lib/utils";

type ThemeKey = keyof typeof theme;

export const App = () => {
  const [activeTab, setActiveTab] = useState<string>("theme");
  const [themeData, setThemeData] = useState<typeof theme>(theme);

  const tabs = Object.keys(theme).map((key) => ({
    id: key,
    label: capitalize(key),
    component: <Panel data={themeData[key as ThemeKey]} />,
  }));

  const activePanel = tabs.find(({ id }) => id === activeTab)?.component;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setThemeData(theme);
      return;
    }

    const result = search(theme, e.target.value);
    setThemeData(result || {});
  };

  const handleSync = () => {
    parent.postMessage({ pluginMessage: { type: "sync-theme", theme } }, "*");
  };

  const handleDeleteAll = () => {
    parent.postMessage({ pluginMessage: { type: "delete-all" } }, "*");
  };

  return (
    <>
      <Header
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSearchChange={handleSearch}
      />
      <main className="pt-12  flex h-[calc(100vh-45px)]">{activePanel}</main>
      <Footer onSync={handleSync} onDeleteAll={handleDeleteAll} />
    </>
  );
};

export default App;
