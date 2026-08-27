import type { Metadata } from 'next';
import { ShenlunShell } from '../../shenlun-shell';
import { FrameworkManual } from './framework-manual';

export const metadata: Metadata = {
  title: '方法框架｜申论学习｜答卷之外',
  description: '申论表达规则、五大题型框架、核心能力与实用技巧。',
};

export default function FrameworkPage() {
  return (
    <ShenlunShell tone="framework" eyebrow="METHOD / 方法框架" title="方法框架" desc="表达规则、题型框架、核心能力和实用技巧放在同一套学习手册里。左侧目录始终跟着你，正文按栏目阅读。">
      <section className="shenlun-content framework-content">
        <div className="shenlun-section-head">
          <span>LEARNING MANUAL / 学习手册</span>
          <h2>像翻一本讲义一样，<br />一篇一篇往下读。</h2>
          <p>左侧先选二级栏目，再看当前栏目里的三级目录。正文只保留当前栏目，不会在往下滑的时候突然进入下一块内容。</p>
        </div>
        <FrameworkManual />
      </section>
    </ShenlunShell>
  );
}
