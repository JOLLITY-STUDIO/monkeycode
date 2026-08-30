@echo off
cd /d "d:\studio\github\monkeycode\src\pc-fx\Sexy Idol Mahjong\_tools"
py probe_track02_dive.py > dive.log 2>&1
type dive.log
