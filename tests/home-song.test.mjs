import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { HOME_SONG, getAudioPreload, getHomeSongSource, getLyricIndex } from '../app/home-song-data.ts';

const [player, vendorScript, audioAsset, localLauncher, pagesWorkflow, edgeWorkflow, previewWorkflow, lyricsWorkflow] = await Promise.all([
  readFile(new URL('../app/home-song-player.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../scripts/vendor-home-audio.mjs', import.meta.url), 'utf8').catch(() => ''),
  readFile(new URL('../public/audio/xiang-an.mp3', import.meta.url)).catch(() => null),
  readFile(new URL('../scripts/start-local.ps1', import.meta.url), 'utf8'),
  readFile(new URL('../.github/workflows/deploy-pages.yml', import.meta.url), 'utf8'),
  readFile(new URL('../.github/workflows/deploy-edgeone.yml', import.meta.url), 'utf8'),
  readFile(new URL('../.github/workflows/deploy-preview-edgeone.yml', import.meta.url), 'utf8'),
  readFile(new URL('../.github/workflows/audit-xiangan-lyrics.yml', import.meta.url), 'utf8'),
]);

test('lyrics are strictly ordered inside duration', () => {
  for (let index = 1; index < HOME_SONG.lyrics.length; index += 1) {
    assert.ok(HOME_SONG.lyrics[index].at > HOME_SONG.lyrics[index - 1].at);
  }
  assert.ok(HOME_SONG.lyrics.at(-1).at < HOME_SONG.fallbackDuration);
});

test('preload respects save-data', () => {
  assert.equal(getAudioPreload(false), 'auto');
  assert.equal(getAudioPreload(true), 'metadata');
});

test('audio source includes the explicit build base path', () => {
  assert.equal(getHomeSongSource(''), '/audio/xiang-an.mp3');
  assert.equal(getHomeSongSource('/gongkao-teacher-website'), '/gongkao-teacher-website/audio/xiang-an.mp3');
});

test('lyric index derives from audio time', () => {
  assert.equal(getLyricIndex(0), -1);
  assert.equal(getLyricIndex(HOME_SONG.lyrics[1].at), 1);
});

test('player resolves the same-origin song without requesting it before user intent', () => {
  assert.match(player, /import \{ HOME_SONG, getAudioPreload, getLyricIndex \}/);
  assert.match(player, /navigator[^\n]+connection\?\.saveData/);
  assert.match(player, /ref=\{sourceLinkRef\}/);
  assert.match(player, /href=\{HOME_SONG\.src\}/);
  assert.match(player, /audio\.src = source/);
  assert.doesNotMatch(player, /<audio[\s\S]{0,160}src=\{HOME_SONG\.src\}/);
  assert.match(player, /preload=\{getAudioPreload\(saveData\)\}/);
  assert.doesNotMatch(player, /https:\/\/cdn1\.suno\.ai/);
});

test('only the visible play control may start playback and failures can retry', () => {
  assert.equal(player.match(/\.play\(\)/g)?.length, 1);
  assert.match(player, /onClick=\{togglePlay\}/);
  assert.doesNotMatch(player, /addEventListener\(['"](?:pointerdown|keydown)['"]/);
  assert.match(player, /if \(audioRef\.current\?\.error\) setAudioError\(true\)/);
  assert.match(player, /className="home-song-error" role="status"/);
  assert.match(player, /const reloadAudio = \(\) =>/);
  assert.match(player, /ensureAudioSource\(audio\);\s*audio\.load\(\)/);
  assert.match(player, /onClick=\{reloadAudio\}/);
});

test('checked-in audio is the exact recovered Xiangan recording', () => {
  assert.ok(audioAsset, 'public/audio/xiang-an.mp3 must be checked in');
  assert.equal(audioAsset.byteLength, 5_018_262);
  assert.equal(audioAsset.subarray(0, 3).toString('ascii'), 'ID3');
  assert.equal(
    createHash('sha256').update(audioAsset).digest('hex'),
    '2e1a4f4935214bbcd9ec5a945131be20784ad4f5b8d3752b46b75d7a7cf753f2',
  );
});

test('vendor script only verifies the immutable local audio asset', () => {
  assert.match(vendorScript, /public\/audio\/xiang-an\.mp3/);
  assert.match(vendorScript, /createHash\('sha256'\)/);
  assert.match(vendorScript, /5_018_262/);
  assert.match(vendorScript, /2e1a4f4935214bbcd9ec5a945131be20784ad4f5b8d3752b46b75d7a7cf753f2/i);
  assert.match(vendorScript, /ID3/);
  assert.doesNotMatch(vendorScript, /\bfetch\s*\(/);
  assert.doesNotMatch(vendorScript, /https?:\/\/|suno\.ai/i);
  assert.doesNotMatch(vendorScript, /\.download|writeFile|rename/);
});

test('local and hosted builds verify audio before starting or building', () => {
  const vendorCommand = 'node scripts/vendor-home-audio.mjs';
  assert.ok(localLauncher.indexOf(vendorCommand) < localLauncher.indexOf('$npmCommand run dev'));
  for (const workflow of [pagesWorkflow, edgeWorkflow, previewWorkflow]) {
    const vendorIndex = workflow.indexOf(vendorCommand);
    const buildIndex = workflow.indexOf('npm run build:static');
    const auditIndex = workflow.indexOf('npm audit --audit-level=low');
    assert.ok(vendorIndex >= 0 && vendorIndex < buildIndex);
    assert.ok(auditIndex >= 0 && auditIndex < buildIndex);
    assert.match(workflow, /name: Verify Xiangan audio/);
    assert.doesNotMatch(workflow, /name: Vendor Xiangan audio/);
  }
  assert.match(lyricsWorkflow, /uses: actions\/checkout@v4/);
  assert.match(lyricsWorkflow, /public\/audio\/xiang-an\.mp3/);
  assert.doesNotMatch(lyricsWorkflow, /curl|cdn1\.suno\.ai|Download exact audio/);
  for (const path of [
    'public/audio/xiang-an.mp3',
    'scripts/vendor-home-audio.mjs',
    'app/home-song-data.ts',
  ]) {
    assert.match(lyricsWorkflow, new RegExp(`- '${path.replaceAll('.', '\\.').replaceAll('/', '\\/')}'`));
  }
});
