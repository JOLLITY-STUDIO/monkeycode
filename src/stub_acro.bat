@echo off
net session >nul 2>&1
if %errorlevel% neq 0 (
    powershell -Command "Start-Process cmd -ArgumentList '/c \"\"%~f0\"\"' -Verb RunAs"
    exit /b
)

set "DIR=C:\Program Files (x86)\Adobe\Acrobat DC\Acrobat"
set "STUB=%DIR%\AcroTray.exe"

if not exist "%DIR%" mkdir "%DIR%"

if exist "%STUB%" (
    echo already exists: %STUB%
    pause
    exit /b
)

set "SRC=C:\Windows\System32\conhost.exe"
if not exist "%SRC%" set "SRC=C:\Windows\System32\cleanmgr.exe"
if not exist "%SRC%" set "SRC=C:\Windows\System32\msiexec.exe"

copy /Y "%SRC%" "%STUB%" >nul
if exist "%STUB%" (
    echo STUB CREATED: %STUB%
    dir "%STUB%"
) else (
    echo FAIL
)
echo === DONE ===
pause