// 读 PPU index.ts 中 sprite 渲染相关代码
const fs = require('fs');
const lines = fs.readFileSync('src/core/ppu/index.ts', 'utf8').split('\n');
const pats = ['renderSprites', 'f_spriteSize', 'spHeight', 'sprSize', 'ptTile', 'sprCol', 'spriteRamWriteUpdate', 'getTileValue'];
for (let i = 0; i < lines.length; i++) {
  if (pats.some(p => lines[i].includes(p))) {
    console.log('===== line ' + (i + 1) + ' :: ' + lines[i].trim().slice(0, 80) + ' =====');
    const s = Math.max(0, i - 4), e = Math.min(lines.length, i + 40);
    for (let j = s; j < e; j++) console.log(String(j + 1).padStart(5) + '|' + lines[j]);
  }
}
