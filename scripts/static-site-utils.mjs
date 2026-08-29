export function normalizeBasePath(value) {
  const trimmed = value.trim();
  if (!trimmed || trimmed === '/') return '';
  if (!trimmed.startsWith('/') || trimmed.includes('://')) {
    throw new Error(`站点前缀必须是路径：${value}`);
  }
  return trimmed.replace(/\/+$/, '');
}

export function rewriteHtml(html, basePathValue) {
  const basePath = normalizeBasePath(basePathValue);
  let rewritten = html.replaceAll('http://localhost:3000/', `${basePath}/`);
  if (!basePath) return rewritten;

  rewritten = rewritten.replace(
    /\b(href|src)=(['"])(\/[^'"]*)\2/g,
    (_match, attr, quote, path) => `${attr}=${quote}${prefixRootPath(path, basePath)}${quote}`,
  );
  rewritten = rewritten.replace(
    /\bsrcSet=(['"])([^'"]*)\1/g,
    (_match, quote, value) => `srcSet=${quote}${prefixSrcSet(value, basePath)}${quote}`,
  );
  rewritten = rewritten.replace(
    /(\\"(?:href|src)\\":\\")(\/[^\\"]*)/g,
    (_match, prefix, path) => `${prefix}${prefixRootPath(path, basePath)}`,
  );
  return rewritten.replace(
    /(\\"srcSet\\":\\")([^\\"]*)/g,
    (_match, prefix, value) => `${prefix}${prefixSrcSet(value, basePath)}`,
  );
}

export function findUnprefixedReferences(html, basePathValue) {
  const basePath = normalizeBasePath(basePathValue);
  if (!basePath) return [];

  const references = [];
  for (const match of html.matchAll(/\b(?:href|src)=(['"])(\/[^'"]*)\1/g)) {
    if (isUnprefixed(match[2], basePath)) references.push(match[2]);
  }
  for (const match of html.matchAll(/\bsrcSet=(['"])([^'"]*)\1/g)) {
    references.push(...findUnprefixedSrcSetPaths(match[2], basePath));
  }
  for (const match of html.matchAll(/\\"(?:href|src)\\":\\"(\/[^\\"]*)/g)) {
    if (isUnprefixed(match[1], basePath)) references.push(match[1]);
  }
  for (const match of html.matchAll(/\\"srcSet\\":\\"([^\\"]*)/g)) {
    references.push(...findUnprefixedSrcSetPaths(match[1], basePath));
  }
  return references;
}

function prefixRootPath(path, basePath) {
  if (!isRootRelative(path) || path === basePath || path.startsWith(`${basePath}/`)) return path;
  return `${basePath}${path}`;
}

function prefixSrcSet(value, basePath) {
  return value
    .split(',')
    .map((candidate) => {
      const match = /^(\s*)(\S+)(.*)$/.exec(candidate);
      if (!match) return candidate;
      return `${match[1]}${prefixRootPath(match[2], basePath)}${match[3]}`;
    })
    .join(',');
}

function findUnprefixedSrcSetPaths(value, basePath) {
  return value
    .split(',')
    .map((candidate) => candidate.trim().split(/\s+/, 1)[0])
    .filter((path) => isUnprefixed(path, basePath));
}

function isUnprefixed(path, basePath) {
  return isRootRelative(path) && path !== basePath && !path.startsWith(`${basePath}/`);
}

function isRootRelative(path) {
  return path.startsWith('/') && !path.startsWith('//');
}
