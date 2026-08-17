/**
 * Bank16 表转储校验 — 从 prg-bank-16.ts 原始字节提取全部指针表/查找表
 * 运行: node scripts/_dump_b16_tables.cjs (工作目录 tsubasa2-h5-src)
 */
const fs = require('fs');
const path = require('path');

const p16 = path.resolve(__dirname, '../../rom-data/prg-bank-16.ts');
const t = fs.readFileSync(p16, 'utf8');
const m = t.match(/\[([\s\S]*?)\];/);
const bytes = m[1].split(',').map((s) => parseInt(s.trim(), 16));

function b(a) { return bytes[a - 0x8000]; }
function u16(a) { return b(a) | (b(a + 1) << 8); }
function hex(a) { return '$' + a.toString(16).toUpperCase().padStart(4, '0'); }
function row(lo, hi, per) {
  const out = [];
  for (let a = lo; a <= hi; a++) out.push(hex(a) + '=' + '0x' + b(a).toString(16).padStart(2, '0'));
  console.log(out.join(' '));
}

console.log('=== Table A 命令分发 $80AF (16 项 ×2B) ===');
const ta = [];
for (let i = 0; i < 16; i++) ta.push(hex(u16(0x80af + i * 2)));
console.log(ta.join(' '));

console.log('\n=== Table B 谓词分发 $8173 (74 项 ×2B) ===');
const tb = [];
for (let i = 0; i < 74; i++) tb.push(hex(u16(0x8173 + i * 2)));
console.log(tb.join(' '));

console.log('\n=== Table F $886D (脚本字节索引, 6 项) ===');
for (let i = 0; i < 6; i++) console.log(`[${i}] ${hex(u16(0x886d + i * 2))}`);

console.log('\n=== Table G $88F4 (脚本字节索引) ===');
for (let i = 0; i < 8; i++) console.log(`[${i}] ${hex(u16(0x88f4 + i * 2))}`);

console.log('\n=== 次级分发表 entry0 ===');
console.log('$8991 表 @$8997:', hex(u16(0x8997)));
console.log('$899C 表 @$89A2:', hex(u16(0x89a2)));
console.log('$89A7 表 @$89AD:', hex(u16(0x89ad)));

console.log('\n=== Table H $89BF (64 项 ×2B) ===');
for (let i = 0; i < 64; i += 8) {
  const e = [];
  for (let j = 0; j < 8; j++) e.push(`[${i + j}]${hex(u16(0x89bf + (i + j) * 2))}`);
  console.log(e.join(' '));
}

console.log('\n=== Table I $8ABF (64 项 ×2B) ===');
for (let i = 0; i < 64; i += 8) {
  const e = [];
  for (let j = 0; j < 8; j++) e.push(`[${i + j}]${hex(u16(0x8abf + (i + j) * 2))}`);
  console.log(e.join(' '));
}

console.log('\n=== 小查找表 ===');
console.log('$8291:', row(0x8291, 0x8296));
console.log('$8308 (23B):', row(0x8308, 0x831e, 0));
console.log('$83AF:', row(0x83af, 0x83b3, 0));
console.log('$83BB:', row(0x83bb, 0x83c1, 0));
console.log('$857A:', row(0x857a, 0x857f, 0));
console.log('$8622 (5B):', row(0x8622, 0x8626, 0));
console.log('$8635:', row(0x8635, 0x863a, 0));
console.log('$8645:', row(0x8645, 0x8649, 0));
console.log('$86A6 (14B):', row(0x86a6, 0x86b3, 0));
console.log('$86C8 (4B):', row(0x86c8, 0x86cb, 0));
console.log('$86E3 (17B):', row(0x86e3, 0x86f3, 0));
console.log('$876A (16B 首段):', row(0x876a, 0x8779, 0));
console.log('$86F4-$87DF 精灵动作表 (部分):', row(0x86f4, 0x8713, 0));

console.log('\n=== 数据区边界 ===');
console.log('$89B3 RTS 之后 → $89B4:', row(0x89b4, 0x89be, 0));
