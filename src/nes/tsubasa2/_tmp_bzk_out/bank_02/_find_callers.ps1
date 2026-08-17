$ErrorActionPreference = 'Continue'
$root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_bzk_out'
$patterns = '8212|8215|820C|820F|8203|8206|A212|A484'
$m = Get-ChildItem -Path $root -Recurse -Include '*.asm' | Select-String -Pattern $patterns
foreach ($x in $m | Select-Object -First 60) {
  $rel = $x.Path.Substring($root.Length)
  Write-Output ("{0}|{1}|{2}" -f $rel, $x.LineNumber, $x.Line.Trim())
}
Write-Output "DONE"
