import base from '@fi-workers/lint/oxlint';
import react from '@fi-workers/lint/oxlint/react';
import tauri from '@fi-workers/lint/oxlint/tauri';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [base, react, tauri],
  options: { typeAware: true, typeCheck: true, reportUnusedDisableDirectives: 'error' },
});
