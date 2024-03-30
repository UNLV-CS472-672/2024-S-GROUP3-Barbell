/// <reference types="vitest" />
import { defineConfig } from 'vite'

/**
 * @thienguen
 * since we installed it at root
 * so it shared instances across all monorepo, quite hectic
 * @see https://vitest.dev/guide/coverage.html
 */
export default defineConfig({
  test: {
    // ...
    coverage: {
      provider: 'istanbul', // or 'v8'
      exclude: ['**/node_modules/**', '**/__tests/**'],
      reportsDirectory: 'vitest-coverage', 
    },
    exclude: ['**/node_modules/**', '**/__tests/**'],
  },
})
