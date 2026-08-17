// Debug raw asm lines
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '_tmp_bzk_out', 'bank_02');
const f1 = path.join(dir, 'bank_02_part02.asm');
const buf = fs.readFileSync(f1);
console.log('first 40 bytes hex:', buf.slice(0, 40).toString('hex'));
const txt = buf.toString('utf8');
const lines = txt.split(/\r?\n/);
console.log('lines count:', lines.length);
for (let i = 0; i < 12; i++) {
  console.log('L' + i, JSON.stringify(lines[i]));
}
// find a line with 8A97
const hit = lines.findIndex(l => l.includes('8A97'));
console.log('first 8A97 line index:', hit, hit >= 0 ? JSON.stringify(lines[hit]) : '');
