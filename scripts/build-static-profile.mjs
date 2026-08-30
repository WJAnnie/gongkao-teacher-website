import { spawnSync } from 'node:child_process';
import { assertSupportedNode } from './runtime-contract.mjs';

assertSupportedNode();

const args = process.argv.slice(2);
const profileIndex = args.indexOf('--profile');
const profile = profileIndex >= 0 ? args[profileIndex + 1] : '';
if (profile !== 'root' && profile !== 'pages') {
  throw new Error('必须指定 --profile root 或 --profile pages');
}

const repository = process.env.GITHUB_REPOSITORY ?? 'WJAnnie/gongkao-teacher-website';
const repositoryName = repository.split('/')[1];
const basePath = profile === 'pages' ? process.env.SITE_BASE_PATH ?? `/${repositoryName}` : '';
const npmCommand =
  process.platform === 'win32'
    ? [process.env.ComSpec ?? 'cmd.exe', ['/d', '/s', '/c', 'npm.cmd']]
    : ['npm', []];
const commands = [
  [npmCommand[0], [...npmCommand[1], 'run', 'build'], {}],
  [process.execPath, ['scripts/build-github-pages.mjs'], { SITE_BASE_PATH: basePath }],
  [process.execPath, ['scripts/validate-static-artifact.mjs', '--base-path', basePath], {}],
  [process.execPath, ['scripts/report-static-size.mjs'], {}],
];

for (const [command, commandArgs, extraEnvironment] of commands) {
  const result = spawnSync(command, commandArgs, {
    stdio: 'inherit',
    env: { ...process.env, ...extraEnvironment },
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
