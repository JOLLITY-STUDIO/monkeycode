// 临时脚本: dump bank25 HUD 行1 文本流数据区
const fs = require('fs');
const src = fs.readFileSync('rom-data/prg-bank-25.ts', 'utf8');
const m = src.match(/const PRG_BANK_\d+: readonly number\[\] = \[([\s\S]*?)\];/);
const b = m[1].split(',').filter(s => s.trim() !== '').map(s => parseInt(s.trim(), 16));

const out = [];
function row(cpuA, n) {
  let l = '$' + cpuA.toString(16).padStart(4, '0') + ': ';
  for (let j = 0; j < n; j++) {
    const off = (cpuA + j) - 0xA000;
    l += (off >= 0 && off < b.length ? b[off] : 0).toString(16).padStart(2, '0') + ' ';
  }
  return l;
}
out.push('=== $AD6E..$AE40 (HUD1 指针表 + 数据) ===');
for (let i = 0xAD6E; i < 0xAE40; i += 16) out.push(row(i, 16));
fs.writeFileSync('_b25_tables2.txt', out.join('\n'));
console.log('done');
