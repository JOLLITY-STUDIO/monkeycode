const fs = require('fs');

const sp = JSON.parse(fs.readFileSync('output/emu-full/scroll-prerender.json', 'utf8'));
const map = new Map();
for (const e of sp) map.set(e.f, e);

// 扫描整个 opening (f10-f4200) 中 cntV=1 的帧
console.log('=== cntV=1 帧 (会渲染 NT1/NT3 的帧) ===');
let count = 0;
for (let f = 10; f <= 4200; f++) {
  const e = map.get(f);
  if (!e) continue;
  if (e.cntV === 1) {
    console.log(`f${f}: cntV=1 cntH=${e.cntH} cntVT=${e.cntVT} cntHT=${e.cntHT} cntFV=${e.cntFV} regV=${e.regV} regH=${e.regH} regVT=${e.regVT} regHT=${e.regHT}`);
    count++;
  }
}
console.log('count =', count);

// 检查这些帧中 NT1 的 diff 是否在 GT 数据里
console.log('\n=== 检查 GT 数据 ni=1 的 diff 行分布 ===');
const gtFiles = [
  ['opening-tecmo-start', 1],
  ['opening-title-1', 2],
  ['opening-title-2', 3],
  ['opening-subtitle-1', 4],
  ['opening-subtitle-2', 5],
  ['opening-subtitle-3', 6],
  ['opening-subtitle-4', 7],
  ['opening-subtitle-5', 8],
  ['opening-subtitle-6', 9],
  ['opening-subtitle-7', 10],
  ['opening-ending-scroll', 11],
  ['opening-ending-end', 12],
];
let ni1Count = 0;
let totalRows = 0;
for (const [name, idx] of gtFiles) {
  const p = `src/game/prg/data/scene/opening/${name}.ts`;
  const txt = fs.readFileSync(p, 'utf8');
  // 找所有 ni:1 出现
  const m = txt.match(/ni:1/g);
  if (m) {
    console.log(`${name}: ni:1 x${m.length}`);
    ni1Count += m.length;
  }
  totalRows += (txt.match(/ni:/g) || []).length;
}
console.log(`total ni: rows=${totalRows}, ni:1 count=${ni1Count}`);
