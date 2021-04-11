import { defineConfig } from "vite";
import { resolve } from "path";
import svelte from "@sveltejs/vite-plugin-svelte";
import yaml from "@rollup/plugin-yaml";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), yaml()],
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.js"),
      name: "MyLib",
    },
  },
});
