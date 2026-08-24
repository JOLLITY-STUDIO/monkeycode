@echo off
setlocal
set GH=D:\studio\games\tools\ghidra_12.1.2_PUBLIC_20260605\ghidra_12.1.2_PUBLIC\support\analyzeHeadless.bat
set PROJ=D:\studio\github\monkeycode\src\nes\tsubasa2\debug\ghidra_c_project
set ROM=D:\studio\github\monkeycode\src\nes\tsubasa2\src\asm\dist\tsubasa2.nes
set SP=D:\studio\github\monkeycode\src\nes\tsubasa2\scripts
"%GH%" "%PROJ%" tsubasa2 -import "%ROM%" -scriptPath "%SP%" -postScript ghidra_export_all_c.py
