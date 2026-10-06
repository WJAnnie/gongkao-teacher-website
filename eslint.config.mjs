import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'dist/**', 'site/**', 'output/**', 'next-env.d.ts', '.superpowers/**', '.worktrees/**', '.omx/**', '.omc/**', '.codex-sync-backup-*/**']),
]);

export default eslintConfig;
