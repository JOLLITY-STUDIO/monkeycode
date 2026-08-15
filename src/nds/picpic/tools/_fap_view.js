const fs = require('fs');
const b = fs.readFileSync('roms/extracted/fap_d/3300401_rooster.fap');
const w = 15, h = 15;
let out = '';
out += '=== 0xF=# 其他=. (head=2) ===\n';
for (let y = 0; y < h; y++) { for (let x = 0; x < w; x++) { const i = y * w + x; const byte = b[2 + (i >> 1)]; const v = (i & 1) ? (byte >> 4) : (byte & 0x0F); out += v === 0xF ? '#' : '.'; } out += '\n'; }
out += '=== 值视图 (head=2) ===\n';
for (let y = 0; y < h; y++) { for (let x = 0; x < w; x++) { const i = y * w + x; const byte = b[2 + (i >> 1)]; const v = (i & 1) ? (byte >> 4) : (byte & 0x0F); out += v.toString(16); } out += '\n'; }
fs.writeFileSync('tools/_fap_grid2.txt', out);
console.log('written', out.length);
