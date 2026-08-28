import type { HotspotArticle, HotspotCategory, HotspotHighlight } from './writing-hotspot-schema';

const transitionSets: Record<string, string[]> = {
  development: ['因此，', '由此可见，', '面向未来，', '基于这样的认识，'],
  culture: ['正因如此，', '由此可见，', '归根到底，', '基于这样的认识，'],
  people: ['因此，', '由此可见，', '基于此，', '说到底，'],
  government: ['为此，', '因此，', '由此可见，', '基于这样的现实，'],
  grassroots: ['因此，', '正因如此，', '基于此，', '由此可见，'],
  law: ['因此，', '由此可见，', '基于此，', '归根到底，'],
  values: ['因此，', '归根到底，', '正因如此，', '由此可见，'],
  era: ['因此，', '面向未来，', '由此可见，', '基于这样的变化，'],
};

const existingTransitions = /^(因此|所以|为此|由此可见|由此|基于此|正因如此|归根到底|说到底|面向未来|基于这样的认识|基于这样的现实|基于这样的变化)[，,]/;
const sentenceEnd = /[。！？]$/;

function hash(input: string) {
  let value = 0;
  for (let i = 0; i < input.length; i += 1) value = (value * 31 + input.charCodeAt(i)) >>> 0;
  return value;
}

function tidyText(text: string) {
  return text
    .trim()
    .replace(/increasingly use video, sensing and online data for non-on-site supervision。/g, '逐步运用视频监控、智能感知和线上数据开展非现场监管。')
    .replace(/。。+/g, '。')
    .replace(/，，+/g, '，')
    .replace(/；。/g, '。')
    .replace(/，。/g, '。')
    .replace(/\s+([，。；：！？])/g, '$1');
}

function ensureEnd(text: string) {
  const value = tidyText(text);
  return sentenceEnd.test(value) ? value : `${value}。`;
}

function thesisWithTransition(article: HotspotArticle, categoryKey: string) {
  const thesis = ensureEnd(article.thesis);
  if (existingTransitions.test(thesis)) return thesis;
  const choices = transitionSets[categoryKey] ?? transitionSets.era;
  return `${choices[hash(article.slug) % choices.length]}${thesis}`;
}

function articleText(article: HotspotArticle) {
  return [
    article.intro,
    article.thesis,
    ...article.sections.flatMap((section) => [section.title, section.body]),
    article.conclusion,
  ].join('');
}

function articleLength(article: HotspotArticle) {
  return articleText(article).replace(/\s/g, '').length;
}

function auditHighlights(article: HotspotArticle, highlights: HotspotHighlight[]) {
  const body = articleText(article);
  return highlights.filter((item) => {
    if (!body.includes(item.text)) return false;
    if (item.label === '案例' && item.text.replace(/\s/g, '').length > 72) {
      throw new Error(`Hotspot case highlight is too long: ${article.slug} = ${item.text.length}`);
    }
    return true;
  });
}

function auditArticle(source: HotspotArticle, categoryKey: string): HotspotArticle {
  const article: HotspotArticle = {
    ...source,
    intro: ensureEnd(source.intro),
    thesis: thesisWithTransition(source, categoryKey),
    sections: source.sections.map((section) => ({
      title: ensureEnd(section.title),
      body: tidyText(section.body),
    })),
    conclusion: ensureEnd(source.conclusion),
    tags: [...source.tags],
    highlights: source.highlights.map((item) => ({ ...item, text: tidyText(item.text) })),
    references: [...source.references],
  };

  article.highlights = auditHighlights(article, article.highlights);
  const fullText = articleText(article);

  if (!existingTransitions.test(article.thesis)) {
    throw new Error(`Hotspot thesis lacks transition: ${article.slug}`);
  }
  if (article.sections.some((section) => !sentenceEnd.test(section.title))) {
    throw new Error(`Hotspot section point lacks punctuation: ${article.slug}`);
  }
  if (/。。|，，|；。|，。/.test(fullText)) {
    throw new Error(`Hotspot article contains duplicated punctuation: ${article.slug}`);
  }
  if (/increasingly use|non-on-site supervision/i.test(fullText)) {
    throw new Error(`Hotspot article contains abnormal English insertion: ${article.slug}`);
  }

  const count = articleLength(article);
  article.length = `${count}字`;
  if (count < 1000 || count > 1300) {
    throw new Error(`Hotspot article length out of range after audit: ${article.slug} = ${count}`);
  }
  return article;
}

export function auditCategory(category: HotspotCategory): HotspotCategory {
  return {
    ...category,
    articles: category.articles.map((article) => auditArticle(article, category.key)),
  };
}
