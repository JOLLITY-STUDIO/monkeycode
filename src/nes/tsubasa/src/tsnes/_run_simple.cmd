@echo off
cd /d "d:\studio\github\monkeycode\src\nes\tsubasa\src\tsnes"
npx tsx game-engine/test/ai-player/run-ai-player.ts > game-engine/test/ai-player/output/run2.txt 2>&1
echo DONE > game-engine/test/ai-player/output/run2.done
