const fs = require('fs');
const t = fs.readFileSync('src/game/prg/data/scene/OpeningFrameTable.ts', 'utf8');
// 找到 n:[] 和 a:[] 字段，看 f3731-3780 是否有 NT diff
const re = /{f:(\d+),c:\[.*?\],p:(?:null|\{[^}]*\}),o:\[.*?\],n:(\[.*?\]),a:(\[.*?\]),s:\{[^}]+\}\}/gs;
const rows = [];
let m;
while ((m = re.exec(t))) {
  const f = parseInt(m[1]);
  if (f >= 3720 && f <= 3790) {
    const n = m[2];
    const a = m[3];
    rows.push({ f, nLen: n === '[]' ? 0 : n.split('],[').length, aLen: a === '[]' ? 0 : a.split('],[').length, nRaw: n, aRaw: a });
  }
}
for (const r of rows) {
  console.log('f' + r.f, 'nRows=' + r.nLen, 'aRows=' + r.aLen);
  // 打印前 2 个 n 行（如果有）
  if (r.nLen > 0) {
    console.log('  n first:', r.nRaw.slice(0, 200));
  }
}
