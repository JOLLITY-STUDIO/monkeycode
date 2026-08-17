$dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_bzk_out/bank_02'
$out = 'd:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_bzk_out/bank_02/_find_scroll2.txt'
$lines = @()
foreach ($f in @('bank_02_part01.asm','bank_02_part02.asm')) {
  $p = Join-Path $dir $f
  $aa = Get-Content $p
  foreach ($pat in @('8ADF','8AE0')) {
    $m = Select-String -Path $p -Pattern $pat
    $lines += ("##### {0} | {1} : {2} hits #####" -f $f, $pat, $m.Count)
    foreach ($x in $m) {
      $ln = $x.LineNumber
      $start = [Math]::Max(0, $ln - 6)
      $end = [Math]::Min($aa.Count - 1, $ln + 6)
      $lines += ("--- line {0}: {1}" -f $ln, $x.Line.Trim())
      for ($j = $start; $j -le $end; $j++) { $lines += ("  {0}|{1}" -f ($j + 1), $aa[$j].Trim()) }
    }
  }
}
# also dump 8303 scroll loop region in part01
$p1 = Join-Path $dir 'bank_02_part01.asm'
$aa1 = Get-Content $p1
$m = Select-String -Path $p1 -Pattern '8303|82E5|8333|82F3'
$lines += ''
$lines += ("##### part01 scroll region (8303) hits: {0} #####" -f $m.Count)
foreach ($x in $m) {
  $ln = $x.LineNumber
  $start = [Math]::Max(0, $ln - 8)
  $end = [Math]::Min($aa1.Count - 1, $ln + 60)
  $lines += ("--- line {0} ---" -f $ln)
  for ($j = $start; $j -le $end; $j++) { $lines += ("{0}|{1}" -f ($j + 1), $aa1[$j]) }
}
$lines | Out-File -Encoding utf8 $out
Write-Output "done -> $out"
