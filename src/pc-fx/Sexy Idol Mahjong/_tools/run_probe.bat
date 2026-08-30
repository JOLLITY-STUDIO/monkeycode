@echo off
cd /d "d:\studio\github\monkeycode\src\pc-fx\Sexy Idol Mahjong\_tools"
py probe_track02_deep.py > probe_track02_deep.log 2>&1
type probe_track02_deep.log
