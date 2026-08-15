// 提取 bank30 $CB99 dispatcher 代码 + bank11 $83FD-$840A 区域 + bank26 中调用 bank11 的代码
const fs = require('fs');

// 1. bank30 dispatcher
const b30 = fs.readFileSync('_tmp_bzk_out/bank_30.asm', 'utf8');
const lines30 = b30.split(/\r?\n/);
console.log('==== bank30 $CB99-$CC20 (C509 dispatcher) ====');
let n = 0;
for (const l of lines30) {
  const m = l.match(/0x[0-9A-F]{6}\s+0F:([0-9A-F]{4}):\s+(.*)$/);
  if (!m) continue;
  const a = parseInt(m[1], 16);
  if (a >= 0xCB99 && a <= 0xCC20) { console.log(m[1] + ': ' + m[2].trim()); n++; }
}
console.log('(' + n + ' lines)\n');

// 2. bank11 $83FD-$840A 区域 (原始 asm 全部行)
const b11 = fs.readFileSync('_tmp_bzk_out/bank_11.asm', 'utf8');
const lines11 = b11.split(/\r?\n/);
console.log('==== bank11 $83F9-$840D ====');
for (const l of lines11) {
  const m = l.match(/0x[0-9A-F]{6}\s+\d{2}:([0-9A-F]{4}):\s+(.*)$/);
  if (!m) continue;
  const a = parseInt(m[1], 16);
  if (a >= 0x83F9 && a <= 0x840D) console.log(m[1] + ': ' + m[2].trim());
}
