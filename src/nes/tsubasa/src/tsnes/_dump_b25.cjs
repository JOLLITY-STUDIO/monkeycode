// 临时脚本: dump bank25 (CPU $A000-$BFFF 映射) 的 HUD 指针表区域
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
function dump(addr, n, label) {
  out.push('=== ' + label + ' ($' + addr.toString(16).toUpperCase() + ', ' + n + 'B) ===');
  for (let i = addr; i < addr + n; i += 16) out.push(row(i, 16));
}
dump(0xAD6E, 64, 'HUD1 PTR');
dump(0xAD1C, 40, 'HUD2 PTR');
dump(0xAD54, 40, 'HUD3 PTR');
dump(0xB3BD, 16, 'SPR B3BD');
dump(0xB3CF, 32, 'SPR B3CF PTR');
fs.writeFileSync('_b25_tables.txt', out.join('\n'));
console.log('done');
