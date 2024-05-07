import { HvProvider } from "@next-design-labs/next-ui-core";
import { createTheme, themes } from "@next-design-labs/next-ui-styles";

import { Navigation } from "./Navigation";

const { ds3, ds5 } = themes;

const theme1 = createTheme({
  name: "theme1",
  colors: {
    modes: {
      dawn: {
        brand: "green",
        backgroundColor: "#D4E6F1",
      },
      wicked: {
        backgroundColor: "#2c6689",
      },
    },
  },
});

const theme2 = createTheme({
  name: "theme2",
  colors: {
    modes: {
      dawn: {
        brand: "blue",
        backgroundColor: "#e6f1d4",
      },
      wicked: {
        backgroundColor: "#66892c",
      },
    },
  },
});

function App() {
  return (
    <HvProvider>
      <div className="grid h-50 grid-cols-2 gap-2">
        <div id="column1">
          <HvProvider
            rootId="column1"
            themes={[ds3, ds5, theme1]}
            theme="theme1"
          >
            <Navigation />
          </HvProvider>
        </div>
        <div id="column2">
          <HvProvider rootId="column2" themes={[ds5, theme2]} theme="theme2">
            <Navigation />
          </HvProvider>
        </div>
      </div>
    </HvProvider>
  );
}

export default App;
