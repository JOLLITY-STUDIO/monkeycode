@echo off
set JAVA_HOME=D:\dev\jdk-21.0.12+8
set PATH=%JAVA_HOME%\bin;%PATH%
set PROJ_DIR=D:\studio\github\monkeycode\src\nds\Picross\py\ghidra_proj
set SCRIPT_DIR=D:\studio\github\monkeycode\src\nds\Picross\py
set LOG=D:\studio\github\monkeycode\src\nds\Picross\py\ghidra_test.log
echo DBG1_JAVA_HOME=%JAVA_HOME% > "%LOG%"
"%JAVA_HOME%\bin\java.exe" -version >> "%LOG%" 2>&1
if not exist "%PROJ_DIR%" mkdir "%PROJ_DIR%"
cd /d D:\studio\games\tools\ghidra_12.1.2_PUBLIC_20260605\ghidra_12.1.2_PUBLIC\support
call analyzeHeadless.bat %PROJ_DIR% picross_arm9 -process arm9_full.bin -scriptPath %SCRIPT_DIR% -postScript HelloWorld.java > %LOG% 2>&1
echo EXIT=%ERRORLEVEL% >> %LOG%
