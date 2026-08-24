$ErrorActionPreference = "Continue"
$out = "D:\studio\github\monkeycode\src\nes\tsubasa2\debug\gh_out.txt"
$err = "D:\studio\github\monkeycode\src\nes\tsubasa2\debug\gh_err.txt"
if (Test-Path $out) { Remove-Item $out }
if (Test-Path $err) { Remove-Item $err }
$p = Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "D:\studio\github\monkeycode\src\nes\tsubasa2\scripts\run_ghidra_headless.bat" -Wait -NoNewWindow -RedirectStandardOutput $out -RedirectStandardError $err -PassThru
"EXIT=$($p.ExitCode)" | Out-File "D:\studio\github\monkeycode\src\nes\tsubasa2\debug\gh_diag.txt" -Append
"=== STDOUT tail ===" | Out-File "D:\studio\github\monkeycode\src\nes\tsubasa2\debug\gh_diag.txt" -Append
if (Test-Path $out) { Get-Content $out | Select-Object -Last 40 | Out-File "D:\studio\github\monkeycode\src\nes\tsubasa2\debug\gh_diag.txt" -Append }
"=== STDERR tail ===" | Out-File "D:\studio\github\monkeycode\src\nes\tsubasa2\debug\gh_diag.txt" -Append
if (Test-Path $err) { Get-Content $err | Select-Object -Last 20 | Out-File "D:\studio\github\monkeycode\src\nes\tsubasa2\debug\gh_diag.txt" -Append }
"=== project dir ===" | Out-File "D:\studio\github\monkeycode\src\nes\tsubasa2\debug\gh_diag.txt" -Append
if (Test-Path "D:\studio\github\monkeycode\src\nes\tsubasa2\debug\ghidra_c_project") { Get-ChildItem "D:\studio\github\monkeycode\src\nes\tsubasa2\debug\ghidra_c_project" | Out-File "D:\studio\github\monkeycode\src\nes\tsubasa2\debug\gh_diag.txt" -Append }
"=== output files ===" | Out-File "D:\studio\github\monkeycode\src\nes\tsubasa2\debug\gh_diag.txt" -Append
if (Test-Path "D:\studio\github\monkeycode\src\nes\tsubasa2\debug\ghidra_c") { Get-ChildItem "D:\studio\github\monkeycode\src\nes\tsubasa2\debug\ghidra_c" | Out-File "D:\studio\github\monkeycode\src\nes\tsubasa2\debug\gh_diag.txt" -Append }
