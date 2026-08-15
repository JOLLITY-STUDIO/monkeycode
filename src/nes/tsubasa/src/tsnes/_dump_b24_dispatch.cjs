// 临时脚本: dump $89B0-$8A50 验证 C509 dispatch 向量表布局与偏移
const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, 'rom-data', 'prg-bank-24.ts'), 'utf8');
const m = src.match(/=\s*(\[[\s\S]*\]);\s*export default/s);
const bytes = m[1].split(',').map((s) => parseInt(s.trim().replace(/0x/i, ''), 16));
const B24_BASE = 0x8000;
function b(cpu) { return bytes[cpu - B24_BASE]; }
function dump(start, end, label) {
  console.log(`\n=== ${label} (CPU $${start.toString(16)}-$${end.toString(16)}) ===`);
  let line = '';
  for (let a = start; a <= end; a++) {
    line += b(a).toString(16).padStart(2, '0').toUpperCase() + ' ';
    if ((a - start + 1) % 16 === 0) {
      console.log(`$${a.toString(16)}: ${line}`);
      line = '';
    }
  }
  if (line) console.log(`$${(end & 0xfff0).toString(16)}: ${line}`);
}
dump(0x89b0, 0x8a30, 'C509 向量表布局 ($89B0-$8A30)');
dump(0x8a10, 0x8a25, 'cmd4 子表 ($8A10-$8A25)');

// 尝试不同偏移解码 cmd 目标
console.log('\n=== 偏移分析 (base $89BA, 读取 ret+1+cmd*2 / ret+cmd*2) ===');
for (let base = 0x89b8; base <= 0x89bc; base++) {
  console.log(`base $${base.toString(16)} (lo 在 base+cmd*2):`);
  let s = '';
  for (let cmd = 0; cmd < 8; cmd++) {
    const lo = b(base + cmd * 2);
    const hi = b(base + cmd * 2 + 1);
    s += ` cmd${cmd}=$${(hi << 8 | lo).toString(16).toUpperCase()}`;
  }
  console.log(s);
}
