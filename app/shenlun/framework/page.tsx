import type { Metadata } from 'next';
import { ShenlunShell } from '../../shenlun-shell';
import { FrameworkManual } from './framework-manual';
import './framework-expression.css';
import './framework-expression-stepper.css';
import './framework-manual.css';
import './framework-expression-article.css';
import './framework-types-article.css';
import './framework-types-depth.css';
import './framework-types-v4.css';
import './framework-abilities.css';
import './framework-expression-polish.css';
import './framework-expression-reading-refine.css';
import './framework-layout-centering.css';
import './framework-voice-reading.css';
import './framework-deep-enrichment.css';
import './framework-tips-articles.css';
import '../../menu-hierarchy-refinement.css';

export const metadata: Metadata = {
  title: '方法框架｜申论学习｜答卷之外',
  description: '申论表达规则、五大题型框架、核心能力与实用技巧。',
};

export default function FrameworkPage() {
  return (
    <ShenlunShell tone="framework" eyebrow="方法框架" title="方法框架" desc="从审题、读材料、定结构学起，再把五类题型、表达规则和常用技巧放到具体题目里练。">
      <section className="shenlun-content framework-content">
        <FrameworkManual />
      </section>
    </ShenlunShell>
  );
}
