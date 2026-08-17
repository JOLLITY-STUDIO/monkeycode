$root = 'd:\studio\github\monkeycode\src\nes\tsubasa2\src'
Get-ChildItem -Path $root -Recurse -Filter *.ts | ForEach-Object {
  $m = Select-String -Path $_.FullName -Pattern 'rom-data'
  if ($m) {
    $imports = $m | Where-Object { $_.Line -match '^\s*import' }
    $comments = $m | Where-Object { $_.Line -notmatch '^\s*import' }
    foreach ($line in $imports) {
      Write-Host ("IMPORT  {0}:{1}:{2}" -f $_.FullName.Replace('d:\studio\github\monkeycode\src\nes\tsubasa2\', ''), $line.LineNumber, $line.Line.Trim())
    }
    if ($comments) {
      Write-Host ("COMMENT {0} ({1}x)" -f $_.FullName.Replace('d:\studio\github\monkeycode\src\nes\tsubasa2\', ''), $comments.Count)
    }
  }
}
Write-Host 'SCAN_DONE'
