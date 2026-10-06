import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawn } from 'node:child_process';

export const BRACES_EXCEPTION = Object.freeze({
  advisoryId: 'GHSA-vfj7-8cjw-p6xm',
  packageName: 'braces',
  expiresOn: '2026-11-06',
});

export class AuditValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuditValidationError';
  }
}

function fail(message) {
  throw new AuditValidationError(message);
}

function advisoryIdFromVia(via) {
  if (!via || typeof via !== 'object') return null;
  if (typeof via.id === 'string' && via.id.startsWith('GHSA-')) return via.id;
  if (typeof via.url === 'string') {
    const match = via.url.match(/GHSA-[a-z0-9-]+/i);
    if (match) return match[0];
  }
  if (typeof via.source === 'string' && via.source.startsWith('GHSA-')) return via.source;
  return null;
}

function assertExceptionIsCurrent(now) {
  if (!(now instanceof Date) || Number.isNaN(now.getTime())) {
    fail('依赖审计日期无效，不能判断 braces 例外是否到期。');
  }
  const expiry = Date.parse(`${BRACES_EXCEPTION.expiresOn}T23:59:59.999Z`);
  if (Number.isNaN(expiry)) fail('依赖审计例外日期配置无效。');
  if (now.getTime() > expiry) {
    fail(`依赖审计例外已在 ${BRACES_EXCEPTION.expiresOn} 到期，请重新核对 npm advisory。`);
  }
}

function assertDevNodes(lock, vulnerability) {
  if (!Array.isArray(vulnerability.nodes) || vulnerability.nodes.length === 0) {
    fail(`漏洞 ${vulnerability.name ?? '<unknown>'} 缺少 package-lock 节点，不能确认只影响开发依赖。`);
  }

  for (const nodePath of vulnerability.nodes) {
    const node = lock.packages?.[nodePath];
    if (!node) fail(`package-lock.json 缺少审计节点：${nodePath}`);
    if (node.dev !== true) fail(`漏洞节点 ${nodePath} 不是开发依赖，不能使用 braces 例外。`);
  }
}

function collectViaAdvisories(vulnerabilities, packageName, stack = []) {
  if (stack.includes(packageName)) {
    fail(`npm audit via 链存在循环：${[...stack, packageName].join(' -> ')}`);
  }

  const vulnerability = vulnerabilities[packageName];
  if (!vulnerability) fail(`npm audit via 引用了未知漏洞节点：${packageName}`);
  assertDevNodes(this.lock, vulnerability);

  const via = Array.isArray(vulnerability.via) ? vulnerability.via : [];
  if (via.length === 0) fail(`漏洞 ${packageName} 没有底层 advisory，不能使用例外。`);

  const nextStack = [...stack, packageName];
  const advisoryIds = [];
  for (const item of via) {
    if (typeof item === 'string') {
      advisoryIds.push(...collectViaAdvisories.call(this, vulnerabilities, item, nextStack));
      continue;
    }

    const advisoryId = advisoryIdFromVia(item);
    if (!advisoryId) fail(`漏洞 ${packageName} 包含无法识别的 advisory。`);
    advisoryIds.push(advisoryId);
  }

  return advisoryIds;
}

function vulnerabilityTotal(audit) {
  const total = audit.metadata?.vulnerabilities?.total;
  if (!Number.isInteger(total) || total < 0) {
    fail('npm audit metadata.vulnerabilities.total 必须是非负整数。');
  }
  return total;
}

