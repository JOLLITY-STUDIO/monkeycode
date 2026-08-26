// 从 f1500 起扫 emu NT0 attrib[0]=8 与 tile[960]=170 的 first frame
const fs = require('fs');
const path = require('path');
const emuDir = 'output/emu-full';
let firstA8 = -1, firstT170 = -1;
const dirs = fs.readdirSync(emuDir).filter(d => /^frame-\d+$/.test(d)).sort((a, b) => parseInt(a.slice(6)) - parseInt(b.slice(6)));
for (const d of dirs) {
  const f = parseInt(d.slice(6));
  if (f < 1500 || f > 3100) continue;
  const p = path.join(emuDir, d, 'nt.json');
  if (!fs.existsSync(p)) continue;
  let data; try { data = JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { continue; }
  const nt0 = data.find(x => x.idx === 0);
  if (!nt0) continue;
  if (nt0.attrib[0] === 8 && firstA8 < 0) firstA8 = f;
  if (nt0.tile[960] === 170 && firstT170 < 0) firstT170 = f;
}
console.log('first attrib[0]=8:', firstA8);
console.log('first tile[960]=170:', firstT170);

// 打印关键帧 2135-2150, 2365-2400, 2810-2830 的 attrib[0] 与 GT a: 段
const s = fs.readFileSync('src/game/prg/data/scene/OpeningFrameTable.ts', 'utf8');
const arr = s.slice(s.indexOf('export const OPENING_FRAMES'));
function extractFrame(f) {
  const idx = arr.indexOf(`{f:${f},`);
  if (idx < 0) return null;
  let depth = 0, end = idx;
  for (let i = idx; i < arr.length; i++) {
    if (arr[i] === '{') depth++;
    else if (arr[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  return arr.slice(idx, end + 1);
}
console.log('\n--- GT a: 段 f2141-f2145 ---');
for (let f = 2141; f <= 2145; f++) {
  const txt = extractFrame(f);
  if (!txt) continue;
  const aIdx = txt.indexOf(',a:');
  const sIdx = txt.indexOf(',s:');
  console.log(`f${f}: a=${txt.slice(aIdx + 3, sIdx)}`);
}
console.log('\n--- GT a: 段 f2374-f2396 ---');
for (let f = 2374; f <= 2396; f++) {
  const txt = extractFrame(f);
  if (!txt) continue;
  const aIdx = txt.indexOf(',a:');
  const sIdx = txt.indexOf(',s:');
  const aStr = txt.slice(aIdx + 3, sIdx);
  if (aStr.length > 2) console.log(`f${f}: a=${aStr.slice(0, 200)}`);
}
console.log('done');
