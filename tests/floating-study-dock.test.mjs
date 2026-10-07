import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function read(relativePath) {
  try {
    return await readFile(new URL(relativePath, import.meta.url), 'utf8');
  } catch (error) {
    if (error?.code === 'ENOENT') return '';
    throw error;
  }
}

const [layout, page, dockComp] = await Promise.all([
  read('../app/layout.tsx'),
  read('../app/page.tsx'),
  read('../app/floating-study-dock.tsx'),
]);

test('root layout mounts FloatingStudyDock once after children and prevents double player', () => {
  assert.match(layout, /import '\.\/floating-study-dock\.css';/);
  assert.match(layout, /import\s*\{\s*FloatingStudyDock\s*\}\s*from\s*'\.\/floating-study-dock';/);
  assert.match(layout, /<body>\s*\{children\}\s*<FloatingStudyDock \/>\s*<\/body>/);

  // 首页防双播放器：不得再导入或挂载 FrontSong、HomeSongPlayer 或 FloatingStudyDock
  assert.doesNotMatch(page, /import\s*\{[^}]*FrontSong[^}]*\}\s*from/);
  assert.doesNotMatch(page, /<FrontSong\b/);
  assert.doesNotMatch(page, /<HomeSongPlayer\b/);
  assert.doesNotMatch(page, /<FloatingStudyDock\b/);

  // 保留首页 contact 原区块
  assert.match(page, /id="contact"/);
  assert.match(page, /aria-label="获取资料"/);
});

test('FloatingStudyDock is a server component with a real materials link below the player', () => {
  assert.doesNotMatch(dockComp, /'use client'/);
  assert.match(dockComp, /import\s*\{\s*HomeSongPlayer\s*\}\s*from\s*'\.\/home-song-player';/);
  assert.match(dockComp, /<HomeSongPlayer \/>/);
  assert.match(dockComp, /href="\/materials\/"/);
  assert.match(dockComp, /获取资料/);
  assert.doesNotMatch(dockComp, /qrcode|二维码/i);

  // 播放器在上方，资料入口在最低一行
  const playerIndex = dockComp.indexOf('<HomeSongPlayer />');
  const materialsIndex = dockComp.indexOf('href="/materials/"');
  assert.ok(playerIndex !== -1 && materialsIndex !== -1, '缺少播放器或资料链接');
  assert.ok(playerIndex < materialsIndex, '播放器应在资料入口上方，资料入口位于最低一行');
});

