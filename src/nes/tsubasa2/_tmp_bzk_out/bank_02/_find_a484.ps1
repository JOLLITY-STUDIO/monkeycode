$ErrorActionPreference = 'Continue'
$dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_bzk_out'
$m = Get-ChildItem -Path $dir -Recurse -Include '*.asm' | Select-String -Pattern 'A484|84A0|9EED' 
foreach ($x in $m | Select-Object -First 40) {
  Write-Output ("{0}|{1}|{2}" -f $x.Path.Replace($dir,'.'), $x.LineNumber, $x.Line.Trim())
}
Write-Output "DONE"
