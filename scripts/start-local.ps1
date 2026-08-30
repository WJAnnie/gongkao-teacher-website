$ErrorActionPreference = 'Stop'

function Test-TcpPortAvailable {
  param([Parameter(Mandatory = $true)][int]$Port)

  $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $Port)
  $listener.ExclusiveAddressUse = $true
  try {
    $listener.Start()
    return $true
  } catch [System.Net.Sockets.SocketException] {
    return $false
  } finally {
    $listener.Stop()
  }
}

function Get-PreferredLanAddress {
  try {
    $lanInterfaceTypes = @(
      [System.Net.NetworkInformation.NetworkInterfaceType]::Ethernet,
      [System.Net.NetworkInformation.NetworkInterfaceType]::FastEthernetFx,
      [System.Net.NetworkInformation.NetworkInterfaceType]::FastEthernetT,
      [System.Net.NetworkInformation.NetworkInterfaceType]::GigabitEthernet,
      [System.Net.NetworkInformation.NetworkInterfaceType]::Wireless80211
    )
    foreach ($adapter in [System.Net.NetworkInformation.NetworkInterface]::GetAllNetworkInterfaces()) {
      if ($adapter.OperationalStatus -ne [System.Net.NetworkInformation.OperationalStatus]::Up) { continue }
      if ($adapter.NetworkInterfaceType -notin $lanInterfaceTypes) { continue }

      $properties = $adapter.GetIPProperties()
      $hasIpv4Gateway = $properties.GatewayAddresses | Where-Object {
        $_.Address.AddressFamily -eq [System.Net.Sockets.AddressFamily]::InterNetwork -and
        $_.Address.ToString() -ne '0.0.0.0'
      }
      if (-not $hasIpv4Gateway) { continue }

      foreach ($unicast in $properties.UnicastAddresses) {
        $address = $unicast.Address
        if ($address.AddressFamily -ne [System.Net.Sockets.AddressFamily]::InterNetwork) { continue }
        $value = $address.ToString()
        if ($value -notmatch '^(127\.|169\.254\.)') { return $value }
      }
    }
  } catch {
    # LAN URL display is advisory; localhost startup must remain available.
  }

  return $null
}

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

& node scripts/runtime-contract.mjs
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

$npmCommand = (Get-Command npm.cmd -ErrorAction Stop).Source
if (-not (Test-Path 'node_modules\vinext\dist\cli.js')) {
  & $npmCommand ci
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

& node scripts/vendor-home-audio.mjs
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

$port = 3000
while (-not (Test-TcpPortAvailable -Port $port)) {
  $port += 1
}

$lanAddress = Get-PreferredLanAddress

Write-Host "本机访问：http://localhost:$port/"
if ($lanAddress) {
  Write-Host "同一局域网手机访问：http://${lanAddress}:$port/"
}
Write-Host '脚本不会修改防火墙；无法访问时请检查网络设备互访设置。'

& $npmCommand run dev -- --hostname 0.0.0.0 --port $port
exit $LASTEXITCODE
