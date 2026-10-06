import test from 'node:test';
import assert from 'node:assert/strict';
import { AuditValidationError, parseNpmAuditProcessResult, validateAuditReport } from '../scripts/audit-dependencies.mjs';

const advisory = {
  source: 1101671,
  name: 'braces',
  dependency: 'braces',
  title: 'Uncontrolled resource consumption in braces',
  url: 'https://github.com/advisories/GHSA-vfj7-8cjw-p6xm',
  severity: 'high',
  range: '<=3.0.3',
};

function audit(vulnerabilities) {
  return {
    auditReportVersion: 2,
    vulnerabilities,
    metadata: { vulnerabilities: { total: Object.keys(vulnerabilities).length } },
  };
}

function lock(packages) {
  return { lockfileVersion: 3, packages };
}

function vuln(name, nodes, via = [advisory]) {
  return {
    name,
    severity: 'high',
    isDirect: false,
    via,
    effects: [],
    range: '<=3.0.3',
    nodes,
    fixAvailable: false,
  };
}

function assertAuditFails(auditJson, lockJson, message, now = new Date('2026-10-06T00:00:00Z')) {
  assert.throws(
    () => validateAuditReport(auditJson, lockJson, { now }),
    (error) => error instanceof AuditValidationError && error.message.includes(message),
  );
}

test('passes when npm audit reports zero vulnerabilities', () => {
  const result = validateAuditReport(audit({}), lock({}), { now: new Date('2026-10-06T00:00:00Z') });

  assert.equal(result.ok, true);
  assert.equal(result.exceptionUsed, false);
  assert.match(result.report, /开发依赖无漏洞/);
});

test('allows only the known braces advisory when every related node is dev-only', () => {
  const result = validateAuditReport(
    audit({
      micromatch: vuln('micromatch', ['node_modules/micromatch'], ['braces']),
      braces: vuln('braces', ['node_modules/micromatch/node_modules/braces']),
    }),
    lock({
      'node_modules/micromatch': { version: '4.0.8', dev: true },
      'node_modules/micromatch/node_modules/braces': { version: '3.0.3', dev: true },
    }),
    { now: new Date('2026-10-06T00:00:00Z') },
  );

  assert.equal(result.ok, true);
  assert.equal(result.exceptionUsed, true);
  assert.match(result.report, /开发工具 braces 尚无补丁/);
  assert.match(result.report, /生产依赖无漏洞/);
  assert.doesNotMatch(result.report, /全依赖零漏洞/);
});

test('fails when the vulnerable node is production dependency', () => {
  assertAuditFails(
    audit({ braces: vuln('braces', ['node_modules/braces']) }),
    lock({ 'node_modules/braces': { version: '3.0.3' } }),
    '不是开发依赖',
  );
});

test('fails when a new advisory appears', () => {
  assertAuditFails(
    audit({
      braces: vuln('braces', ['node_modules/braces'], [
        { ...advisory, url: 'https://github.com/advisories/GHSA-xxxx-yyyy-zzzz' },
      ]),
    }),
    lock({ 'node_modules/braces': { version: '3.0.3', dev: true } }),
    '非允许 advisory',
  );
});

test('fails when audit references a node missing from package-lock', () => {
  assertAuditFails(
    audit({ braces: vuln('braces', ['node_modules/braces']) }),
    lock({}),
    '缺少审计节点',
  );
});

test('fails after the exception expiry date', () => {
  assertAuditFails(
    audit({ braces: vuln('braces', ['node_modules/braces']) }),
    lock({ 'node_modules/braces': { version: '3.0.3', dev: true } }),
    '已在 2026-11-06 到期',
    new Date('2026-11-07T00:00:00Z'),
  );
});

test('fails registry errors instead of treating them as clean audits', () => {
  assertAuditFails(
    { error: { code: 'E500', summary: 'registry unavailable' } },
    lock({}),
    'npm registry 审计失败',
  );
});

test('fails malformed audit JSON instead of treating it as zero vulnerabilities', () => {
  assertAuditFails(
    {},
    lock({}),
    '缺少 vulnerabilities 对象',
  );

  assertAuditFails(
    { vulnerabilities: {}, metadata: { vulnerabilities: {} } },
    lock({}),
    'metadata.vulnerabilities.total 必须是非负整数',
  );

  assertAuditFails(
    { vulnerabilities: {}, metadata: { vulnerabilities: { total: -1 } } },
    lock({}),
    'metadata.vulnerabilities.total 必须是非负整数',
  );
});

test('fails invalid dates before allowing the temporary braces exception', () => {
  assertAuditFails(
    audit({ braces: vuln('braces', ['node_modules/braces']) }),
    lock({ 'node_modules/braces': { version: '3.0.3', dev: true } }),
    '日期无效',
    new Date('not-a-date'),
  );
});

test('fails npm audit process errors even when stdout looks clean', () => {
  const cleanStdout = JSON.stringify(audit({}));

  assert.throws(
    () => parseNpmAuditProcessResult({ code: 2, signal: null, stdout: cleanStdout, stderr: 'registry failed' }),
    /退出码 2/,
  );

  assert.throws(
    () => parseNpmAuditProcessResult({ code: 0, signal: 'SIGTERM', stdout: cleanStdout, stderr: '' }),
    /SIGTERM/,
  );
});

test('fails unknown via nodes and via cycles', () => {
  assertAuditFails(
    audit({ braces: vuln('braces', ['node_modules/braces'], ['missing-package']) }),
    lock({ 'node_modules/braces': { version: '3.0.3', dev: true } }),
    '未知漏洞节点',
  );

  assertAuditFails(
    audit({
      braces: vuln('braces', ['node_modules/braces'], ['micromatch']),
      micromatch: vuln('micromatch', ['node_modules/micromatch'], ['braces']),
    }),
    lock({
      'node_modules/braces': { version: '3.0.3', dev: true },
      'node_modules/micromatch': { version: '4.0.8', dev: true },
    }),
    '存在循环',
  );
});
