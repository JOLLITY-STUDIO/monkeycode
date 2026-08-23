// 定位 GameSystemService 中 coroutineYield 与 _coroutineCtx 所有出现位置
const fs = require('fs');
const f = 'src/game/prg/code/system/GameSystemService.ts';
const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
lines.forEach((ln, i) => {
  if (/coroutineYield|_coroutineCtx|_currentSlot|_currentX|_currentY|registerCoroutine/.test(ln)) {
    console.log(`${i + 1}: ${ln.trim()}`);
  }
});
