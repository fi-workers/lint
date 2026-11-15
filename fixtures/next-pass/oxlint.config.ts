import base from '@fi-workers/lint/oxlint';
import next from '@fi-workers/lint/oxlint/next';
import react from '@fi-workers/lint/oxlint/react';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [base, react, next],
  options: { typeAware: true, typeCheck: true, reportUnusedDisableDirectives: 'error' },
});
