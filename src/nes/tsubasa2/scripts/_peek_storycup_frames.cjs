// peek f3035-f3060 帧的 n:/a: 内容摘要: 找 170 填充行、80-87 边框、文本行、attr
const fs = require('fs');
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

for (let f = 3040; f <= 3060; f++) {
  const txt = extractFrame(f);
  if (!txt) { console.log(`f${f}: NOT FOUND`); continue; }
  const nIdx = txt.indexOf(',n:');
  const aIdx = txt.indexOf(',a:');
  const sIdx = txt.indexOf(',s:');
  const nStr = txt.slice(nIdx + 3, aIdx);
  const aStr = txt.slice(aIdx + 3, sIdx);
  // 解析 n 行
  const rowRe = /\{ni:(\d+),r:(\d+),d:\[([0-9,\s]+)\]\}/g;
  let rm, count170 = 0, countBorder = 0, maxRow = -1, minRow = 99, niSet = new Set(), hasText = false;
  const rows = [];
  while ((rm = rowRe.exec(nStr)) !== null) {
    const ni = parseInt(rm[1]);
    const r = parseInt(rm[2]);
    const vals = rm[3].split(',').map(x => parseInt(x.trim(), 10));
    niSet.add(ni);
    if (r < minRow) minRow = r;
    if (r > maxRow) maxRow = r;
    const c170 = vals.filter(v => v === 170).length;
    const cB = vals.filter(v => [80, 81, 84, 85, 82, 83, 86, 87].includes(v)).length;
    count170 += c170; countBorder += cB;
    rows.push({ ni, r, c170, cB, head: vals.slice(0, 10).join(',') });
    if (vals.some(v => v >= 32 && v <= 126)) hasText = true;
  }
  // 解析 a 行
  let aCount = 0;
  while ((rm = rowRe.exec(aStr)) !== null) aCount++;
  console.log(`f${f}: nRows=${rows.length} ni=[${[...niSet].join(',')}] rows ${minRow}..${maxRow} 170fill=${count170} border=${countBorder} text=${hasText} aRows=${aCount}`);
  if (f >= 3046 && f <= 3052) {
    for (const r of rows) {
      if (r.c170 > 0 || r.cB > 0 || r.ni !== 0) console.log(`   ni${r.ni} r${r.r} 170=${r.c170} B=${r.cB} [${r.head}]`);
    }
  }
}
