// 首页热点与规范用词的链接在浏览器里按日期重新生成，拿不到构建后补的子路径前缀，
// 因此这里显式带上 SITE_BASE_PATH（Vite 在 vite.config.ts 里用 define 注入）。
// 构建后的 rewriteHtml 会跳过已带前缀的路径，不会重复加。
export function normalizeBasePath(value: string): string {
  const trimmed = value.trim().replace(/\/+$/, '');
  if (!trimmed) return '';
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

export const FRONT_BASE_PATH = normalizeBasePath(process.env.SITE_BASE_PATH ?? '');

export function hotspotHref(basePath: string, categoryKey: string, slug: string): string {
  return `${basePath}/shenlun/writing/#hotspots/${categoryKey}/${slug}`;
}

export function hotspotIndexHref(basePath: string): string {
  return `${basePath}/shenlun/writing/hotspots/`;
}

export function termsHref(basePath: string, categoryKey?: string): string {
  return categoryKey
    ? `${basePath}/shenlun/writing/#terms/${categoryKey}`
    : `${basePath}/shenlun/writing/#terms`;
}
