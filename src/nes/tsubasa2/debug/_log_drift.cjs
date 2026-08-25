// _log_drift.cjs — 检查 log 中 drift 循环 (DEY $84D5 / BNE $84D6) 与 fullbright ($84F9) 的真实窗口
const fs = require('fs');
const l = fs.readFileSync('docs/roms/opening-all/opening-all.log', 'utf8').split('\n');

// 检查 log 是否有 $01:A4xx 地址（summar 声称 drift 在 $A4CB）
let c1 = 0, c2 = 0;
const a4 = new Set(), a84 = new Set();
for (let i = 0; i < l.length; i++) {
  const m = /\$0([0-9]):([0-9A-F]{4}):/.exec(l[i]);
  if (m) {
    const addr = m[2];
    if (addr.startsWith('A4')) { a4.add(m[1] + ':' + addr); c1++; }
    if (addr.startsWith('84')) { a84.add(m[1] + ':' + addr); c2++; }
  }
}
console.log('log 中 A4xx 地址数:', a4.size, '总出现:', c1);
console.log('log 中 84xx 地址数:', a84.size, '总出现:', c2);
console.log('A4 样本:', Array.from(a4).slice(0, 20).join(', '));
console.log('84 样本:', Array.from(a84).slice(0, 20).join(', '));

// 检查 $84D5 DEY + $84D6 BNE 的相邻出现（drift 循环体）
let curFrame = null;
let lastDeY = null;
const driftHits = [];
for (let i = 0; i < l.length; i++) {
  const m = /^f(\d+)/.exec(l[i]);
  if (m) curFrame = +m[1];
  const am = /\$0([0-9]):([0-9A-F]{4}):/.exec(l[i]);
  if (am) {
    const addr = am[2];
    if (addr === '84D5') {
      lastDeY = { frame: curFrame, line: i };
    } else if (addr === '84D6') {
      // BNE 在同一帧紧跟 DEY
      const same = lastDeY && Math.abs(lastDeY.line - i) <= 8;
      if (same) driftHits.push({ frame: curFrame, line: i });
    }
  }
}
console.log('--- $84D5 DEY → $84D6 BNE 同帧连续执行次数:', driftHits.length);
console.log('  首:', driftHits[0], '末:', driftHits[driftHits.length - 1]);
