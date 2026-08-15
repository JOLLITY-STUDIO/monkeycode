const path = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa2-h5-src/src/data/bank27-data.ts';
const fs = require('fs');
const src = fs.readFileSync(path, 'utf8');
const m = src.match(/B27_DATA[^=]*= \[([\s\S]*?)\];/);
const bytes = m[1].split(',').map(s => s.trim()).filter(s => /^0x[0-9A-Fa-f]+$/.test(s)).map(s => parseInt(s, 16));
const hex = v => v.toString(16).toUpperCase().padStart(2, '0');
function dump(off, len) {
  const row = [];
  for (let i = 0; i < len; i++) row.push(hex(bytes[off + i]));
  for (let i = 0; i < row.length; i += 16) console.log('  ' + row.slice(i, i + 16).join(' '));
}
console.log('== script 0 @ phys 0x2AE ($A2AE) ==');
dump(0x2ae, 32);
console.log('== block 0 @ phys 0x46A ($A46A) ==');
dump(0x46a, 40);
console.log('== block 1 @ phys 0x48F ($A48F) ==');
dump(0x48f, 12);
console.log('== scene ptr 0 @ phys 0x6B5 ($A6B5) ==');
dump(0x6b5, 16);
console.log('== scene data 0 @ phys 0xB7D ($AB7D) ==');
dump(0xb7d, 32);
