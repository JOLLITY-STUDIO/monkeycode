// 聚合 emu-full-phases.json: 只保留"结构变化"(chr 数组 / nTbl / bgTable / spTable / NT活动)的相位
// 调色板逐帧 fade 动画不产生结构变化 → 自动归并进上一段
const fs = require('fs');
const path = require('path');
const phases = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'output', 'opening', 'emu-full-phases.json'), 'utf8'));

// 归一化 palette: 只保留实际颜色内容(忽略 fade 亮度叠加, 亮度位 = 高4位交替? 天使之翼2 fade 会把色值写亮度)
// 这里简单处理: 比较原始值即可, 但结构变化判定不依赖 palette
function structuralSig(p) {
  return JSON.stringify([p.chr, p.nTbl, p.bgTable, p.spTable]);
}

const out = [];
let cur = null;
for (const p of phases) {
  const sig = structuralSig(p);
  if (!cur || cur.sig !== sig) {
    cur = { sig, start: p.start, end: p.end, chr: p.chr, nTbl: p.nTbl, bgTable: p.bgTable, spTable: p.spTable, pcMin: p.pcMin, pcMax: p.pcMax, frames: p.frames };
    out.push(cur);
  } else {
    cur.end = p.end;
    cur.frames += p.frames;
    if (p.pcMin < cur.pcMin) cur.pcMin = p.pcMin;
    if (p.pcMax > cur.pcMax) cur.pcMax = p.pcMax;
  }
}
console.log('structural segments:', out.length);
for (const s of out) {
  console.log(
    `f${String(s.start).padStart(4)}-${String(s.end).padStart(4)} (${String(s.frames).padStart(4)}f)` +
    ` pc=${s.pcMin.toString(16)}-${s.pcMax.toString(16)} nTbl=${s.nTbl} bg=${s.bgTable} sp=${s.spTable} chr=[${s.chr.join(',')}]`,
  );
}
