$log = 'd:\studio\github\monkeycode\src\nes\tsubasa2\docs\roms\tecmo\13.log'
$bytes = [System.IO.File]::ReadAllBytes($log)
$text = [System.Text.Encoding]::UTF8.GetString($bytes)
$lines = $text -split "`n"
$cur = 0
$pcs = @{}
foreach ($l in $lines) {
  if ($l -match '^f(\d+)\s') { $cur = [int]$Matches[1]; continue }
  if ($cur -ge 1 -and $cur -le 13) {
    if ($l -match '\$([0-9A-Fa-f]{2}):([[0-9A-Fa-f]{4}):') {
      $pc = $Matches[2].ToUpper()
      if (-not $pcs.ContainsKey($pc)) { $pcs[$pc] = 0 }
      $pcs[$pc]++
    }
  }
}
Write-Host "=== f1-f13 PRG PC distribution ==="
$pcs.Keys | Sort-Object | ForEach-Object { Write-Host ("`$$_`: {0} hits" -f $pcs[$_]) }
