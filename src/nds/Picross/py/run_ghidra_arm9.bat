@echo off
set JAVA_HOME=D:\dev\jdk-21.0.12+8
set PATH=%JAVA_HOME%\bin;%PATH%
set PYGHIDRA_PYTHON_CMD=D:\dev\Python314\python.exe
set PROJ_DIR=D:\studio\github\monkeycode\src\nds\Picross\py\ghidra_proj
set SCRIPT_DIR=D:\studio\github\monkeycode\src\nds\Picross\py
set ROM=D:\studio\github\monkeycode\src\nds\Picross\extracted\arm9_full.bin
set LOG=D:\studio\github\monkeycode\src\nds\Picross\py\ghidra_arm9.log
if not exist "%PROJ_DIR%" mkdir "%PROJ_DIR%"
cd /d D:\studio\games\tools\ghidra_12.1.2_PUBLIC_20260605\ghidra_12.1.2_PUBLIC\support
call analyzeHeadless.bat %PROJ_DIR% picross_arm9 -process arm9_full.bin -noanalysis -scriptPath %SCRIPT_DIR% -postScript ghidra_arm9_export.py > %LOG% 2>&1
echo EXIT=%ERRORLEVEL% >> %LOG%
