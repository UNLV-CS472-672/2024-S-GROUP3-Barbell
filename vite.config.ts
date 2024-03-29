/// <reference types="vitest" />
import { defineConfig } from "vite";

/**
 * @thienguen
 * since we installed it at root
 * so it shared instances across all monorepo, quite hectic
 */
export default defineConfig({
  test: {
    // ...
  },
});
