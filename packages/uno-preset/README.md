# @next-design-labs/next-ui-uno-preset

NEXT UI UnoCSS preset.

## Installation

```sh
npm install -D unocss @next-design-labs/next-ui-uno-preset
```

Add the `presetNextUI` to the array of presets in your `vite.config.ts` or `uno.config.ts` files:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import unoCSS from "unocss/vite";
import { presetNextUI } from "@next-design-labs/next-ui-uno-preset";

export default defineConfig({
  plugins: [
    unoCSS({
      presets: [presetNextUI()],
    }),
  ],
});
```

```ts
// uno.config.ts
import { defineConfig } from "unocss";
import { presetNextUI } from "@next-design-labs/next-ui-uno-preset";

export default defineConfig({
  presets: [presetNextUI()],
});
```

## Usage

Use any of [Tailwind-like default utility](https://tailwindcomponents.com/cheatsheet/) classes along with the NEXT UI theme utilities.

## License

MIT License