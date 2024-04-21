import { defineConfig } from "vite";
import path from "path";
import eslint from "vite-plugin-eslint";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  build: {
    minify: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    eslint(),
    legacy({
      targets: ["ie >= 11", "edge >= 12"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
      polyfills: [
        "es.array.iterator",
        "es.array.find",
        "web.dom-collections.for-each",
        "es.array.includes",
        "es.promise",
        "es.object.assign",
      ],
    }),
  ],
});
