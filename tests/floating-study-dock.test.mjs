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

  assert.doesNotMatch(page, /id="contact"|front-contact|front-qr/);
});

test('the dock exposes one native QR popover while retaining the real materials fallback', () => {
  assert.doesNotMatch(dockComp, /'use client'/);
  assert.match(dockComp, /import\s*\{\s*HomeSongPlayer\s*\}\s*from\s*'\.\/home-song-player';/);
  assert.match(dockComp, /<HomeSongPlayer \/>/);
  assert.match(dockComp, /href="\/materials\/"/);
  assert.match(dockComp, /获取资料/);
  assert.match(dockComp, /id=\{MATERIALS_POPOVER_ID\} popover="auto"/);
  assert.match(dockComp, /popoverTarget=\{MATERIALS_POPOVER_ID\}/);
  assert.match(dockComp, /popoverTargetAction="hide"/);
  assert.match(dockComp, /materialsContact\.qrImage/);

  // 播放器在上方，资料入口在最低一行
  const playerIndex = dockComp.indexOf('<HomeSongPlayer />');
  const materialsIndex = dockComp.indexOf('popoverTarget={MATERIALS_POPOVER_ID}');
  assert.ok(playerIndex !== -1 && materialsIndex !== -1, '缺少播放器或资料链接');
  assert.ok(playerIndex < materialsIndex, '播放器应在资料入口上方，资料入口位于最低一行');
});

