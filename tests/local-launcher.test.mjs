import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const launcherPath = fileURLToPath(new URL('../start-local.cmd', import.meta.url));
const projectRoot = dirname(launcherPath);

test('binds to LAN without changing firewall rules', async () => {
  const source = await readFile(new URL('../scripts/start-local.ps1', import.meta.url), 'utf8');
  const viteConfig = await readFile(new URL('../vite.config.ts', import.meta.url), 'utf8');
  assert.equal(source.charCodeAt(0), 0xfeff);
  assert.match(source, /--hostname[',\s]+0\.0\.0\.0/);
  assert.match(source, /TcpListener/);
  assert.match(source, /IPAddress\]::Any/);
  assert.match(source, /ExclusiveAddressUse\s*=\s*\$true/);
  assert.match(source, /NetworkInterface/);
  assert.match(viteConfig, /strictPort:\s*true/);
  assert.doesNotMatch(source, /--strictPort/);
  assert.doesNotMatch(source, /New-NetFirewallRule|netsh\s+advfirewall/i);
});

test('propagates npm dev failures through both Windows launchers', { skip: process.platform !== 'win32' }, async () => {
  const shimDirectory = await mkdtemp(join(tmpdir(), 'gongkao-launcher-'));
  try {
    await writeFile(join(shimDirectory, 'node.cmd'), '@echo off\r\nexit /b 0\r\n', 'utf8');
    await writeFile(join(shimDirectory, 'npm.cmd'), '@echo off\r\nexit /b 23\r\n', 'utf8');
    const result = spawnSync(
      process.env.ComSpec ?? 'cmd.exe',
      ['/d', '/s', '/c', 'call', launcherPath],
      {
        cwd: projectRoot,
        env: { ...process.env, PATH: `${shimDirectory};${process.env.PATH ?? ''}` },
        input: '\r\n',
        encoding: 'utf8',
      },
    );
    assert.equal(result.status, 23, `${result.stdout}\n${result.stderr}`);
  } finally {
    await rm(shimDirectory, { recursive: true, force: true });
  }
});
