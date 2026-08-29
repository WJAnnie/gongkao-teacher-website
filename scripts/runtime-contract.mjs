export const MINIMUM_NODE = Object.freeze({ major: 22, minor: 13, patch: 0 });

export function parseNodeVersion(value) {
  const match = /^v?(\d+)\.(\d+)\.(\d+)$/.exec(value.trim());
  if (!match) throw new Error(`无法识别 Node.js 版本：${value}`);
  return { major: Number(match[1]), minor: Number(match[2]), patch: Number(match[3]) };
}

export function assertSupportedNode(value = process.version) {
  const current = parseNodeVersion(value);
  const score = ({ major, minor, patch }) => major * 1_000_000 + minor * 1_000 + patch;
  if (score(current) < score(MINIMUM_NODE)) throw new Error(`需要 Node.js 22.13.0 或更高版本，当前为 ${value}。请先升级 Node.js。`);
  return current;
}
