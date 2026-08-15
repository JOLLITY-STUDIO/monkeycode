// 提取 bank26 中 $911C 之后的所有指令 + C600-C648 helper 引用
const fs = require('fs');
const lines = fs.readFileSync('_tmp_bzk_out/bank_26.asm', 'utf8').split('\n');
const out = [];
for (const l of lines) {
  const m = l.match(/0x([0-9A-F]{6})\s+([0-9A-F]{2}):([0-9A-F]{4}):\s+((?:[0-9A-F]{2} ){1,3})(.*?)\s*$/);
  if (!m) continue;
  const a = parseInt(m[3], 16);
  if (a >= 0x911C && a <= 0x9FFF) out.push('$' + m[3] + ' ' + m[5].trim());
}
fs.writeFileSync('_b26_tail.txt', out.join('\n'));
console.log('lines:', out.length);
