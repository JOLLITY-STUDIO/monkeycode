$ErrorActionPreference = 'Continue'
$dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_bzk_out/bank_02'
$targets = @('A4C0','A559','A57B','A581','A5A2','A5A8','A5B0','A5DB','A5E8','A602','A61C','A629','A650','A69C','A77A','A782','A7BD','A7CE','A7D6','A7FA','A484','A491')
Get-ChildItem -Path $dir -Filter 'bank_02_part*.asm' | ForEach-Object {
  $file = $_
  foreach ($t in $targets) {
    $m = Select-String -LiteralPath $file.FullName -Pattern ("\b" + $t + "\b") | Select-Object -First 3
    foreach ($x in $m) {
      Write-Output ("{0}|{1}|{2}" -f $file.Name, $x.LineNumber, $x.Line.Trim())
    }
  }
}
Write-Output "DONE"
