// 扫描 OPENING_FRAMES 全量帧: 找出写入边框 tile(170/80-87) 或 attr(8/4) 的帧
const fs = require('fs');
const s = fs.readFileSync('src/game/prg/data/scene/OpeningFrameTable.ts', 'utf8');
const start = s.indexOf('export const OPENING_FRAMES');
const arr = s.slice(start);
const lines = arr.split('\n');

const BORDER = new Set([170, 80, 81, 84, 85, 82, 83, 86, 87]);
const ATTR_HIT = new Set([8, 4]);

function parseDArray(txt) {
  // 解析 d:[32 数字]
  const m = /d:\[([0-9,\s]+)\]/.exec(txt);
  if (!m) return null;
  return m[1].split(',').map(x => parseInt(x.trim(), 10));
}

function parseAttrArray(txt) {
  const m = /d:\[([0-9,\s]+)\]/.exec(txt);
  if (!m) return null;
  return m[1].split(',').map(x => parseInt(x.trim(), 10));
}

let borderHits = [];   // {f, ni, r, tiles:[...]}
let attrHits = [];     // {f, ni, r, vals:[...]}
let maxNFrames = [];
let count = 0;

for (let li = 0; li < lines.length; li++) {
  const line = lines[li];
  const fm = /\{f:(\d+),/.exec(line);
  if (!fm) continue;
  const f = parseInt(fm[1]);
  count++;
  // 提取 n: 段 (到 ,a: 为止)
  const nIdx = line.indexOf(',n:');
  if (nIdx < 0) continue;
  const aIdx = line.indexOf(',a:', nIdx);
  if (aIdx < 0) continue;
  const nStr = line.slice(nIdx + 3, aIdx);
  const aStr = line.slice(aIdx + 3, line.indexOf(',s:', aIdx));
  // 解析所有 {ni:x,r:y,d:[...]} 行
  const rowRe = /\{ni:(\d+),r:(\d+),d:\[([0-9,\s]+)\]\}/g;
  let rm;
  while ((rm = rowRe.exec(nStr)) !== null) {
    const ni = parseInt(rm[1]);
    const r = parseInt(rm[2]);
    const vals = rm[3].split(',').map(x => parseInt(x.trim(), 10));
    const hits = vals.filter(v => BORDER.has(v));
    if (hits.length > 0) {
      borderHits.push({ f, ni, r, n: hits.length, sample: vals.slice(0, 8).join(',') });
    }
  }
  while ((rm = rowRe.exec(aStr)) !== null) {
    const ni = parseInt(rm[1]);
    const r = parseInt(rm[2]);
    const vals = rm[3].split(',').map(x => parseInt(x.trim(), 10));
    const hits = vals.filter(v => ATTR_HIT.has(v));
    if (hits.length > 0) {
      attrHits.push({ f, ni, r, n: hits.length, sample: vals.slice(0, 8).join(',') });
    }
  }
}

console.log('total frames parsed:', count);
console.log('\n--- frames writing border tiles 170/80-87 (n: rows) ---');
if (borderHits.length === 0) console.log('  NONE');
else {
  const byFrame = {};
  for (const h of borderHits) {
    (byFrame[h.f] = byFrame[h.f] || []).push(h);
  }
  const keys = Object.keys(byFrame).map(Number).sort((a, b) => a - b);
  for (const k of keys.slice(0, 40)) {
    const items = byFrame[k];
    console.log(`f${k}: ${items.length} rows, e.g.`, JSON.stringify(items.slice(0, 3)));
  }
  console.log('frame count with border tiles:', keys.length);
}

console.log('\n--- frames writing attr 8/4 (a: rows) ---');
if (attrHits.length === 0) console.log('  NONE');
else {
  const byFrame = {};
  for (const h of attrHits) {
    (byFrame[h.f] = byFrame[h.f] || []).push(h);
  }
  const keys = Object.keys(byFrame).map(Number).sort((a, b) => a - b);
  for (const k of keys.slice(0, 40)) {
    const items = byFrame[k];
    console.log(`f${k}: ${items.length} rows, e.g.`, JSON.stringify(items.slice(0, 3)));
  }
  console.log('frame count with attr 8/4:', keys.length);
}

// 打印 f3040-f3060 的 n/a 摘要
console.log('\n--- frames 3030-3060 summary ---');
for (let f = 3030; f <= 3060; f++) {
  const marker = `{f:${f},`;
  const idx = arr.indexOf(marker);
  if (idx < 0) { console.log(`f${f}: NOT FOUND`); continue; }
  let depth = 0, end = idx;
  for (let i = idx; i < arr.length; i++) {
    if (arr[i] === '{') depth++;
    else if (arr[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  const txt = arr.slice(idx, end + 1);
  const nIdx2 = txt.indexOf(',n:');
  const aIdx2 = txt.indexOf(',a:');
  const nLen = txt.slice(nIdx2 + 3, aIdx2).length;
  const aLen = txt.slice(aIdx2 + 3, txt.indexOf(',s:')).length;
  if (nLen > 2 || aLen > 2) console.log(`f${f}: n=${nLen} a=${aLen}`);
}
console.log('done');
