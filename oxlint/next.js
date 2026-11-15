// @ts-check
/**
 * Next.js preset: extend it after `base` and `react`.
 */
import react from './react.js';

/** @type {import("oxlint").OxlintConfig} */
const next = {
  plugins: [...(react.plugins ?? []), 'nextjs'],
  rules: {
    // App Router files export metadata, config and handlers next to components.
    'react/only-export-components': 'off',
  },
  overrides: [
    {
      // Route segments and special files must default-export their component.
      files: [
        '**/app/**/{page,layout,template,loading,error,global-error,not-found,default}.{ts,tsx}',
        '**/pages/**/*.{ts,tsx}',
        '**/middleware.ts',
        '**/proxy.ts',
      ],
      rules: { 'import/no-default-export': 'off' },
    },
  ],
};

export default next;
