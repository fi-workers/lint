// @ts-check
/**
 * Base Oxlint preset for every TypeScript repository.
 *
 * - correctness, suspicious, perf and pedantic are errors as whole categories.
 * - style and restriction rules are picked one by one (the airbnb set plus the
 *   typescript-eslint strict/stylistic type-checked set).
 * - nursery stays off.
 *
 * `options.typeAware`, `options.typeCheck` and `ignorePatterns` are NOT inherited
 * through `extends`: set them in the root `oxlint.config.ts` of each repository.
 */

/** Files that may (or must) have a default export: tool configs and declaration files. */
const defaultExportAllowed = [
  "**/*.config.{js,mjs,cjs,ts,mts,cts}",
  "**/*.config.*.{js,mjs,cjs,ts,mts,cts}",
  "**/*.d.ts",
];

/** @type {import("oxlint").OxlintConfig} */
const base = {
  plugins: ["eslint", "typescript", "unicorn", "import", "promise", "node", "oxc", "jsdoc"],
  categories: {
    correctness: "error",
    suspicious: "error",
    perf: "error",
    pedantic: "error",
    style: "off",
    restriction: "off",
    nursery: "off",
  },
  env: { builtin: true, es2024: true },
  rules: {
    // ---- pedantic rules switched off (too noisy for the value they add) ----
    // Deep-readonly parameters clash with almost every library type; not part of
    // typescript-eslint's strict-type-checked set either.
    "typescript/prefer-readonly-parameter-types": "off",
    // Size limits: airbnb does not enforce them; complexity is a review concern.
    "max-lines": "off",
    "max-lines-per-function": "off",
    // Comments are allowed anywhere, and TODOs are tracked in issues, not by the linter.
    "no-inline-comments": "off",
    "no-warning-comments": "off",
    // TypeScript already carries the types; JSDoc only documents intent.
    "jsdoc/require-param": "off",
    "jsdoc/require-param-description": "off",
    "jsdoc/require-param-type": "off",
    "jsdoc/require-returns": "off",
    "jsdoc/require-returns-description": "off",
    "jsdoc/require-returns-type": "off",
    "jsdoc/require-throws-type": "off",
    "jsdoc/require-yields-type": "off",

    // ---- pedantic rules with airbnb options ----
    "max-classes-per-file": ["error", 1],
    eqeqeq: ["error", "always"],
    radix: "error",
    "no-else-return": ["error", { allowElseIf: false }],
    "import/no-unassigned-import": ["error", { allow: ["**/*.css"] }],

    // ---- airbnb core (style / restriction) ----
    "arrow-body-style": ["error", "as-needed"],
    curly: ["error", "all"],
    "class-methods-use-this": "error",
    "default-case": "error",
    "default-case-last": "error",
    "default-param-last": "error",
    "grouped-accessor-pairs": "error",
    "guard-for-in": "error",
    "new-cap": "error",
    "no-alert": "error",
    "no-bitwise": "error",
    "no-console": "error",
    "no-continue": "error",
    "no-empty": "error",
    "no-eq-null": "error",
    "no-extra-label": "error",
    "no-label-var": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-multi-assign": "error",
    "no-multi-str": "error",
    "no-nested-ternary": "error",
    "no-new-func": "error",
    "no-param-reassign": ["error", { props: true }],
    "no-plusplus": "error",
    "no-proto": "error",
    "no-restricted-exports": ["error", { restrictedNamedExports: ["default", "then"] }],
    "no-return-assign": ["error", "always"],
    "no-script-url": "error",
    "no-sequences": "error",
    "no-template-curly-in-string": "error",
    "no-use-before-define": "error",
    "no-useless-computed-key": "error",
    "no-var": "error",
    "no-void": ["error", { allowAsStatement: true }],
    "object-shorthand": "error",
    "one-var": ["error", "never"],
    "operator-assignment": "error",
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "prefer-destructuring": ["error", { object: true, array: false }],
    "prefer-exponentiation-operator": "error",
    "prefer-numeric-literals": "error",
    "prefer-object-has-own": "error",
    "prefer-object-spread": "error",
    "prefer-regex-literals": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    "vars-on-top": "error",
    yoda: "error",

    // ---- import ----
    "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
    "import/first": "error",
    "import/no-amd": "error",
    "import/no-commonjs": "error",
    "import/no-cycle": "error",
    "import/no-default-export": "error",
    "import/no-duplicates": "error",
    "import/no-dynamic-require": "error",
    "import/no-mutable-exports": "error",
    "import/no-named-default": "error",
    "import/no-webpack-loader-syntax": "error",

    // ---- typescript (non type-aware) ----
    "typescript/adjacent-overload-signatures": "error",
    "typescript/array-type": "error",
    "typescript/ban-tslint-comment": "error",
    "typescript/class-literal-property-style": "error",
    "typescript/consistent-generic-constructors": "error",
    "typescript/consistent-indexed-object-style": "error",
    "typescript/consistent-type-assertions": [
      "error",
      { assertionStyle: "as", objectLiteralTypeAssertions: "never" },
    ],
    "typescript/consistent-type-definitions": "error",
    "typescript/consistent-type-imports": "error",
    "typescript/no-dynamic-delete": "error",
    "typescript/no-empty-interface": "error",
    "typescript/no-empty-object-type": "error",
    "typescript/no-explicit-any": "error",
    "typescript/no-import-type-side-effects": "error",
    "typescript/no-inferrable-types": "error",
    "typescript/no-invalid-void-type": "error",
    "typescript/no-namespace": "error",
    "typescript/no-non-null-assertion": "error",
    "typescript/no-require-imports": "error",
    "typescript/no-var-requires": "error",
    "typescript/prefer-for-of": "error",
    "typescript/prefer-function-type": "error",
    "typescript/prefer-literal-enum-member": "error",
    "typescript/unified-signatures": "error",

    // ---- typescript (type-aware, beyond the categories above) ----
    "typescript/consistent-type-exports": "error",
    "typescript/dot-notation": "error",
    "typescript/no-unnecessary-qualifier": "error",
    "typescript/non-nullable-type-assertion-style": "error",
    "typescript/prefer-find": "error",
    "typescript/prefer-readonly": "error",
    "typescript/prefer-reduce-type-parameter": "error",
    "typescript/prefer-regexp-exec": "error",
    "typescript/prefer-return-this-type": "error",
    "typescript/prefer-string-starts-ends-with": "error",
    "typescript/promise-function-async": "error",
    "typescript/use-unknown-in-catch-callback-variable": "error",
    // Both are typescript-eslint strict/stylistic rules; oxlint files them under nursery.
    "typescript/no-unnecessary-condition": "error",
    "typescript/prefer-optional-chain": "error",

    // ---- unicorn (style / restriction picks) ----
    "unicorn/no-abusive-eslint-disable": "error",
    "unicorn/no-document-cookie": "error",
    "unicorn/no-length-as-slice-end": "error",
    "unicorn/no-magic-array-flat-depth": "error",
    "unicorn/prefer-modern-math-apis": "error",
    "unicorn/prefer-module": "error",
    "unicorn/prefer-node-protocol": "error",
    "unicorn/prefer-number-properties": "error",
    "unicorn/catch-error-name": "error",
    "unicorn/consistent-date-clone": "error",
    "unicorn/consistent-existence-index-check": "error",
    "unicorn/error-message": "error",
    "unicorn/no-array-method-this-argument": "error",
    "unicorn/no-await-expression-member": "error",
    "unicorn/no-console-spaces": "error",
    "unicorn/no-unreadable-array-destructuring": "error",
    "unicorn/no-useless-collection-argument": "error",
    "unicorn/no-zero-fractions": "error",
    "unicorn/number-literal-case": "error",
    "unicorn/prefer-array-index-of": "error",
    "unicorn/prefer-class-fields": "error",
    "unicorn/prefer-default-parameters": "error",
    "unicorn/prefer-export-from": "error",
    "unicorn/prefer-global-this": "error",
    "unicorn/prefer-includes": "error",
    "unicorn/prefer-logical-operator-over-ternary": "error",
    "unicorn/prefer-negative-index": "error",
    "unicorn/prefer-object-from-entries": "error",
    "unicorn/prefer-optional-catch-binding": "error",
    "unicorn/prefer-spread": "error",
    "unicorn/prefer-string-raw": "error",
    "unicorn/prefer-string-trim-start-end": "error",
    "unicorn/prefer-structured-clone": "error",
    "unicorn/require-array-join-separator": "error",
    "unicorn/switch-case-braces": "error",
    "unicorn/text-encoding-identifier-case": "error",
    "unicorn/throw-new-error": "error",

    // ---- promise / oxc ----
    "promise/no-nesting": "error",
    "promise/no-return-wrap": "error",
    "promise/param-names": "error",
    "promise/prefer-await-to-then": "error",
    "promise/prefer-catch": "error",
    "oxc/bad-bitwise-operator": "error",
    "oxc/no-barrel-file": "error",
    "oxc/no-const-enum": "error",
  },
  overrides: [
    {
      files: defaultExportAllowed,
      rules: { "import/no-default-export": "off" },
    },
    {
      files: ["**/*.cjs", "**/*.cts"],
      rules: {
        "import/no-commonjs": "off",
        "unicorn/prefer-module": "off",
        "typescript/no-require-imports": "off",
      },
    },
  ],
};

export default base;
