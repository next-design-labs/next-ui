import { defineConfig, type Preset } from "unocss";
import { presetNextUI } from "@next-design-labs/next-ui-uno-preset";

export default defineConfig({
  presets: [presetNextUI() as Preset],
});
