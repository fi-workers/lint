// @ts-check
/**
 * React preset: extend it after `base`.
 * Adds react, react_perf and jsx_a11y (correctness/suspicious/perf/pedantic of
 * those plugins follow the categories set in `base`).
 */
import base from './base.js';

/** @type {import("oxlint").OxlintConfig} */
const react = {
  plugins: [...(base.plugins ?? []), 'react', 'react-perf', 'jsx-a11y'],
  env: { browser: true },
  rules: {
    // The automatic JSX runtime makes the React import unnecessary.
    'react/react-in-jsx-scope': 'off',

    'react/button-has-type': 'error',
    'react/function-component-definition': [
      'error',
      { namedComponents: 'function-declaration', unnamedComponents: 'arrow-function' },
    ],
    'react/hook-use-state': 'error',
    'react/jsx-boolean-value': 'error',
    'react/jsx-curly-brace-presence': 'error',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-pascal-case': 'error',
    'react/jsx-props-no-spreading': 'error',
    'react/no-danger': 'error',
    'react/no-unknown-property': 'error',
    'react/only-export-components': ['error', { allowConstantExport: true }],
    'react/self-closing-comp': 'error',
  },
};

export default react;
