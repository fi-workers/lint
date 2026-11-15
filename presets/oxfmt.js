// @ts-check
/**
 * Shared Oxfmt options. Spread them in the repository's `oxfmt.config.ts`
 * and add the repository's own `ignorePatterns`.
 */

/** @type {import("oxfmt").OxfmtConfig} */
const oxfmt = {
  printWidth: 100,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  sortImports: {},
  sortPackageJson: true,
};

export default oxfmt;
