import type { Config } from 'jest'

const config: Config = {
  setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/app.config.ts',
    '!**/babel.config.ts',
    '!**/tailwind.config.ts',
    '!**/jest.config.ts',
    '!**/.expo/**',
    '!**/*.d.ts',
    '!index.ts',
    '!**/api.tsx',
    // need to remove in future v
    '!**/app/**',
    '!**/custom-bottom-sheet-modal.tsx',
    '!**/auth/**',
    '!**/hooks/**',
    '!**/context/**',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.setup.js',
  ],
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: -10,
  //   },
  // },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  preset: 'jest-expo',
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
  },
}

export default config
