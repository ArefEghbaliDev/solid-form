import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "SolidForm",
      fileName: (format) => `solid-form.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["solid-js"],
      output: {
        globals: {
          "solid-js": "solidJs",
        },
      },
    },
  },
});
