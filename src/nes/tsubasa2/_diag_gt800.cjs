// 提取 GT 表第 800 帧(以及周边帧)的 s 滚动数据,与 emu state.json 对比
const fs = require('fs');
const path = require('path');

// 直接读源 TS(只取数据数组,不编译)。表是单一数组字面量,搜索 "f:800," 前后文本不现实,
// 改从 dist-cjs2 读编译产物(如果存在),否则用 ts 临时编译。
function loadFromCjs() {
  const p = path.join(__dirname, 'dist-cjs2/game/prg/data/scene/OpeningFrameTable.js');
  if (fs.existsSync(p)) {
    const mod = require(p);
    const arr = mod.OPENING_FRAMES || mod.default;
    return arr;
  }
  return null;
}

const arr = loadFromCjs();
if (!arr) {
  console.log('NO_DIST', 'dist-cjs2/game/prg/data/scene/OpeningFrameTable.js not found');
  process.exit(1);
}

const idx = new Map();
for (let i = 0; i < arr.length; i++) idx.set(arr[i].f, i);

for (const f of [795, 796, 797, 798, 799, 800, 801, 802, 810, 820]) {
  const i = idx.get(f);
  if (i === undefined) { console.log(`f=${f}: NOT_IN_TABLE`); continue; }
  const e = arr[i];
  const nCount = e.n ? e.n.length : 0;
  const aCount = e.a ? e.a.length : 0;
  // 统计 n 里实际非零行
  let nonZero = 0;
  if (e.n) for (const row of e.n) { if (row.d && row.d.some(v => v !== 0)) nonZero++; }
  console.log(`f=${f} idx=${i} s=${JSON.stringify(e.s)} ntRows=${nCount} nonZero=${nonZero} attrRows=${aCount} oam=${e.o ? e.o.length : 0}`);
}
