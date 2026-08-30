$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing
$root = Split-Path -Parent $PSScriptRoot
$source = Join-Path $root 'public\og.png'
$target = Join-Path $root 'public\og.jpg'
$image = [System.Drawing.Image]::FromFile($source)
try {
  if ($image.Width -ne 1200 -or $image.Height -ne 630) { throw '分享图必须保持 1200×630。' }
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
  $parameters = New-Object System.Drawing.Imaging.EncoderParameters 1
  $parameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]88)
  $image.Save($target, $codec, $parameters)
} finally {
  $image.Dispose()
}
if ((Get-Item $target).Length -gt 500000) { throw '优化后的分享图超过 500 KB。' }
