$ErrorActionPreference = "Continue"
$log = "d:\studio\github\monkeycode\src\nes\tsubasa2\debug\ghidra_console.txt"
Set-Location "d:\studio\github\monkeycode\src\nes\tsubasa2\debug"
& "D:\studio\games\tools\ghidra_12.1.2_PUBLIC_20260605\ghidra_12.1.2_PUBLIC\support\analyzeHeadless.bat" "D:\studio\github\monkeycode\src\nes\tsubasa2\debug\ghidra_c_project" tsubasa2 -process -scriptPath "D:\studio\github\monkeycode\src\nes\tsubasa2\scripts" -postScript GhidraExportAllC.py -log "D:\studio\github\monkeycode\src\nes\tsubasa2\debug\ghidra_export.log" *> $log
"EXIT=$LASTEXITCODE" | Out-File -Append -Encoding utf8 $log
