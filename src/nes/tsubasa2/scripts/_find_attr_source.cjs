// 1) peek f3041 的 n:/a: 内容
// 2) 扫描 emu-full/frame-*/nt.json 找 tile[960]=170 和 attrib[0]=8 首次出现帧
const fs = require('fs');
const path = require('path');

// --- part 1: f3041 GT 内容 ---
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
const txt = extractFrame(3041);
const nIdx = txt.indexOf(',n:');
const aIdx = txt.indexOf(',a:');
const sIdx = txt.indexOf(',s:');
console.log('=== f3041 n: ===');
console.log(txt.slice(nIdx + 3, aIdx));
console.log('=== f3041 a: ===');
console.log(txt.slice(aIdx + 3, sIdx));

// --- part 2: 扫描 emu-full nt.json ---
const emuDir = 'output/emu-full';
let firstTile170 = -1;
let firstAttr8 = -1;
let lastTile170 = -1;
let lastAttr8 = -1;
const dirs = fs.readdirSync(emuDir).filter(d => /^frame-\d+$/.test(d)).sort((a, b) => parseInt(a.slice(6)) - parseInt(b.slice(6)));
for (const d of dirs) {
  const f = parseInt(d.slice(6));
  const p = path.join(emuDir, d, 'nt.json');
  if (!fs.existsSync(p)) continue;
  let data;
  try { data = JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { continue; }
  const nt0 = data.find(x => x.idx === 0);
  if (!nt0) continue;
  const t170 = nt0.tile[960] === 170;
  const a8 = nt0.attrib[0] === 8;
  if (t170 && firstTile170 < 0) firstTile170 = f;
  if (t170) lastTile170 = f;
  if (a8 && firstAttr8 < 0) firstAttr8 = f;
  if (a8) lastAttr8 = f;
}
console.log('\n=== emu NT0 scan ===');
console.log('first frame tile[960]=170:', firstTile170, 'last:', lastTile170);
console.log('first frame attrib[0]=8:', firstAttr8, 'last:', lastAttr8);

// 打印 3030-3060 每个 frame 的 tile[960] 和 attrib[0]
console.log('\n=== emu NT0 per-frame 3035-3050 ===');
for (let f = 3035; f <= 3050; f++) {
  const p = path.join(emuDir, `frame-${String(f).padStart(4, '0')}`, 'nt.json');
  if (!fs.existsSync(p)) { console.log(`f${f}: no nt.json`); continue; }
  try {
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    const nt0 = data.find(x => x.idx === 0);
    if (!nt0) { console.log(`f${f}: no nt0`); continue; }
    const nonZero = nt0.tile.filter(v => v !== 0).length;
    console.log(`f${f}: tile[960]=${nt0.tile[960]} attrib[0]=${nt0.attrib[0]} nonZeroTiles=${nonZero}`);
  } catch (e) { console.log(`f${f}: err`); }
}
