cd /d "d:\studio\github\monkeycode\src\nes\tsubasa\src\tsnes"
npx tsx -e "import { tick_BANK31_mainLoop, translate_BANK31_RESET } from './game-engine/native-game/tsubasa/banks/prg/bank-31-code'; console.log('[OK] bank-31 imports OK');" 2>&1
echo "---"
npx tsx -e "import { bank28_dispatch } from './game-engine/native-game/tsubasa/banks/prg/bank-28-player-attrs-code'; console.log('[OK] bank-28 dispatch:',Object.keys(bank28_dispatch));" 2>&1
echo "---"
npx tsx -e "import { bank16_dispatch } from './game-engine/native-game/tsubasa/banks/prg/bank-16-scene-script-engine-code'; console.log('[OK] bank-16 dispatch:',Object.keys(bank16_dispatch));" 2>&1
