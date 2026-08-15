/* 提取 bank24 指针表数据 (临时脚本) */
const fs = require('fs');
const src = fs.readFileSync('rom-data/prg-bank-24.ts', 'utf8');
// 取出数组内容 (跳过 number[] 类型声明)
const start = src.indexOf('= [') + 2;
const end = src.lastIndexOf(']');
const body = src.slice(start + 1, end);
const arr = body.split(',').map(s => parseInt(s.trim(), 16));
console.log('bank24 length:', arr.length);

const base = 0x8000;
function dump(cpu, len, label) {
  const off = cpu - base;
  const bytes = arr.slice(off, off + len);
  const hex = bytes.map(b => '0x' + b.toString(16).padStart(2, '0')).join(', ');
  console.log(`=== ${label} $${cpu.toString(16)} (off $${off.toString(16)}) ===`);
  console.log(`[${hex}]`);
  console.log();
}
dump(0xAD1C, 0x38, 'HUD2 PTR (14 entries)');
dump(0xAD54, 0x1A, 'HUD3 PTR (7 entries)');
dump(0xAD6E, 0x20, 'HUD1 PTR (8 entries)');
dump(0xB3BD, 0x12, 'SPR B3BD');
dump(0xB3CF, 0x50, 'SPR B3CF');
