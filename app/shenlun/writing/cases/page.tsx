import type { Metadata } from 'next';
import { ShenlunShell } from '../../../shenlun-shell';
import { CaseStaticIndex } from '../writing-static-pages';

export const metadata: Metadata = {
  title: '案例素材｜写作积累｜答卷之外',
  description: '按人物、城市、科技、政务、基层等类型选择申论案例素材。',
};

export default function CaseWritingIndexPage() {
  return <ShenlunShell tone="writing" eyebrow="CASE LIBRARY / 案例素材" title="案例素材" desc="先选案例类型，再进入对应静态页面。每一页只装10个案例，方便继续长期扩容。">
    <section className="shenlun-content framework-content writing-content"><CaseStaticIndex /></section>
  </ShenlunShell>;
}
