// @ts-check
/**
 * Vitest preset: extend it after the other presets. Applies to test files only.
 */
import base from "./base.js";

const testFiles = [
  "**/*.test.{ts,tsx,mts,js,mjs}",
  "**/*.spec.{ts,tsx,mts,js,mjs}",
  "**/__tests__/**",
];

/** @type {import("oxlint").OxlintConfig} */
const test = {
  overrides: [
    {
      files: testFiles,
      plugins: [...(base.plugins ?? []), "vitest"],
      rules: {
        "vitest/consistent-test-it": ["error", { fn: "it", withinDescribe: "it" }],
        "vitest/no-alias-methods": "error",
        "vitest/no-duplicate-hooks": "error",
        "vitest/no-identical-title": "error",
        "vitest/no-import-node-test": "error",
        "vitest/no-test-return-statement": "error",
        "vitest/prefer-hooks-on-top": "error",
        "vitest/prefer-to-be": "error",
        "vitest/prefer-to-contain": "error",
        "vitest/prefer-to-have-length": "error",
        // Tests reach into fixtures and mocks in ways production code must not.
        "typescript/no-non-null-assertion": "off",
        "typescript/unbound-method": "off",
        "max-nested-callbacks": "off",
        "max-classes-per-file": "off",
        "no-empty-function": "off",
      },
    },
  ],
};

export default test;
