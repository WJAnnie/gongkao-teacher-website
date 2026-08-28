export type HotspotSection = {
  title: string;
  body: string;
};

export type HotspotReference = {
  label: string;
  href: string;
};

export type HotspotHighlight = {
  text: string;
  label: '对仗' | '排比' | '高端句' | '名言' | '案例' | '比喻';
};

export type HotspotArticle = {
  slug: string;
  no: string;
  title: string;
  exam: string;
  tags: string[];
  length: string;
  intro: string;
  thesis: string;
  sections: HotspotSection[];
  conclusion: string;
  highlights: HotspotHighlight[];
  references: HotspotReference[];
};

export type HotspotCategory = {
  key: string;
  no: string;
  label: string;
  en: string;
  desc: string;
  articles: HotspotArticle[];
};
