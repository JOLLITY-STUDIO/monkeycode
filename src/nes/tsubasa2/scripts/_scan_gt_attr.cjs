// 扫描 GT 全量帧 a: 段: 找原始属性表字节 170(0xAA)/85(0x55) 写入的帧
const fs = require('fs');
const s = fs.readFileSync('src/game/prg/data/scene/OpeningFrameTable.ts', 'utf8');
const start = s.indexOf('export const OPENING_FRAMES');
const arr = s.slice(start);
const lines = arr.split('\n');
const hits = []; // {f, ni, r, sample}
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
    const r = parseInt(rm[2]);
    const vals = rm[3].split(',').map(x => parseInt(x.trim(), 10));
    if (vals.includes(170) || vals.includes(85)) {
      hits.push({ f, ni, r, n: vals.filter(v => v === 170 || v === 85).length, sample: vals.slice(0, 8).join(',') });
    }
  }
}
console.log('total attr rows with 170/85:', hits.length);
const byFrame = {};
for (const h of hits) (byFrame[h.f] = byFrame[h.f] || []).push(h);
const keys = Object.keys(byFrame).map(Number).sort((a, b) => a - b);
console.log('frames:', keys.join(','));
for (const k of keys.slice(0, 25)) {
  console.log(`f${k}:`, JSON.stringify(byFrame[k].slice(0, 4)));
}
// 特别关注 2780-3060
console.log('\nframes 2700-3060 range:');
for (const k of keys) if (k >= 2700 && k <= 3060) console.log(`f${k}:`, JSON.stringify(byFrame[k].slice(0, 6)));
