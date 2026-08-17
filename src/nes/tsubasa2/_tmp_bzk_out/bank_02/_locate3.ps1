$ErrorActionPreference = 'Continue'
$files = Get-ChildItem -Path 'd:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_bzk_out/bank_02' -Filter 'bank_02_part*.asm'
foreach ($f in $files) {
  $m = Select-String -LiteralPath $f.FullName -Pattern 'A4C0|A559|A57B|A5A2|A5A8|A5B0|A5DB|A5E8|A602|A61C|A629|A650|A69C|A77A|A782|A7BD|A7CE|A7D6|A7FA'
  foreach ($x in $m) {
    Write-Output ("{0}|{1}|{2}" -f $f.Name, $x.LineNumber, $x.Line.Trim())
  }
}
Write-Output "DONE"
