// @ts-check
/**
 * Tauri front-end preset: extend it after `base` and `react`.
 * The web view has no Node.js runtime, so Node built-ins are banned outside
 * build tooling and tests.
 */

/** @type {import("oxlint").OxlintConfig} */
const tauri = {
  rules: {
    "import/no-nodejs-modules": "error",
  },
  overrides: [
    {
      files: [
        "**/*.config.{js,mjs,cjs,ts,mts,cts}",
        "**/scripts/**",
        "**/*.test.{ts,tsx}",
        "**/*.spec.{ts,tsx}",
      ],
      rules: { "import/no-nodejs-modules": "off" },
    },
  ],
};

export default tauri;