export function validateAuditReport(audit, lock, { now = new Date() } = {}) {
  if (!audit || typeof audit !== 'object') fail('npm audit 输出不是有效 JSON 对象。');
  if (audit.error) {
    const summary = audit.error.summary || audit.error.message || JSON.stringify(audit.error);
    fail(`npm registry 审计失败：${summary}`);
  }

  if (!lock || typeof lock !== 'object' || !lock.packages || typeof lock.packages !== 'object') {
    fail('package-lock.json 缺少 packages 节点。');
  }

  if (!Object.hasOwn(audit, 'vulnerabilities')) {
    fail('npm audit 缺少 vulnerabilities 对象。');
  }
  const vulnerabilities = audit.vulnerabilities;
  if (typeof vulnerabilities !== 'object' || Array.isArray(vulnerabilities)) {
    fail('npm audit vulnerabilities 结构无效。');
  }

  if (vulnerabilityTotal(audit) === 0 && Object.keys(vulnerabilities).length === 0) {
    return {
      ok: true,
      exceptionUsed: false,
      report: 'npm audit 通过：生产依赖无漏洞；开发依赖无漏洞。',
    };
  }

  assertExceptionIsCurrent(now);

  const context = { lock };
  const vulnerabilityNames = Object.keys(vulnerabilities);
  const allAdvisoryIds = new Set();
  const touchedPackages = new Set();

  for (const packageName of vulnerabilityNames) {
    touchedPackages.add(packageName);
    const vulnerability = vulnerabilities[packageName];
    assertDevNodes(lock, vulnerability);
    const ids = collectViaAdvisories.call(context, vulnerabilities, packageName);
    for (const id of ids) allAdvisoryIds.add(id);
  }

  if (![...allAdvisoryIds].every((id) => id === BRACES_EXCEPTION.advisoryId)) {
    fail(`发现非允许 advisory：${[...allAdvisoryIds].join(', ') || '<none>'}`);
  }

  if (!touchedPackages.has(BRACES_EXCEPTION.packageName)) {
    fail(`只允许 ${BRACES_EXCEPTION.packageName} 的 ${BRACES_EXCEPTION.advisoryId} 开发依赖例外。`);
  }

  for (const packageName of touchedPackages) {
    const vulnerability = vulnerabilities[packageName];
    if (packageName === BRACES_EXCEPTION.packageName) continue;
    const via = Array.isArray(vulnerability.via) ? vulnerability.via : [];
    if (!via.every((item) => typeof item === 'string' && touchedPackages.has(item))) {
      fail(`漏洞 ${packageName} 不是可追踪到 braces 的开发依赖链。`);
    }
  }

  return {
    ok: true,
    exceptionUsed: true,
    report: `npm audit 通过：开发工具 braces 尚无补丁，只匹配 ${BRACES_EXCEPTION.advisoryId} 开发依赖例外；生产依赖无漏洞。例外到期日：${BRACES_EXCEPTION.expiresOn}。`,
  };
}

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

function npmCliCandidates() {
  const candidates = [];
  if (process.env.npm_execpath?.endsWith('npm-cli.js')) candidates.push(process.env.npm_execpath);
  const nodeDir = dirname(process.execPath);
  candidates.push(join(nodeDir, 'node_modules', 'npm', 'bin', 'npm-cli.js'));
  candidates.push(join(dirname(nodeDir), 'node_modules', 'npm', 'bin', 'npm-cli.js'));
  return candidates;
}

function findNpmCli() {
  const npmCli = npmCliCandidates().find((candidate) => existsSync(candidate));
  if (!npmCli) {
    fail('找不到 npm-cli.js，拒绝直接 spawn npm.cmd。请确认 Node.js 安装包含 npm。');
  }
  return npmCli;
}

export function parseNpmAuditProcessResult({ code, signal, stdout, stderr = '' }) {
  if (signal) {
    throw new Error(`npm audit 被信号 ${signal} 终止。${stderr.trim()}`);
  }
  if (code !== 0 && code !== 1) {
    throw new Error(`npm audit 执行失败，退出码 ${code}。${stderr.trim() || stdout.trim()}`);
  }
  if (!stdout.trim()) {
    throw new Error(`npm audit 未产生 JSON 输出，退出码 ${code}。${stderr.trim()}`);
  }
  try {
    return { audit: JSON.parse(stdout), code, stderr };
  } catch (error) {
    throw new Error(`npm audit JSON 解析失败，退出码 ${code}：${error.message}`);
  }
}

function runNpmAudit() {
  const npmCli = findNpmCli();
  const child = spawn(process.execPath, [npmCli, 'audit', '--json', '--audit-level=low'], {
    cwd: process.cwd(),
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  let stdout = '';
  let stderr = '';
  child.stdout.setEncoding('utf8');
  child.stderr.setEncoding('utf8');
  child.stdout.on('data', (chunk) => {
    stdout += chunk;
  });
  child.stderr.on('data', (chunk) => {
    stderr += chunk;
  });

  return new Promise((resolveAudit, reject) => {
    child.on('error', reject);
    child.on('close', (code, signal) => {
      try {
        resolveAudit(parseNpmAuditProcessResult({ code, signal, stdout, stderr }));
      } catch (error) {
        reject(error);
      }
    });
  });
}

export async function auditDependencies({ lockFile = 'package-lock.json', now = new Date() } = {}) {
  const [{ audit }, lock] = await Promise.all([runNpmAudit(), readJson(lockFile)]);
  return validateAuditReport(audit, lock, { now });
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const result = await auditDependencies();
    console.log(result.report);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
