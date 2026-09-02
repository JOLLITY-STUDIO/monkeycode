Start-Sleep -Seconds 90
$py = Get-Process python -ErrorAction SilentlyContinue
if ($py) {
  $cpu = [math]::Round(($py | Measure-Object -Property CPU -Sum).Sum)
  Set-Content -Path 'd:\studio\github\monkeycode\src\nds\EssentialSudokuDS\_poll.txt' -Value "RUNNING PID=$($py.Id) CPU=$cpu"
} else {
  Set-Content -Path 'd:\studio\github\monkeycode\src\nds\EssentialSudokuDS\_poll.txt' -Value 'DONE'
}
