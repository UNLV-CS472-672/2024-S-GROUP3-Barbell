export default {
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
    "**/__tests__/**/*.test.ts",
  ],
};
