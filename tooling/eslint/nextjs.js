/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ["plugin:@next/next/recommended"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-redundant-type-constituents": "off", // no fk clue
    "@typescript-eslint/no-unused-vars": "off",
  },
}

module.exports = config
