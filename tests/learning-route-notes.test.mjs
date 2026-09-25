import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { learningRouteNotes } from '../app/learning-route-notes.ts';
import { interviewRoutes, shenlunRoutes } from '../app/learning-routes.ts';

const gateway = await readFile(new URL('../app/subject-gateway.tsx', import.meta.url), 'utf8');

test('every learning route has exactly one note', () => {
  const keys = [...shenlunRoutes, ...interviewRoutes].map((route) => route.key).sort();
  assert.deepEqual(Object.keys(learningRouteNotes).sort(), keys);
  for (const key of keys) assert.match(learningRouteNotes[key], /^\S+( · \S+)+$/);
  assert.equal(learningRouteNotes['shenlun-writing'], '热点 · 案例 · 用词 · 作文');
  assert.equal(learningRouteNotes['interview-questions'], '国考 · 省考 · 回忆真题');
});

test('subject gateway reads notes instead of keeping its own copy', () => {
  assert.match(gateway, /import \{ learningRouteNotes \} from '\.\/learning-route-notes';/);
  assert.match(gateway, /desc: learningRouteNotes\[route\.key\]/);
  assert.doesNotMatch(gateway, /desc: '/);
});
