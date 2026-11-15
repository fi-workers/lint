// @ts-check
/**
 * Node.js preset (servers, CLIs, scripts): extend it after `base`.
 */

/** @type {import("oxlint").OxlintConfig} */
const node = {
  env: { node: true },
  rules: {
    // CLIs and servers write to stdout/stderr on purpose.
    'no-console': 'off',
    'node/no-new-require': 'error',
    'node/no-path-concat': 'error',
  },
};

export default node;
