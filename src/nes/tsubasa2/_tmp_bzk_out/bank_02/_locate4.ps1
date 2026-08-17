$ErrorActionPreference = 'Continue'
$files = Get-ChildItem -Path 'd:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_bzk_out/bank_02' -Filter 'bank_02_part*.asm'
foreach ($f in $files) {
  $first = (Select-String -LiteralPath $f.FullName -Pattern '0x00[0-9A-F]{4} ' | Select-Object -First 1)
  $last  = (Select-String -LiteralPath $f.FullName -Pattern '0x00[0-9A-F]{4} ' | Select-Object -Last 1)
  Write-Output ("{0} first={1} last={2}" -f $f.Name, $first.Line.Trim(), $last.Line.Trim())
}
Write-Output "DONE"
