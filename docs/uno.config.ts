import { presetNextUI } from "@next-design-labs/next-ui-uno-preset";
import { type Preset, defineConfig } from "unocss";

export default defineConfig({
  presets: [presetNextUI() as Preset],
});
