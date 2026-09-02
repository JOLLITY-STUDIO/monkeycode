Set-Location d:\studio\github\monkeycode\src\nds\EssentialSudokuDS
$p = Start-Process python -ArgumentList 'scripts\sseq_render.py --seq 0 --max-seconds 40' -WorkingDirectory (Get-Location) -RedirectStandardOutput '_sseq0c.log' -RedirectStandardError '_sseq0c.err' -Wait -PassThru -NoNewWindow
Write-Host "EXIT=$($p.ExitCode)"
