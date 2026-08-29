$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

& node scripts/runtime-contract.mjs
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

$npmCommand = (Get-Command npm.cmd -ErrorAction Stop).Source
if (-not (Test-Path 'node_modules\vinext\dist\cli.js')) {
  & $npmCommand ci
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

$port = 3000
while (Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue) {
  $port += 1
}

$lanAddress = Get-NetIPAddress -AddressFamily IPv4 -AddressState Preferred -ErrorAction SilentlyContinue |
  Where-Object { $_.IPAddress -notmatch '^(127\.|169\.254\.)' } |
  Select-Object -First 1 -ExpandProperty IPAddress

Write-Host "本机访问：http://localhost:$port/"
if ($lanAddress) {
  Write-Host "同一局域网手机访问：http://${lanAddress}:$port/"
}
Write-Host '脚本不会修改防火墙；无法访问时请检查网络设备互访设置。'

& $npmCommand run dev -- --hostname 0.0.0.0 --port $port --strictPort
