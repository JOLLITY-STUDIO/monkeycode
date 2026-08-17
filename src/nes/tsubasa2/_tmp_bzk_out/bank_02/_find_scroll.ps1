$asm = 'd:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_bzk_out/bank_02/bank_02_part02.asm'
$out = 'd:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_bzk_out/bank_02/_find_scroll.txt'
$aa = Get-Content $asm
$lines = @()
foreach ($pat in @('8ADF','8AE0','4ADF','4AE0','AADF','AAE0')) {
  $m = Select-String -Path $asm -Pattern $pat
  if ($m) {
    $lines += ("##### pattern {0} : {1} hits #####" -f $pat, $m.Count)
    $n = 0
    foreach ($x in $m) {
      $lines += ("{0}|{1}" -f $x.LineNumber, $x.Line)
      $n++
      if ($n -ge 20) { break }
    }
  }
}
$total = $aa.Count
$lines += ''
$lines += ("=== part02 tail from {0} to {1} ===" -f ($total - 150), $total)
for ($j = $total - 150; $j -lt $total; $j++) { $lines += ("{0}|{1}" -f ($j + 1), $aa[$j]) }
$lines | Out-File -Encoding utf8 $out
Write-Output "done -> $out"
