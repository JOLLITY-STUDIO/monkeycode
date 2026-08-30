@echo off
REM ============================================================
REM  RetroArch launch Sexy Idol Mahjong (PC Engine CD-ROM2)
REM  Buttons in-game:
REM    Enter / Z / Space  = A (RUN/Start)
REM    X                  = B
REM    Shift              = SELECT
REM    Up/Down/Left/Right = D-Pad
REM    F11                = screenshot -> RetroArch\screenshots\
REM    F12                = reset
REM    Esc                = quit RetroArch
REM ============================================================

set RA_DIR=D:\studio\games\tools\RetroArch-Win64
set CORE=%RA_DIR%\cores\mednafen_pce_fast_libretro.dll
set ROM=D:\studio\github\monkeycode\src\pc-fx\Sexy Idol Mahjong\_tools\extracted\Sexy Idol Mahjong - Yakyuuken no Uta (Japan).cue

cd /d "%RA_DIR%"
echo Launching RetroArch with mednafen_pce_fast...
echo.
retroarch.exe -L "%CORE%" "%ROM%"
