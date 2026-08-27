const fs = require('fs');
const s = fs.readFileSync('src/game/prg/data/scene/OpeningFrameTable.ts', 'utf8');

// 找到每个帧条目的起始位置
const entries = [];
const re = /\{f:(\d+),/g;
let m;
while ((m = re.exec(s)) !== null) {
  entries.push({ f: parseInt(m[1]), pos: m.index });
}

for (let i = 0; i < entries.length; i++) {
  const e = entries[i];
  if (e.f < 3710 || e.f > 3760) continue;
  const end = i + 1 < entries.length ? entries[i + 1].pos : s.length;
  const block = s.slice(e.pos, end);
  // 提取 n 字段
  const nm = block.match(/n:\[([^\]]*)\]/s);
  let rows = [];
  if (nm && nm[1].trim()) {
    // 匹配 {ni:N,r:N,d:[...]}
    const rowRe = /\{ni:(\d+),r:(\d+),/g;
    let rm;
    while ((rm = rowRe.exec(nm[1])) !== null) {
      rows.push('NT' + rm[1] + '/r' + rm[2]);
    }
  }
  console.log('f=' + e.f, 'nRows=' + rows.length, rows.join(',') || '-');
}
