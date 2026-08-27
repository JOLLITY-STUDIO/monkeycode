// 打印 f710 每行完整值（抽样每 4 行 + 统计分布）
const rows = require('./_emu_f710_rows.json');
const col = (r) => `${String(r.scan).padStart(3)} vt=${String(r.regVT).padStart(2)} ht=${String(r.regHT).padStart(2)} fv=${String(r.regFV).padStart(2)} fh=${String(r.regFH).padStart(2)} v=${String(r.regV).padStart(2)} h=${String(r.regH).padStart(2)} cvt=${String(r.cntVT).padStart(2)} cht=${String(r.cntHT).padStart(2)} cfv=${String(r.cntFV).padStart(2)} cv=${String(r.cntV).padStart(2)} ch=${String(r.cntH).padStart(2)}`;
console.log('rows:', rows.length);
// 统计每行 cntH/cntV 分布
const hDist = {}, vDist = {};
for (const r of rows) {
  hDist[r.cntH] = (hDist[r.cntH] || 0) + 1;
  vDist[r.cntV] = (vDist[r.cntV] || 0) + 1;
}
console.log('cntH 分布:', JSON.stringify(hDist));
console.log('cntV 分布:', JSON.stringify(vDist));
console.log('regH 分布:', JSON.stringify(rows.reduce((a, r) => (a[r.regH] = (a[r.regH] || 0) + 1, a), {})));
console.log('regV 分布:', JSON.stringify(rows.reduce((a, r) => (a[r.regV] = (a[r.regV] || 0) + 1, a), {})));
console.log('--- 每 8 行抽样 ---');
for (let i = 0; i < rows.length; i += 8) console.log(col(rows[i]));
console.log('--- 最后 6 行 ---');
for (let i = rows.length - 6; i < rows.length; i++) console.log(col(rows[i]));
