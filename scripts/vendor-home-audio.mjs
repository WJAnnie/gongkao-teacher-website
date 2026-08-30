import { mkdir, rename, stat, unlink, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const source = 'https://cdn1.suno.ai/9699b383-feba-4acb-80af-38c15fe7dfd8.mp3';
const target = resolve('public/audio/xiang-an.mp3');
const temporary = `${target}.download`;
let currentSize = 0;
try { currentSize = (await stat(target)).size; } catch {}
if (currentSize < 1_000_000) {
  const response = await fetch(source, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      Referer: 'https://suno.com/',
    },
  });
  if (!response.ok) throw new Error(`音频下载失败：HTTP ${response.status}`);
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.startsWith('audio/')) throw new Error(`音频类型无效：${contentType}`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.byteLength < 1_000_000) throw new Error(`音频文件异常：${bytes.byteLength} bytes`);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(temporary, bytes);
  try { await unlink(target); } catch {}
  await rename(temporary, target);
  currentSize = bytes.byteLength;
}
console.log(`Audio ready: public/audio/xiang-an.mp3 (${currentSize} bytes)`);
