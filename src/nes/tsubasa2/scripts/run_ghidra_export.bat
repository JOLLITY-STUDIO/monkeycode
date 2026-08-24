@echo off
set APPDATA=D:\studio\github\monkeycode\src\nes\tsubasa2\debug\ghidra_alt
set JAVA_TOOL_OPTIONS=-Duser.home=D:\studio\github\monkeycode\src\nes\tsubasa2\debug\ghidra_alt_home
"D:\studio\games\tools\ghidra_12.1.2_PUBLIC_20260605\ghidra_12.1.2_PUBLIC\support\analyzeHeadless.bat" "D:\studio\github\monkeycode\src\nes\tsubasa2\debug\ghidra_c_project" tsubasa2 -process -scriptPath "D:\studio\github\monkeycode\src\nes\tsubasa2\scripts" -postScript GhidraExportAllC.java -log "D:\studio\github\monkeycode\src\nes\tsubasa2\debug\ghidra_export.log"
