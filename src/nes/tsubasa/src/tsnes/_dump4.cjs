// 打印 bank_12.asm 中 $8060-$80B0 区域（$8349 调用方）与 $8349 反汇编
const fs = require('fs');
const s = fs.readFileSync('_tmp_bzk_out/bank_12.asm', 'utf8');
const lines = s.split(/\r?\n/);
// 找到 0x018060 附近
let start = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('0x018063')) { start = i - 5; break; }
}
if (start < 0) { console.log('not found'); process.exit(); }
for (let i = start; i < Math.min(lines.length, start + 80); i++) console.log(lines[i]);
