import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const target = resolve('public/audio/xiang-an.mp3');
const expectedSize = 5_018_262;
const expectedHash = '2e1a4f4935214bbcd9ec5a945131be20784ad4f5b8d3752b46b75d7a7cf753f2';

let bytes;
try {
  bytes = await readFile(target);
} catch (error) {
  if (error?.code === 'ENOENT') {
    throw new Error('缺少已纳入版本控制的音频：public/audio/xiang-an.mp3');
  }
  throw error;
}

if (bytes.byteLength !== expectedSize) {
  throw new Error(`音频文件大小无效：${bytes.byteLength} bytes，预期 ${expectedSize} bytes`);
}

if (bytes.subarray(0, 3).toString('ascii') !== 'ID3') {
  throw new Error('音频文件签名无效：预期 ID3 MP3');
}

const actualHash = createHash('sha256').update(bytes).digest('hex');
if (actualHash !== expectedHash) {
  throw new Error(`音频文件 SHA-256 无效：${actualHash}`);
}

console.log(`Audio verified: public/audio/xiang-an.mp3 (${expectedSize} bytes, SHA-256 ${expectedHash})`);
