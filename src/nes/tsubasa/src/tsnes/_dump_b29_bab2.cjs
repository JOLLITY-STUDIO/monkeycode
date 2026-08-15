// 提取 bank29 $BAB2 附近数据（R7 窗口，CPU $A000-$BFFF，文件 offset = CPU - 0xA000）
const fs = require('fs');
const s = fs.readFileSync('rom-data/prg-bank-29.ts', 'utf8');
const m = s.match(/=\s*\[([\s\S]*?)\];/);
const b = m[1].split(',').map(x => parseInt(x.trim(), 16)).filter(n => !isNaN(n));
console.log('bank29 len=0x' + b.length.toString(16));
const cpu2off = (cpu) => cpu - 0xA000;
const d = (cpu) => b[cpu2off(cpu)] !== undefined ? '0x' + b[cpu2off(cpu)].toString(16).padStart(2, '0') : '--';
// $BAB2 区域 (16B 指针表)
console.log('=== $BAB2-$BAC2 (指针表, 8项) ===');
for (let i = 0; i < 8; i++) {
  const v = b[cpu2off(0xBAB2 + i * 2)] | (b[cpu2off(0xBAB2 + i * 2 + 1)] << 8);
  console.log('  idx=' + i + ' $BA' + (0xB2 + i * 2).toString(16) + ' -> $' + v.toString(16).toUpperCase());
}
// 指针指向的数据
console.log('\n=== $BAB2 指向的数据块 ===');
for (let i = 0; i < 8; i++) {
  const ptr = b[cpu2off(0xBAB2 + i * 2)] | (b[cpu2off(0xBAB2 + i * 2 + 1)] << 8);
  const off = cpu2off(ptr);
  const data = b.slice(off, off + 24);
  console.log('  idx=' + i + ' $' + ptr.toString(16).toUpperCase() + ': ' + data.map(x => '0x' + x.toString(16).padStart(2, '0')).join(' '));
}
// 9E4E 表对应 bank28 数据
const s28 = fs.readFileSync('rom-data/prg-bank-28.ts', 'utf8');
const m28 = s28.match(/=\s*\[([\s\S]*?)\];/);
const b28 = m28[1].split(',').map(x => parseInt(x.trim(), 16)).filter(n => !isNaN(n));
console.log('\n=== bank28 $9E4E (等级映射, 24B) ===');
console.log(b28.slice(0x1E4E, 0x1E4E + 24).map(x => '0x' + x.toString(16).padStart(2, '0')).join(' '));
console.log('\n=== bank28 $9E4E+24 起 (看后续数据) ===');
console.log(b28.slice(0x1E4E + 24, 0x1E4E + 80).map(x => '0x' + x.toString(16).padStart(2, '0')).join(' '));
