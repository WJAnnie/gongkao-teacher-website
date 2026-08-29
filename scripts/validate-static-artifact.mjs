import { readdir, readFile, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { staticRoutes } from '../app/site-routes.mjs';
import { findUnprefixedReferences, normalizeBasePath } from './static-site-utils.mjs';

const root = resolve(import.meta.dirname, '..');
const outputDir = join(root, 'site');
const args = process.argv.slice(2);
const basePathIndex = args.indexOf('--base-path');
const basePath = normalizeBasePath(basePathIndex >= 0 ? args[basePathIndex + 1] ?? '' : '');
const requiredFiles = staticRoutes.map((route) =>
  route === '/' ? join(outputDir, 'index.html') : join(outputDir, route.slice(1), 'index.html'),
);
requiredFiles.push(join(outputDir, '404.html'));

const errors = [];
for (const file of requiredFiles) {
  if (!(await isFile(file))) errors.push(`缺少文件：${file}`);
}
if (!(await isDirectory(join(outputDir, '_next')))) {
  errors.push(`缺少目录：${join(outputDir, '_next')}`);
}

for (const file of await collectHtmlFiles(outputDir)) {
  const html = await readFile(file, 'utf8');
  if (/http:\/\/localhost(?::\d+)?\//.test(html)) {
    errors.push(`包含构建服务器地址：${file}`);
  }
  for (const reference of findUnprefixedReferences(html, basePath)) {
    errors.push(`未添加站点前缀：${file} -> ${reference}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Validated ${staticRoutes.length} routes for base path "${basePath}"`);

async function isFile(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

async function isDirectory(path) {
  try {
    return (await stat(path)).isDirectory();
  } catch {
    return false;
  }
}

async function collectHtmlFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectHtmlFiles(path)));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(path);
  }
  return files;
}
