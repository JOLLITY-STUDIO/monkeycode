$py = Get-Process -Id 13388 -ErrorAction SilentlyContinue
if ($py) {
  Set-Content 'd:\studio\github\monkeycode\src\nds\EssentialSudokuDS\_poll.txt' -Value ("PID=" + $py.Id + " START=" + $py.StartTime.ToString('HH:mm:ss') + " CPU=" + [math]::Round($py.CPU) + " MEM=" + [math]::Round($py.WorkingSet64/1MB) + "MB THREADS=" + $py.Threads.Count)
} else {
  Set-Content 'd:\studio\github\monkeycode\src\nds\EssentialSudokuDS\_poll.txt' -Value 'DONE'
}
"NOW=" + (Get-Date).ToString('HH:mm:ss') | Add-Content 'd:\studio\github\monkeycode\src\nds\EssentialSudokuDS\_poll.txt'
$log = Get-Item 'd:\studio\github\monkeycode\src\nds\EssentialSudokuDS\_sseq0c.log' -ErrorAction SilentlyContinue
if ($log) { "LOG_SIZE=" + $log.Length | Add-Content 'd:\studio\github\monkeycode\src\nds\EssentialSudokuDS\_poll.txt' }
$wav = Get-Item 'd:\studio\github\monkeycode\src\nds\EssentialSudokuDS\work\wav\bgm\SEQ_01.wav' -ErrorAction SilentlyContinue
if ($wav) { "WAV_TS=" + $wav.LastWriteTime.ToString('HH:mm:ss') + " WAV_SIZE=" + $wav.Length | Add-Content 'd:\studio\github\monkeycode\src\nds\EssentialSudokuDS\_poll.txt' }
