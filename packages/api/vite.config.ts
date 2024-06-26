/// <reference types="vitest" />
import { configDefaults, defineConfig } from 'vitest/config'

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
      exclude: [
        '**/node_modules/**',
        '**/__test__/**',
        '**/html/**',
        '**/vitest-coverage/**',
        '**/jest-coverage/**',

        'src/root.ts',
        'src/trpc.ts',
      ],
      reportsDirectory: 'vitest-coverage',
    },
    exclude: [
      ...configDefaults.exclude,

      '**/node_modules/**',
      '**/html/**',
      '**/coverage/**',
      '**/jest-coverage/**',
    ],
    // https://vitest.dev/guide/reporters
    // the rest is ugly so these 2 only
    reporters: ['verbose', 'html'],
  },
})
