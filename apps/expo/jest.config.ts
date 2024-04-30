import type { Config } from 'jest'

const config: Config = {
  coverageDirectory: './jest-coverage/',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
  testTimeout: 60000,
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
    '!**/sign-in-w-google.tsx',

    /* need to remove in the future */
    '!**/app/**',
    '!**/custom-bottom-sheet-modal.tsx',
    '!**/svgMock.tsx',
    '!**/notif/**',
    '!**/hooks/**',
    '!**/context/**',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.setup.js',
    '!**/spotify/**',

    /* halt the coverage */
    '!**/(dashboard)/**',
    '!**/(inbox)/**',
    '!**/(friends)/**',
    '!**/(workout)/**',
    '!**/tracker/**',
    '!**/profile/**',
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
    '\\.svg$': '<rootDir>/src/__mocks__/svgMock.tsx',
  },
}

export default config