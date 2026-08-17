$ErrorActionPreference = 'Continue'
$files = Get-ChildItem -Path 'd:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_bzk_out/bank_03' -Filter 'bank_03_part*.asm'
$patterns = '84C0:|8559:|857B:|8581:|85A2:|85A8:|85B0:|85B8:|85BF:|85CD:|85DB:|85E8:|8602:|861C:|8629:|8650:|869C:|877A:|8782:|878D:|87BD:|87CE:|87D6:|87FA:'
foreach ($f in $files) {
  $m = Select-String -LiteralPath $f.FullName -Pattern $patterns
  foreach ($x in $m) {
    Write-Output ("{0}|{1}|{2}" -f $f.Name, $x.LineNumber, $x.Line.Trim())
  }
}
Write-Output "DONE"
