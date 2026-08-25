// 提取 applyChrRequest 与 OPENING_CHR_CONFIGS 相关代码段
const fs = require('fs');
function show(f, pats, before = 6, after = 40) {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  console.log('==== ' + f + ' ====');
  for (let i = 0; i < lines.length; i++) {
    if (pats.some(p => lines[i].includes(p))) {
      const s = Math.max(0, i - before), e = Math.min(lines.length, i + after);
      for (let j = s; j < e; j++) console.log(String(j + 1).padStart(4) + '|' + lines[j]);
      console.log('---');
    }
  }
}
show('src/game/prg/code/system/InterruptService.ts', ['applyChrRequest']);
show('src/game/prg/code/system/RenderingPrimitivesService.ts', ['OPENING_CHR_CONFIGS']);
