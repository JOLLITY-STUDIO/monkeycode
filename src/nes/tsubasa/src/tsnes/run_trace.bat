@echo off
cd /d d:\studio\github\monkeycode\src\nes\tsubasa\src\tsnes
npm install -D tsx >nul 2>&1
npx tsx scripts\trace_apu_headless.ts 600
