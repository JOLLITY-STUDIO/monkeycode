$dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_bzk_out/bank_07'
$out = 'd:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_bzk_out/bank_07/_layout.txt'
$lines = @()
# dump first 120 lines of each part to find data structures / pointer tables
foreach ($f in (Get-ChildItem $dir -Filter 'bank_07_part*.asm' | Sort-Object Name)) {
  $aa = Get-Content $f.FullName
  $lines += ("========== {0} (lines {1}) ==========" -f $f.Name, $aa.Count)
  for ($j = 0; $j -lt [Math]::Min(120, $aa.Count); $j++) {
    $lines += ("{0}|{1}" -f ($j + 1), $aa[$j])
  }
}
$lines | Out-File -Encoding utf8 $out
Write-Output "done -> $out"
