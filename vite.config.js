import { defineConfig } from "vite";

/** Cursor Live App build: static copy of index.html (no bundling of inline app). */
export default defineConfig({
  appType: "mpa",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    minify: false,
    rollupOptions: {
      input: "index.html",
    },
  },
});
