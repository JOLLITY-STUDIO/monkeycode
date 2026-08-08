@echo off
cd /d d:\studio\github\monkeycode\src\nes\tsubasa\src\tsnes
echo ============================================
echo  APU Trace - 1500 frames
echo ============================================
node node_modules\tsx\dist\cli.mjs scripts\trace_apu_headless.ts --press-start 2>&1
