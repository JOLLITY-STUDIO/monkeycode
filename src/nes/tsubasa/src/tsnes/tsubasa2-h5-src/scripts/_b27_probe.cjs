const fs = require('fs');
const b = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_28.asm', 'utf8').split(/\r?\n/);
const map = {};
for (let i = 0; i < b.length; i++) {
  const m = b[i].match(/0E:([0-9A-F]{4}):\s+([0-9A-F]{2})/);
  if (m) map[parseInt(m[1], 16)] = parseInt(m[2], 16);
}
function b28(a) { return map[a] !== undefined ? map[a] : NaN; }
function u16(a) { return b28(a) | (b28(a + 1) << 8); }
console.log('818E table:', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => '0x' + b28(0x818e + i).toString(16)).join(' '));
console.log('8199[0..5]:', [0, 2, 4, 6, 8, 10].map(i => '$' + u16(0x8199 + i).toString(16).toUpperCase()).join(' '));
console.log('95D6..95DA:', [0, 1, 2, 3, 4].map(i => '0x' + b28(0x95d6 + i).toString(16)).join(' '));
console.log('9662..9666:', [0, 1, 2, 3, 4].map(i => '0x' + b28(0x9662 + i).toString(16)).join(' '));
// verify bank28-tables.ts B28_DATA first bytes match
const t = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa2-h5-src/src/data/bank28-tables.ts', 'utf8');
const m = t.match(/B28_DATA:[\s\S]*?=\s*\[([\s\S]*?)\n\s*\];/);
if (m) {
  const bytes = [...m[1].matchAll(/0x([0-9A-Fa-f]{2})/g)].map(x => parseInt(x[1], 16));
  console.log('bank28-tables.ts bytes:', bytes.length);
  console.log('ts 818E:', [0, 1, 2, 3, 4].map(i => '0x' + bytes[0x18e + i].toString(16)).join(' '));
  console.log('ts 8199:', '0x' + bytes[0x199].toString(16), '0x' + bytes[0x19a].toString(16));
  console.log('ts 95D6:', '0x' + bytes[0x15d6].toString(16));
  console.log('ts 9662:', '0x' + bytes[0x1662].toString(16));
}
