// @ts-check
/**
 * Shared knip defaults. Spread them in the repository's `knip.config.ts`.
 * knip stands in for import/no-extraneous-dependencies and no-unused-modules.
 */

/** @type {import("knip").KnipConfiguration} */
const knip = {
  ignoreExportsUsedInFile: true,
  rules: {
    binaries: "error",
    dependencies: "error",
    devDependencies: "error",
    exports: "error",
    files: "error",
    types: "error",
    unlisted: "error",
    unresolved: "error",
    duplicates: "error",
  },
};

export default knip;
