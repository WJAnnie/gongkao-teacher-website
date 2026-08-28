import type { Metadata } from 'next';
import { ShenlunShell } from '../../../shenlun-shell';
import { MetaphorDirectListPage } from '../writing-metaphor-static-list';

export const metadata: Metadata = {
  title: '比喻词库｜写作积累｜答卷之外',
  description: '申论写作常用比喻词及其含义、常见写法与使用提醒。',
};

export default function MetaphorWritingPage() {
  return <ShenlunShell tone="writing" eyebrow="METAPHOR LIBRARY / 比喻词库" title="比喻词库" desc="242条比喻表达直接列举呈现，保留检索，不再逐条点击展开。">
    <section className="shenlun-content framework-content writing-content"><MetaphorDirectListPage /></section>
  </ShenlunShell>;
}
