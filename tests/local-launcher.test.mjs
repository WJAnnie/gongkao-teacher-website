import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('binds to LAN without changing firewall rules', async () => {
  const source = await readFile(new URL('../scripts/start-local.ps1', import.meta.url), 'utf8');
  assert.equal(source.charCodeAt(0), 0xfeff);
  assert.match(source, /--hostname[',\s]+0\.0\.0\.0/);
  assert.match(source, /Get-NetIPAddress[\s\S]*-ErrorAction SilentlyContinue/);
  assert.doesNotMatch(source, /New-NetFirewallRule|netsh\s+advfirewall/i);
});
