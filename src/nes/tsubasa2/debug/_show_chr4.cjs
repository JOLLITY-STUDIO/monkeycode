// 读 HeadlessRuntime loadChrBank + chrSlots
const fs = require('fs');
const lines = fs.readFileSync('src/game/runtime/HeadlessRuntime.ts', 'utf8').split('\n');
for (let i = 0; i < lines.length; i++) {
  if (/loadChrBank|chrSlots/.test(lines[i])) {
    const s = Math.max(0, i - 5), e = Math.min(lines.length, i + 25);
    console.log('===== line ' + (i + 1) + ' =====');
    for (let j = s; j < e; j++) console.log(String(j + 1).padStart(4) + '|' + lines[j]);
  }
}
