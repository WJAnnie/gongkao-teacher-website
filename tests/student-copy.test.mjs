import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const sourceFiles = [
  '../app/learning-route-notes.ts',
  '../app/shenlun/framework/page.tsx',
  '../app/shenlun/framework/framework-expression-article.tsx',
  '../app/shenlun/writing/page.tsx',
  '../app/interview/methods/page.tsx',
  '../app/interview/expression/page.tsx',
  '../app/interview/questions/page.tsx',
  '../app/interview/videos/page.tsx',
  '../app/shenlun/questions/page.tsx',
  '../app/shenlun/videos/page.tsx',
];

const bannedPhrases = [
  ['表达规则、题型框架、核心能力和实用技巧', '放在', '同一套学习手册里。', '左侧目录', '始终跟着你，', '正文', '按栏目阅读。'],
  ['一张卷子看起来很厚，', '真正反复打交道的就是三件事'],
  ['左侧目录', '始终跟着你'],
  ['正文', '按栏目阅读'],
  ['放在', '同一套学习手册里'],
].map((parts) => parts.join(''));

async function readProjectFile(path) {
  return readFile(new URL(path, import.meta.url), 'utf8');
}

test('student-facing copy removes interface-first learning descriptions', async () => {
  const contents = await Promise.all(sourceFiles.map(readProjectFile));
  const combined = contents.join('\n');

  for (const phrase of bannedPhrases) {
    assert.doesNotMatch(combined, new RegExp(phrase));
  }

  assert.match(combined, /从审题、读材料、定结构学起/);
  assert.match(combined, /练习把积累写进分论点和论证段/);
  assert.match(combined, /回到材料找依据/);
  assert.match(combined, /减少卡顿、重复和空话/);
});

test('framework article keeps the core knowledge structure', async () => {
  const article = await readProjectFile('../app/shenlun/framework/framework-expression-article.tsx');

  for (const term of ['注意事项', '给定资料', '作答要求']) {
    assert.match(article, new RegExp(term));
  }

  for (const materialType of ['理论型材料', '评论型材料', '案例型材料', '数据型材料']) {
    assert.match(article, new RegExp(materialType));
  }

  for (const auditTerm of ['范围', '对象', '问法 / 要素', '要求', '字数']) {
    assert.match(article, new RegExp(auditTerm));
  }
});
