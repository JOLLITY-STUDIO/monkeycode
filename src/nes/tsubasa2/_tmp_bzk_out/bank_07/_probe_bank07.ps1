$dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_bzk_out/bank_07'
$out = 'd:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_bzk_out/bank_07/_probe.txt'
$lines = @()
# 1. reset vector / entry 位置
foreach ($f in @('bank_07_part01.asm')) {
  $p = Join-Path $dir $f
  $aa = Get-Content $p
  $lines += ("=== {0} head (first 60 lines) ===" -f $f)
  for ($j = 0; $j -lt [Math]::Min(60, $aa.Count); $j++) { $lines += ("{0}|{1}" -f ($j + 1), $aa[$j]) }
}
# 2. search metatile-like patterns: 大块 .byte 区域 + 名称提示
$lines += ''
$lines += "=== search keywords ==="
foreach ($f in (Get-ChildItem $dir -Filter '*.asm')) {
  foreach ($pat in @('tile','Tile','field','Field','metat','Metat','grass','court','stadium')) {
    $m = Select-String -Path $f.FullName -Pattern $pat
    if ($m) {
      foreach ($x in ($m | Select-Object -First 8)) {
        $lines += ("{0}|{1}|{2}" -f $f.Name, $x.LineNumber, $x.Line.Trim())
      }
    }
  }
}
$lines | Out-File -Encoding utf8 $out
Write-Output "done -> $out"
