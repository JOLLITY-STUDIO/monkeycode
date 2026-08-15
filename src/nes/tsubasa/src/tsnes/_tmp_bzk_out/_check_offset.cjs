const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'rom-data', 'prg-bank-02.ts'), 'utf8');
const start = src.indexOf('['), end = src.lastIndexOf(']');
const nums = [];
for (const tok of src.slice(start + 1, end).split(',')) {
  const t = tok.trim();
  if (!t) continue;
  const v = parseInt(t, 16);
  if (!Number.isNaN(v)) nums.push(v);
}
console.log('length:', nums.length);
const hx = (a) => nums.slice(a, a + 12).map(v => v.toString(16).padStart(2, '0')).join(' ');
// check offset 0 (should be $A000 or $A001 byte)
console.log('index 0      :', hx(0));
console.log('index 0x1F8  :', hx(0x1F8)); // expect JMP $A21B = 4C 21 A2 near $A200
console.log('index 0xA05  :', hx(0xA05)); // $AA06 should be 84 ED E8 A0 00 48
console.log('index 0xA06  :', hx(0xA06));
