// 临时：dump bank02 $A2E8-$A470（$8895 NMI 回调路径）与 $A773 数据区
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/tecmo/strippeddata.nes');
// 文件偏移 = 0x4010 + (cpuAddr & 0x1fff)；bank02 在 PRG 索引 1（CPU $A000-$BFFF）
const HEADER = 0x10;
function rd(cpuAddr) {
  const off = HEADER + 0x2000 + (cpuAddr & 0x1fff);
  return rom[off];
}
function dump(start, end, label) {
  console.log('=== ' + label + ' $' + start.toString(16).toUpperCase() + '-$' + end.toString(16).toUpperCase() + ' ===');
  let line = '';
  for (let a = start; a <= end; a++) {
    line += rd(a).toString(16).padStart(2, '0') + ' ';
    if ((a - start + 1) % 16 === 0) { console.log('$' + a.toString(16).toUpperCase().padStart(4, '0') + '  ' + line); line = ''; }
  }
  if (line) console.log('$' + end.toString(16).toUpperCase().padStart(4, '0') + '  ' + line);
}
dump(0xA2E8, 0xA490, 'A2E8-A490');
dump(0xA773, 0xA77A, 'A773 data');
