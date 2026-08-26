const fs = require('fs');
const lines = fs.readFileSync('docs/roms/opening-all/opening-all-per-frame.log', 'utf8').split(/\r?\n/);
// 统计 $2006 写地址的高字节分布（A 值）
const hiVals = {};
const loCount = {};
let vramHi = null;
const writes2007 = [];
for (const l of lines) {
  const m = l.match(/^f(\d+)\s+c(\d+)\s+i(\d+)\s+A:([0-9A-F]{2})\s+X:([0-9A-F]{2})\s+Y:([0-9A-F]{2})\s+S:([0-9A-F]{2})\s+P:([A-Za-z]+)\s+\$([0-9A-F]{2}):([0-9A-F]{4}):\s+(.+)$/);
  if (!m) continue;
  const A = parseInt(m[4], 16);
  const instr = m[11];
  if (instr.length < 10) continue;
  const op = instr.slice(9).trim();
  const opM = op.match(/^([A-Z]{3})\s+(\$[0-9A-F]{4})/);
  if (!opM) continue;
  const mnem = opM[1], dest = opM[2];
  if (mnem !== 'STA') continue;
  if (dest === '$2006') {
    if (vramHi === null) { vramHi = A; hiVals[A.toString(16)] = (hiVals[A.toString(16)] || 0) + 1; }
    else { vramHi = null; }
  } else if (dest === '$2007' && vramHi !== null) {
    writes2007.push({ hi: vramHi, A });
    vramHi = null;
  } else if (dest === '$2007') {
    writes2007.push({ hi: -1, A });
  }
}
console.log('=== $2006 高字节(A) 分布 ===');
for (const [k, v] of Object.entries(hiVals).sort((a, b) => b[1] - a[1])) console.log('  hi=0x' + k, v);
console.log('=== $2007 写统计 ===');
console.log('  total', writes2007.length, 'with hi=-1 (无配对):', writes2007.filter(w => w.hi === -1).length);
// 按 hi 分组
const byHi = {};
for (const w of writes2007) {
  const k = w.hi === -1 ? 'NO_PAIR' : '0x' + w.hi.toString(16);
  (byHi[k] = byHi[k] || []).push(w);
}
for (const [k, arr] of Object.entries(byHi)) {
  console.log('  hi=' + k, 'count=' + arr.length, 'A分布前10:', Object.entries(arr.reduce((m, w) => { m[w.A] = (m[w.A] || 0) + 1; return m; }, {})).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([a, c]) => a + ':' + c).join(' '));
}
