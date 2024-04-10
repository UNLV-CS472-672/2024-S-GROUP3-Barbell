import { fileURLToPath } from 'url'

/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */
/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
  // prettier
  semi: false,
  printWidth: 100,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: true,

  // sort-imports, and tailwinds
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],

  // tailwind
  tailwindConfig: fileURLToPath(new URL('../../tooling/tailwind/index.ts', import.meta.url)),

  // utils
  // https://github.com/tailwindlabs/prettier-plugin-tailwindcss
  tailwindFunctions: ['cn', 'cva'],

  // sort-imports
  importOrder: [
    '<TYPES>',
    '^(react/(.*)$)|^(react$)|^(react-native(.*)$)',
    '^(next/(.*)$)|^(next$)',
    '^(expo(.*)$)|^(expo$)',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '<TYPES>^@acme',
    '^@acme/(.*)$',
    '',
    '<TYPES>^[.|..|~]',
    '^~/',
    '^[../]',
    '^[./]',
  ],
  importOrderTypeScriptVersion: '4.4.0',
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
}

export default config
