import UnoCSS from "unocss/vite";

const config = {
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y"],
  stories: ["../packages/**/src/**/*.stories.@(ts|tsx)"],
  staticDirs: ["./public"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      // Speeds up Storybook build time
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
      propFilter: (prop) => {
        if (prop.parent) {
          const isMuiProp = /node_modules\/@mui\//.test(prop.parent.fileName);
          // Check if the prop's is within the MUI package
          if (isMuiProp) {
            // Prefix prop name to filter MUI props
            prop.name = `mui${prop.name}`;
            return true;
          }
          // Exclude props that are from other node_modules
          return !/node_modules\//.test(prop.parent.fileName);
        }
        // Include props that don't have a parent specified
        return true;
      },
    },
  },
  async viteFinal(config) {
    config.plugins.push(
      UnoCSS({
        configFile: "../../uno.config.ts",
      }),
    );

    return config;
  },
};

export default config;
