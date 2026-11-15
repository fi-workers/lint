import base from "@fi-workers/lint/oxlint";
import node from "@fi-workers/lint/oxlint/node";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [base, node],
  options: {
    typeAware: true,
    typeCheck: true,
    denyWarnings: true,
    reportUnusedDisableDirectives: "error",
  },
  ignorePatterns: ["fixtures/**", "node_modules/**"],
  overrides: [
    {
      // Each preset is a config module: its default export is the contract.
      files: ["oxlint/*.js", "oxlint/*.d.ts", "presets/*.js", "presets/*.d.ts"],
      rules: { "import/no-default-export": "off" },
    },
  ],
});
