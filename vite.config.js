import { defineConfig } from "vite";
import { resolve } from "path";
import svelte from "@sveltejs/vite-plugin-svelte";
import yaml from "@rollup/plugin-yaml";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), yaml()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "mock/testbed/index.html"),
        mock: resolve(__dirname, "mock/testbed/mock.html"),
      },
    },
  },
  server: {
    open: "/mock/testbed/index.html",
  },
});
