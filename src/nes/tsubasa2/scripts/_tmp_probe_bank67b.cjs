// 深入分析 bank06 脚本段 & bank07 CHR 布局
const fs = require('fs');
const path = require('path');

function loadBank(bankNo) {
  const dir = path.join(__dirname, '..', 'src', 'asm', `bank${String(bankNo).padStart(2, '0')}`);
  const parts = ['data_tables.s', 'data_maps.s', 'data_tail.s'];
  const bytes = [];
  for (const p of parts) {
    const c = fs.readFileSync(path.join(dir, p), 'utf8');
    const hex = c.match(/\$([0-9A-Fa-f]{2})/g) || [];
    for (const h of hex) bytes.push(parseInt(h.slice(1), 16));
  }
  return bytes;
}
const b6 = loadBank(6);
const b7 = loadBank(7);
const u16 = (a, o) => a[o] | (a[o + 1] << 8);

// ===== bank06 头部指针 =====
console.log('=== bank06 头部连续指针表 ===');
let i = 0;
const ptrs = [];
while (i + 1 < 0x300) {
  const p = u16(b6, i);
  if (p >= 0xA000 && p <= 0xBFFF) { ptrs.push(p); i += 2; }
  else break;
}
console.log('连续指针数:', ptrs.length, '末偏移:', i.toString(16));
ptrs.forEach((p, idx) => {
  const off = p - 0xA000;
  const next = idx + 1 < ptrs.length ? ptrs[idx + 1] : 0;
  const len = next ? next - p : -1;
  console.log(`  seg[${idx}] cpu $${p.toString(16)} off 0x${off.toString(16)} len=${len >= 0 ? len : '?'}`);
});

// ===== bank06 脚本段内容 dump（前3段）=====
console.log('\n=== bank06 seg[0] @ $A00C 前 48 字节 ===');
const s0 = ptrs[0] - 0xA000;
console.log(b6.slice(s0, s0 + 48).map(v => v.toString(16).padStart(2, '0')).join(' '));
console.log('=== bank06 seg[1] @ $A01B 前 32 字节 ===');
const s1 = ptrs[1] - 0xA000;
console.log(b6.slice(s1, s1 + 32).map(v => v.toString(16).padStart(2, '0')).join(' '));
console.log('=== bank06 seg[2] @ $A028 前 64 字节 ===');
const s2 = ptrs[2] - 0xA000;
console.log(b6.slice(s2, s2 + 64).map(v => v.toString(16).padStart(2, '0')).join(' '));

// ===== bank06 0x1800-0x1A9D 内容探测（是什么？）=====
console.log('\n=== bank06 offset 0x1800-0x1A00 前 64 字节 ===');
console.log(b6.slice(0x1800, 0x1840).map(v => v.toString(16).padStart(2, '0')).join(' '));
console.log('=== bank06 offset 0x1B40-0x1B80 ===');
console.log(b6.slice(0x1B40, 0x1B80).map(v => v.toString(16).padStart(2, '0')).join(' '));
console.log('=== bank06 offset 0x1D00-0x1D40 ===');
console.log(b6.slice(0x1D00, 0x1D40).map(v => v.toString(16).padStart(2, '0')).join(' '));
console.log('=== bank06 offset 0x1D80-0x1DC0 ===');
console.log(b6.slice(0x1D80, 0x1DC0).map(v => v.toString(16).padStart(2, '0')).join(' '));

// ===== bank07 CHR 指针表完整 =====
console.log('\n=== bank07 CHR 指针表（连续 $A000-$BFFF 指针）===');
let j = 0;
const cptrs = [];
while (j + 1 < 0x1400) {
  const p = u16(b7, j);
  if (p >= 0xA000 && p <= 0xBFFF) { cptrs.push(p); j += 2; }
  else break;
}
console.log('CHR 指针数:', cptrs.length, '表结束偏移:', j.toString(16));
// 每个指针的长度 = 下一个指针 - 当前指针
cptrs.forEach((p, idx) => {
  const next = idx + 1 < cptrs.length ? cptrs[idx + 1] : 0x2000 + 0xA000;
  console.log(`  [${idx.toString(16)}] cpu $${p.toString(16)} off 0x${(p - 0xA000).toString(16)} len=${next - p}`);
});

// ===== bank07 CHR 配置内容：第一项 =====
console.log('\n=== bank07 chr[0] @ $A0D4 ===');
console.log(b7.slice(0xD4, 0xD4 + 32).map(v => v.toString(16).padStart(2, '0')).join(' '));
console.log('=== bank07 chr[0x17] @ $A373（开场用）===');
console.log(b7.slice(0x373, 0x373 + 48).map(v => v.toString(16).padStart(2, '0')).join(' '));
