@echo off
cd /d "d:\studio\github\monkeycode\src\pc-fx\Sexy Idol Mahjong\_tools\extracted\track_data\track_02"
ffmpeg -f mpeg -y -i user_data.bin -ss 0:00:02 -frames:v 30 -c:v png _mpeg_test_%%03d.png
exit /b %ERRORLEVEL%
