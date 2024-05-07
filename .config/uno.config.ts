import { presetNextUI } from "@next-design-labs/next-ui-uno-preset";
import { defineConfig, presetWebFonts, transformerVariantGroup } from "unocss";

export default defineConfig({
  presets: [
    presetNextUI,
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: ["Inter:400,500,600,700", "Open Sans:400,500,600,700"],
      },
      timeouts: {
        failure: 5000,
      },
    }),
  ],
  // Enable the variant group transformer for grouping CSS variants
  transformers: [transformerVariantGroup()],
  // Specify the content files to include in the CSS generation pipeline
  content: {
    pipeline: {
      include: [
        // Include files for UnoCSS processing
        /\.(jsx?|tsx?|mdx?|html)($|\?)/,
      ],
    },
  },
});
