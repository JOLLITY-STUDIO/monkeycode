// 扫描 GT 全量帧中 ni0 的所有 attr 写入（含 0 值），找出 StoryCup 前 ni0 attr 的最后状态
const fs = require('fs');
const s = fs.readFileSync('src/game/prg/data/scene/OpeningFrameTable.ts', 'utf8');
const arr = s.slice(s.indexOf('export const OPENING_FRAMES'));
const lines = arr.split('\n');
const hits = [];
for (let li = 0; li < lines.length; li++) {
  const line = lines[li];
  const fm = /\{f:(\d+),/.exec(line);
  if (!fm) continue;
  const f = parseInt(fm[1]);
  const aIdx = line.indexOf(',a:');
  if (aIdx < 0) continue;
  const aStr = line.slice(aIdx + 3, line.indexOf(',s:', aIdx));
  const rowRe = /\{ni:(\d+),r:(\d+),d:\[([0-9,\s]+)\]\}/g;
  let rm;
  while ((rm = rowRe.exec(aStr)) !== null) {
    const ni = parseInt(rm[1]);
    if (ni !== 0) continue;
    const r = parseInt(rm[2]);
    const vals = rm[3].split(',').map(x => parseInt(x.trim(), 10));
    hits.push({ f, r, d: vals });
  }
}
console.log('ni0 attr write count:', hits.length);
// 打印最后 40 次 ni0 attr 写入（含每行 r）
const last = hits.slice(-40);
for (const h of last) {
  console.log(`f${h.f} r${h.r} [${h.d.join(',')}]`);
}
