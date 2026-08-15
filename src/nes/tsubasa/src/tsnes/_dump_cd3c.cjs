const fs = require('fs');
const path = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/rom-data/prg-bank-30.ts';
const t = fs.readFileSync(path, 'utf8');
const m = t.match(/=\s*(\[[\s\S]*?\])\s*;/);
const arr = eval(m[1]);
// $C51E → JMP $CD3C. 先看 $C51E 入口区
console.log('=== $C51E 区 (raw) ===');
for (let a = 0xc51e; a <= 0xc524; a++) console.log(`$${a.toString(16)}: ${arr[a - 0xc000].toString(16).padStart(2, '0')}`);
console.log('=== $CD3C-$CD76 (raw) ===');
for (let a = 0xcd3c; a <= 0xcd76; a++) console.log(`$${a.toString(16)}: ${arr[a - 0xc000].toString(16).padStart(2, '0')}`);
