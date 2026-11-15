import base from '@fi-workers/lint/oxlint';
import node from '@fi-workers/lint/oxlint/node';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [base, node],
  options: { typeAware: true, typeCheck: true, reportUnusedDisableDirectives: 'error' },
});
