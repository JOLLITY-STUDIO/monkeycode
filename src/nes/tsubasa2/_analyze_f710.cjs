// 分析 emu f710 每行 renderBgScanline 时的 scroll/cnt 值，找水平/垂直滚动规律
const rows = require('./_emu_f710_rows.json');
console.log('rows:', rows.length);
const byScan = new Map(rows.map(r => [r.scan, r]));
// 每行打印 v/h 相关
let prevH = -1, prevV = -1;
let changes = [];
for (const r of rows) {
  const line = `${String(r.scan).padStart(3)} vt=${r.regVT} ht=${r.regHT} fv=${r.regFV} fh=${r.regFH} v=${r.regV} h=${r.regH} cntVT=${r.cntVT} cntHT=${r.cntHT} cntFV=${r.cntFV} cntV=${r.cntV} cntH=${r.cntH}`;
  if (r.cntH !== prevH || r.cntV !== prevV) {
    changes.push(line);
    prevH = r.cntH; prevV = r.cntV;
  }
}
console.log('--- cnt 变化点 (' + changes.length + ') ---');
console.log(changes.join('\n'));
