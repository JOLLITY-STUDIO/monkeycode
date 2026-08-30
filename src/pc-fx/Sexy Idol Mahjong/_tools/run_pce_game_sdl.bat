@echo off
REM  RetroArch with SDL video driver (fallback if vulkan/gl fails)

set RA_DIR=D:\studio\games\tools\RetroArch-Win64
set CORE=%RA_DIR%\cores\mednafen_pce_fast_libretro.dll
set ROM=D:\studio\github\monkeycode\src\pc-fx\Sexy Idol Mahjong\_tools\extracted\Sexy Idol Mahjong - Yakyuuken no Uta (Japan).cue

cd /d "%RA_DIR%"
retroarch.exe --video-driver gl -L "%CORE%" "%ROM%"
