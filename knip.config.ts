import shared from '@fi-workers/lint/knip';
import type { KnipConfiguration } from 'knip';

const config: KnipConfiguration = {
  ...shared,
  // Fixture sources are linted by the self-test, so each one is an entry point.
  entry: ['test/*.test.ts', 'fixtures/*/oxlint.config.ts', 'fixtures/*/src/**'],
  project: ['**/*.{js,mjs,ts,tsx}'],
};

export default config;
