$root = 'd:/studio/github/monkeycode/src/nes/tsubasa2'
$out = 'd:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_bzk_out/bank_07/_refs.txt'
$lines = @()
# 1. bank07 references in ts source
$lines += '=== TS refs: bank07 / Bank07 / prg-bank-07 ==='
$ts = Get-ChildItem "$root\src" -Recurse -Filter '*.ts'
foreach ($f in $ts) {
  $m = Select-String -Path $f.FullName -Pattern 'bank07|Bank07|prg-bank-07'
  if ($m) {
    foreach ($x in $m) { $lines += ("{0}|{1}|{2}" -f $f.FullName.Substring($root.Length), $x.LineNumber, $x.Line.Trim()) }
  }
}
# 2. md docs mention bank07
$lines += ''
$lines += '=== MD refs: bank07 ==='
$md = Get-ChildItem $root -Recurse -Filter '*.md' -ErrorAction SilentlyContinue
foreach ($f in $md) {
  $m = Select-String -Path $f.FullName -Pattern 'bank.?07|Bank.?07'
  if ($m) {
    foreach ($x in ($m | Select-Object -First 10)) { $lines += ("{0}|{1}|{2}" -f $f.Name, $x.LineNumber, $x.Line.Trim()) }
  }
}
# 3. bank07 asm: find code regions (C marked) & data (D) with sizes
$lines += ''
$lines += '=== bank07 part01 C-code hits ==='
$p1 = 'd:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_bzk_out/bank_07/bank_07_part01.asm'
$aa = Get-Content $p1
$cCount = 0
for ($j = 0; $j -lt $aa.Count; $j++) {
  if ($aa[$j] -match '^C') { $cCount++ }
}
$lines += ("part01 code lines: {0} / total {1}" -f $cCount, $aa.Count)
$lines | Out-File -Encoding utf8 $out
Write-Output "done -> $out"
