const fs = require('fs');
const path = require('path');
const s = fs.readFileSync('src/game/prg/data/scene/OpeningFrameTable.ts', 'utf8');
const start = s.indexOf('export const OPENING_FRAMES');
const arr = s.slice(start);
function extractFrame(f) {
  const marker = `{f:${f},`;
  const idx = arr.indexOf(marker);
  if (idx < 0) return null;
  let depth = 0, end = idx;
  for (let i = idx; i < arr.length; i++) {
    if (arr[i] === '{') depth++;
    else if (arr[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  return arr.slice(idx, end + 1);
}
// 打印 f3041-f3060 的 a: 段摘要
for (let f = 3041; f <= 3060; f++) {
  const txt = extractFrame(f);
  if (!txt) continue;
  const aIdx = txt.indexOf(',a:');
  const sIdx = txt.indexOf(',s:');
  const aStr = txt.slice(aIdx + 3, sIdx);
  const rowRe = /\{ni:(\d+),r:(\d+),d:\[([0-9,\s]+)\]\}/g;
  let rm, rows = [];
  while ((rm = rowRe.exec(aStr)) !== null) {
    rows.push(`ni${rm[1]}r${rm[2]}[${rm[3]}]`);
  }
  if (rows.length) console.log(`f${f} aRows=${rows.length} ${rows.slice(0, 4).join(' ')}`);
}
console.log('done-1');
