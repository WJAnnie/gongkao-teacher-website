import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { HOME_SONG, getAudioPreload, getLyricIndex } from '../app/home-song-data.ts';

const [player, vendorScript, localLauncher, pagesWorkflow, edgeWorkflow, previewWorkflow] = await Promise.all([
  readFile(new URL('../app/home-song-player.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../scripts/vendor-home-audio.mjs', import.meta.url), 'utf8').catch(() => ''),
  readFile(new URL('../scripts/start-local.ps1', import.meta.url), 'utf8'),
  readFile(new URL('../.github/workflows/deploy-pages.yml', import.meta.url), 'utf8'),
  readFile(new URL('../.github/workflows/deploy-edgeone.yml', import.meta.url), 'utf8'),
  readFile(new URL('../.github/workflows/deploy-preview-edgeone.yml', import.meta.url), 'utf8'),
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

test('vendor script validates and atomically installs a real audio asset', () => {
  assert.match(vendorScript, /public\/audio\/xiang-an\.mp3/);
  assert.match(vendorScript, /'User-Agent':\s*'Mozilla\/5\.0'/);
  assert.match(vendorScript, /Referer:\s*'https:\/\/suno\.com\/'/);
  assert.match(vendorScript, /contentType\.startsWith\('audio\/'\)/);
  assert.match(vendorScript, /bytes\.byteLength < 1_000_000/);
  assert.match(vendorScript, /await rename\(temporary, target\)/);
});

test('local and hosted builds vendor audio before starting or building', () => {
  const vendorCommand = 'node scripts/vendor-home-audio.mjs';
  assert.ok(localLauncher.indexOf(vendorCommand) < localLauncher.indexOf('$npmCommand run dev'));
  for (const workflow of [pagesWorkflow, edgeWorkflow, previewWorkflow]) {
    const vendorIndex = workflow.indexOf(vendorCommand);
    const buildIndex = workflow.indexOf('npm run build:static');
    assert.ok(vendorIndex >= 0 && vendorIndex < buildIndex);
  }
});
