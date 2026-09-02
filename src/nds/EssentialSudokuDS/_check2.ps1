Start-Sleep -Seconds 8
$py = Get-Process python -ErrorAction SilentlyContinue
$log = Get-Item 'd:\studio\github\monkeycode\src\nds\EssentialSudokuDS\_sseq0d.log' -ErrorAction SilentlyContinue
if ($py) {
  $cpu = [math]::Round(($py | Measure-Object -Property CPU -Sum).Sum)
  $lsize = if ($log) { $log.Length } else { 0 }
  Set-Content 'd:\studio\github\monkeycode\src\nds\EssentialSudokuDS\_poll.txt' -Value ("RUNNING PID=" + ($py.Id -join ',') + " CPU=" + $cpu + " LOG=" + $lsize)
} else {
  $lsize = if ($log) { $log.Length } else { 0 }
  Set-Content 'd:\studio\github\monkeycode\src\nds\EssentialSudokuDS\_poll.txt' -Value ("DONE LOG=" + $lsize)
}
