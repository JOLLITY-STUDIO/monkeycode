// 临时: 分析 emu f450 nt.json — 找出非零 tile 的 NT 行, 与屏幕文本出现位置比对
const fs = require('fs');
const nt = JSON.parse(fs.readFileSync('output/emu-full/frame-0450/nt.json', 'utf8'));
// nt.json 结构: [{idx, tile:[960], attrib:[64]}]
for (const ntblk of nt) {
  const idx = ntblk.idx;
  const tile = ntblk.tile;
  console.log(`===== nametable ${idx} =====`);
  for (let r = 0; r < 30; r++) {
    let nz = 0;
    for (let c = 0; c < 32; c++) if (tile[r * 32 + c] !== 0) nz++;
    if (nz > 0) {
      let line = '';
      for (let c = 0; c < 32; c++) line += tile[r * 32 + c] === 0 ? ' .' : ' ' + tile[r * 32 + c].toString(16).padStart(2, '0');
      console.log(`row ${String(r).padStart(2)} nz=${String(nz).padStart(2)}:${line}`);
    }
  }
}
