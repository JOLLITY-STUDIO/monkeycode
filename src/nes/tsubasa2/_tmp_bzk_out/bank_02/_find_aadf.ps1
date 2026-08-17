$svc = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/service/bank02_scene.service.ts'
$asm = 'd:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_bzk_out/bank_02/bank_02_part02.asm'
$out = 'd:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_bzk_out/bank_02/_find_aadf.txt'
$lines = @()
$c = Get-Content $svc
for ($i = 0; $i -lt $c.Count; $i++) {
  if ($c[$i] -match '_readTable_AADF|_readTable_AAE0') {
    $start = [Math]::Max(0, $i - 6)
    $end = [Math]::Min($c.Count - 1, $i + 14)
    $lines += ("=== svc line {0} ===" -f ($i + 1))
    for ($j = $start; $j -le $end; $j++) { $lines += ("{0}|{1}" -f ($j + 1), $c[$j]) }
  }
}
$lines += ''
$lines += '=== asm AADF/AAE0 ==='
$m = Select-String -Path $asm -Pattern 'AADF|AAE0'
foreach ($x in $m) {
  $ln = $x.LineNumber
  $start = [Math]::Max(0, $ln - 4)
  $end = [Math]::Min((Get-Content $asm).Count - 1, $ln + 40)
  $aa = Get-Content $asm
  $lines += ("--- asm line {0} ---" -f $ln)
  for ($j = $start; $j -le $end; $j++) { $lines += ("{0}|{1}" -f ($j + 1), $aa[$j]) }
}
$lines | Out-File -Encoding utf8 $out
Write-Output "done -> $out"
