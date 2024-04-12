import type { Config } from 'jest'

const config: Config = {
  coverageDirectory: './jest-coverage/',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
  testTimeout: 30000,
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
    '!**/constants.ts',

    /* need to remove in the future */
    '!**/app/**',
    '!**/custom-bottom-sheet-modal.tsx',
    '!**/sign-in-with-google.tsx',
    '!**/svgMock.tsx',
    '!**/notif/**',
    '!**/hooks/**',
    '!**/context/**',
    '!**/spotify/**',

    /* halt the coverage */
    '!**/(dashboard)/**',
    '!**/(inbox)/**',
    '!**/(friends)/**',
    '!**/(workout)/**',
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
    '~/(.*)' : '<rootDir>/src/$1',
    '\\.svg$': '<rootDir>/src/components/ui/svgMock.tsx',
  },
}

export default config
