import { metaphorEntries, metaphorSourceLinks } from './writing-metaphor-data';
import { WritingStaticEnhancer } from './writing-static-enhancer';

export function MetaphorDirectListPage() {
  return <section className="writing-library-landing writing-static-metaphors">
    <WritingStaticEnhancer />
    <a className="writing-library-back" href="/shenlun/writing/">← 返回写作积累</a>
    <span className="writing-library-kicker">04 / METAPHOR LIBRARY</span>
    <h2>比喻用词怎么积累</h2>
    <p className="writing-library-teacher-note">比喻词条本身很短，这里不再设置逐条展开。学生可以直接纵向浏览“词语—含义—常见写法”，需要某一类表达时再用上方检索快速筛选。使用时先看逻辑关系是否匹配，不为了显得高级而机械堆砌。</p>

    <div className="writing-static-search">
      <label htmlFor="writing-static-metaphor-search">搜索比喻词</label>
      <input id="writing-static-metaphor-search" data-writing-metaphor-search placeholder="可搜：改革、治理、人才、风险、稳定……" />
      <span data-writing-metaphor-count>找到 {metaphorEntries.length} 条</span>
    </div>

    <div className="writing-metaphor-table" role="list" aria-label="比喻用词列表">
      <div className="writing-metaphor-table-head" aria-hidden="true">
        <span>序号</span><b>比喻词</b><span>含义</span><span>常见写法</span>
      </div>
      {metaphorEntries.map((entry, index) => <article
        className="writing-metaphor-row"
        role="listitem"
        data-writing-metaphor-item
        data-search={`${entry.term}${entry.meaning}${entry.use}`}
        key={`${entry.term}-${index}`}
      >
        <span className="writing-metaphor-no">{String(index + 1).padStart(3, '0')}</span>
        <h3>{entry.term}</h3>
        <p className="writing-metaphor-meaning"><small>含义</small>{entry.meaning}</p>
        <p className="writing-metaphor-use"><small>常见写法</small>{entry.use}</p>
      </article>)}
    </div>

    <footer className="writing-static-sources">
      <h3>语料说明</h3>
      <p>词条优先参考总书记重要讲话、中央和政府文件、新华社、人民网等权威语料，再按申论学习需要整理含义和常见搭配。教学释义和示例搭配用于帮助理解，不把整理后的表述冒充权威原文。</p>
      <div>{metaphorSourceLinks.map((item) => <a href={item.href} target="_blank" rel="noreferrer" key={item.href}>{item.label}<i>↗</i></a>)}</div>
    </footer>
  </section>;
}
