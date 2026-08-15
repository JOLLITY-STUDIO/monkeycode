/**
 * Bank16 表补充转储 — Table D/E、Table G 目标代码、精灵动作表
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

console.log('=== Table D $82FE (X 计数分发) ===');
for (let i = 0; i < 24; i++) console.log(`[${i}] ${hex(u16(0x82fe + i * 2))}`);

console.log('\n=== Table G 入口 0 代码 $88FC-$890C ===');
for (let a = 0x88fc; a <= 0x890c; a++) console.log(hex(a) + '=' + '0x' + b(a).toString(16).padStart(2, '0'));

console.log('\n=== Table G 入口 2 代码 $893B-$8941 ===');
for (let a = 0x893b; a <= 0x8941; a++) console.log(hex(a) + '=' + '0x' + b(a).toString(16).padStart(2, '0'));

console.log('\n=== Table G 入口 3+ 代码 $8942-$8949 ===');
for (let a = 0x8942; a <= 0x8949; a++) console.log(hex(a) + '=' + '0x' + b(a).toString(16).padStart(2, '0'));

console.log('\n=== $86F4 精灵动作表 ($86F4-$87DF) 非零项 ===');
const nz = [];
for (let a = 0x86f4; a <= 0x87df; a++) if (b(a) !== 0) nz.push(`${hex(a)}:${b(a)}`);
console.log('非零数:', nz.length, nz.join(' '));

console.log('\n=== $876A 表 ($876A-$87DF) 非零项 ===');
const nz2 = [];
for (let a = 0x876a; a <= 0x87df; a++) if (b(a) !== 0) nz2.push(`${hex(a)}:${b(a)}`);
console.log('非零数:', nz2.length, nz2.join(' '));

console.log('\n=== $8997-$8998 / $89A2-$89A3 / $89AD-$89AE 原始字节 ===');
for (let a = 0x8997; a <= 0x8998; a++) console.log(hex(a) + '=' + '0x' + b(a).toString(16).padStart(2, '0'));
for (let a = 0x89a2; a <= 0x89a3; a++) console.log(hex(a) + '=' + '0x' + b(a).toString(16).padStart(2, '0'));
for (let a = 0x89ad; a <= 0x89ae; a++) console.log(hex(a) + '=' + '0x' + b(a).toString(16).padStart(2, '0'));
