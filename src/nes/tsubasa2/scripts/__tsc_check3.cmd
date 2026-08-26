@echo off
cd /d d:\studio\github\monkeycode\src\nes\tsubasa2
npx tsc --noEmit -p tsconfig.json > __tsc_out.txt 2>&1
set RC=%errorlevel%
echo === TSC RC=%RC% ===
findstr /N "error TS" __tsc_out.txt
echo === DONE ===
del __tsc_out.txt
