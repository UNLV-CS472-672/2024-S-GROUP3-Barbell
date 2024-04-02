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
    '!**/constants.ts',
    // need to remove in future v
    '!**/app/**',
    '!**/custom-bottom-sheet-modal.tsx',
    '!**/auth/**',
    '!**/notif/**',
    '!**/hooks/**',
    '!**/context/**',
  ],
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: -10,
  //   },
  // },
  // preset: 'ts-jest',

  /* DON'T UNCOMMENT THIs, IT GOES KABOOM */
  // transform: {
  //   '^.+\\.(ts|tsx)?$': 'ts-jest',
  //   '^.+\\.(js|jsx)$': 'babel-jest',
  // }

  preset: 'jest-expo',
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
  },
}

export default config
