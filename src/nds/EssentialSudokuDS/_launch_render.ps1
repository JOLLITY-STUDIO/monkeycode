Set-Location d:\studio\github\monkeycode\src\nds\EssentialSudokuDS
Remove-Item '_sseq0d.log','_sseq0d.err' -ErrorAction SilentlyContinue
$p = Start-Process cmd -ArgumentList '/c','python -u scripts\sseq_render.py --seq 0 --max-seconds 40 > _sseq0d.log 2>&1' -WorkingDirectory (Get-Location) -WindowStyle Hidden -PassThru
Set-Content 'd:\studio\github\monkeycode\src\nds\EssentialSudokuDS\_poll.txt' -Value ("LAUNCHED PID=" + $p.Id)
