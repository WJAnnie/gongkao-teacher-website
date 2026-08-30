import { readdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { staticRoutes } from '../app/site-routes.mjs';

const GZIP_BUDGET_BYTES = 8_500_000;
const REPORT_FILE = 'size-report.json';
const ASSET_TYPES = new Map([
  ['.css', 'css'],
  ['.js', 'js'],
  ['.mjs', 'js'],
  ['.avif', 'image'],
  ['.gif', 'image'],
  ['.jpeg', 'image'],
  ['.jpg', 'image'],
  ['.png', 'image'],
  ['.svg', 'image'],
  ['.webp', 'image'],
  ['.m4a', 'audio'],
  ['.mp3', 'audio'],
  ['.ogg', 'audio'],
  ['.wav', 'audio'],
]);

export function summarizeEntries(entries) {
  const byExtension = {};
  let totalBytes = 0;
  let gzipBytes = 0;
  for (const entry of entries) {
    const extension = extname(entry.path) || '[none]';
    const bucket = byExtension[extension] ?? { files: 0, bytes: 0, gzipBytes: 0 };
    bucket.files += 1;
    bucket.bytes += entry.bytes;
    bucket.gzipBytes += entry.gzipBytes;
    byExtension[extension] = bucket;
    totalBytes += entry.bytes;
    gzipBytes += entry.gzipBytes;
  }
  return { totalBytes, gzipBytes, byExtension };
}

async function reportStaticSize() {
  const root = resolve(import.meta.dirname, '..');
  const outputDir = join(root, 'site');
  const files = await collectFiles(outputDir);
  const entries = [];
  for (const file of files) {
    const path = toPosix(relative(outputDir, file));
    if (path === REPORT_FILE) continue;
    const bytes = await readFile(file);
    entries.push({ path, bytes: bytes.byteLength, gzipBytes: gzipSync(bytes).byteLength });
  }

  entries.sort((left, right) => left.path.localeCompare(right.path));
  const summary = summarizeEntries(entries);
  const routes = await summarizeRoutes(outputDir, entries);
  const largestFiles = [...entries]
    .sort((left, right) => right.bytes - left.bytes || left.path.localeCompare(right.path))
    .slice(0, 20);
  const report = {
    budget: {
      gzipBytes: GZIP_BUDGET_BYTES,
      actualGzipBytes: summary.gzipBytes,
      exceeded: summary.gzipBytes > GZIP_BUDGET_BYTES,
    },
    summary,
    largestFiles,
    routes,
  };

  await writeFile(join(outputDir, REPORT_FILE), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  console.log(`Static artifact: ${formatBytes(summary.totalBytes)} raw / ${formatBytes(summary.gzipBytes)} gzip-estimated`);
  console.log('20 largest files:');
  for (const entry of largestFiles) {
    console.log(`  ${formatBytes(entry.bytes).padStart(10)}  ${entry.path}`);
  }
  if (report.budget.exceeded) {
    console.error(`Static gzip estimate exceeds ${formatBytes(GZIP_BUDGET_BYTES)}.`);
    process.exitCode = 1;
  }
}

async function summarizeRoutes(outputDir, entries) {
  const entryByPath = new Map(entries.map((entry) => [entry.path, entry]));
  const routeAssets = new Map();
  const usage = new Map();

  for (const route of staticRoutes) {
    const htmlPath = route === '/' ? join(outputDir, 'index.html') : join(outputDir, route.slice(1), 'index.html');
    const html = await readFile(htmlPath, 'utf8');
    const referenced = new Set();
    for (const reference of extractReferences(html)) {
      const assetPath = resolveAssetPath(reference, entryByPath);
      if (!assetPath) continue;
      referenced.add(assetPath);
      const routes = usage.get(assetPath) ?? new Set();
      routes.add(route);
      usage.set(assetPath, routes);
    }
    routeAssets.set(route, [...referenced].sort());
  }

  const routes = {};
  for (const route of staticRoutes) {
    const assets = routeAssets.get(route).map((path) => {
      const entry = entryByPath.get(path);
      return {
        path,
        type: ASSET_TYPES.get(extname(path).toLowerCase()),
        bytes: entry.bytes,
        gzipBytes: entry.gzipBytes,
        shared: usage.get(path).size > 1,
      };
    });
    routes[route] = {
      bytes: assets.reduce((total, asset) => total + asset.bytes, 0),
      gzipBytes: assets.reduce((total, asset) => total + asset.gzipBytes, 0),
      assets,
    };
  }
  return routes;
}

function extractReferences(html) {
  const references = [];
  const pattern = /\b(?:href|src)=["']([^"']+)["']/gi;
  for (const match of html.matchAll(pattern)) references.push(match[1]);
  return references;
}

function resolveAssetPath(reference, entryByPath) {
  if (/^(?:data:|mailto:|tel:|javascript:|#)/i.test(reference)) return null;
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(reference, 'https://static.local/').pathname).replace(/^\/+/, '');
  } catch {
    return null;
  }
  const segments = pathname.split('/').filter(Boolean);
  for (let offset = 0; offset < segments.length; offset += 1) {
    const candidate = segments.slice(offset).join('/');
    if (!ASSET_TYPES.has(extname(candidate).toLowerCase())) continue;
    if (entryByPath.has(candidate)) return candidate;
  }
  return null;
}

async function collectFiles(directory) {
  const files = [];
  const entries = await readdir(directory, { withFileTypes: true });
  entries.sort((left, right) => left.name.localeCompare(right.name));
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectFiles(path)));
    else if (entry.isFile()) files.push(path);
  }
  return files;
}

function toPosix(path) {
  return path.replaceAll('\\', '/');
}

function formatBytes(bytes) {
  return `${(bytes / 1_000_000).toFixed(2)} MB`;
}

const isDirectExecution = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectExecution) {
  try {
    await reportStaticSize();
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}
