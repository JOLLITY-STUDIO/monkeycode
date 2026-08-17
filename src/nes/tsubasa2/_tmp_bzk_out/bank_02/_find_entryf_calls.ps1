$ErrorActionPreference = 'Continue'
$dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src'
$m = Get-ChildItem -Path $dir -Recurse -Include '*.ts' | Select-String -Pattern 'entryF|00ED|ram_00ED' 
foreach ($x in $m) {
  Write-Output ("{0}|{1}|{2}" -f $x.Path.Replace($dir,'.'), $x.LineNumber, $x.Line.Trim())
}
Write-Output "DONE"
