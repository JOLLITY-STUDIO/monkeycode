// 确认 $A761/$A88D 循环实际复制的 4 字节 ($AC9E-$ACA1 与 $ACB4-$ACB7)
const fs = require('fs');
const raw = fs.readFileSync('rom-data/prg-bank-01.ts', 'utf8');
const m = raw.match(/\[([\s\S]*)\]/);
const bytes = m[1].split(',').map(s => parseInt(s.trim(), 16));

function hex(n) { return '0x' + n.toString(16).toUpperCase().padStart(2, '0'); }
function dump(cpuAddr, len, label) {
  const off = cpuAddr - 0xA000;
  console.log(label + ' @$' + cpuAddr.toString(16) + ':');
  console.log('  ' + bytes.slice(off, off + len).map(hex).join(', '));
}
dump(0xAC9E, 4, 'AC9E-ACA1 (A761 loop)');
dump(0xACB4, 4, 'ACB4-ACB7 (A88D loop)');
// 顺带验证 $ACA2 起是代码还是数据
dump(0xACA2, 16, 'ACA2 (code?)');
dump(0xACB8, 16, 'ACB8 (code?)');
