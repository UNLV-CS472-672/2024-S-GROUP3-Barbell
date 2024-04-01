export default {
  collectCoverage: true,
  coverageDirectory: "./jest-coverage/", 
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
    '!**/__tests__/**',
  ],
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest/presets/js-with-ts",
  setupFiles: ["dotenv/config"],
  transform: {
    "^.+\\.mjs$": "ts-jest",
    "^.+\\.(t|j)sx?$": "ts-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!superjson).+\\.js$",
  ],
  testMatch: [
    "**/__test__/**/*.test.ts",
  ],
};
