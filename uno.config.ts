import { presetNextUI } from "@next-design-labs/next-ui-uno-preset";
import transformerVariantGroup from "@unocss/transformer-variant-group";
import { defineConfig } from "unocss";

export default defineConfig({
  presets: [presetNextUI()],
  // Enables the variant group feature for UnoCSS.
  transformers: [transformerVariantGroup()],
});
