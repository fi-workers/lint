import base from '@fi-workers/lint/oxlint';
import test from '@fi-workers/lint/oxlint/test';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [base, test],
  options: { typeAware: true, typeCheck: true, reportUnusedDisableDirectives: 'error' },
});
