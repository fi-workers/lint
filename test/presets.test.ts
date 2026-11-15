// Proves that every preset loads through the package's own exports and that it
// reports what it promises: pass fixtures are clean, fail fixtures raise the
// listed rules (type-aware rules and TypeScript diagnostics included).
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { describe, it } from 'node:test';

interface Diagnostic {
  readonly code: string;
}

interface Report {
  readonly diagnostics: readonly Diagnostic[];
}

const root = path.resolve(import.meta.dirname, '..');
const oxlintBin = path.join(root, 'node_modules', '.bin', 'oxlint');

function isReport(value: unknown): value is Report {
  return typeof value === 'object' && value !== null && 'diagnostics' in value && Array.isArray(value.diagnostics);
}

function lint(fixture: string): ReadonlySet<string> {
  const cwd = path.join(root, 'fixtures', fixture);
  // oxlint exits non-zero when it reports errors; the JSON is on stdout either way.
  const { stdout } = spawnSync(oxlintBin, ['--format', 'json'], { cwd, encoding: 'utf8' });
  const report: unknown = JSON.parse(stdout);
  assert.ok(isReport(report), `oxlint printed no JSON report for ${fixture}`);
  return new Set(report.diagnostics.map((diagnostic) => diagnostic.code));
}

const expectedFailures: Readonly<Record<string, readonly string[]>> = {
  'base-fail': [
    'import(no-default-export)',
    'eslint(no-param-reassign)',
    'eslint(no-plusplus)',
    'eslint(eqeqeq)',
    'eslint(prefer-template)',
    'typescript(prefer-for-of)',
    'typescript(no-explicit-any)',
    // type-aware (tsgolint)
    'typescript(no-floating-promises)',
    // typeCheck: noUncheckedIndexedAccess from the shared tsconfig
    'typescript(TS2322)',
  ],
  'react-fail': [
    'react(function-component-definition)',
    'react(jsx-props-no-spreading)',
    'react(button-has-type)',
    'react(self-closing-comp)',
    'react-perf(jsx-no-new-function-as-prop)',
    'jsx-a11y(alt-text)',
    'import(no-nodejs-modules)',
    'typescript(no-unsafe-call)',
  ],
};

await describe('pass fixtures report nothing', () => {
  for (const fixture of ['base-pass', 'react-pass', 'node-pass']) {
    void it(fixture, () => {
      assert.deepEqual([...lint(fixture)], []);
    });
  }
});

await describe('fail fixtures report the expected rules', () => {
  for (const [fixture, rules] of Object.entries(expectedFailures)) {
    void it(fixture, () => {
      const found = lint(fixture);
      const missing = rules.filter((rule) => !found.has(rule));
      assert.deepEqual(missing, [], `missing in ${fixture}: ${missing.join(', ')}`);
    });
  }
});
