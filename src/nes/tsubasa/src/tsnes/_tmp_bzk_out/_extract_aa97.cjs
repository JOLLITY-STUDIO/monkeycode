// Extract tables from rom-data/prg-bank-02.ts — index = addr - 0xA001
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
console.log('array length:', nums.length);

function slice(label, addr, len) {
  const off = addr - 0xA001;
  const arr = nums.slice(off, off + len);
  console.log(`\n${label} ($${addr.toString(16)}, ${len}B):`);
  console.log('[' + arr.join(',') + ']');
}

slice('AA97_ppuBufScript', 0xAA97, 72);
slice('AADF_scroll', 0xAADF, 64);
slice('AB1F_password', 0xAB1F, 16);
slice('AA47_tiles', 0xAA47, 46);
slice('AA75_cat', 0xAA75, 26);
slice('A773_misc', 0xA773, 8);
slice('A677_sprites', 0xA677, 260);
slice('A472_unknown', 0xA472, 32);
slice('A4E0_seq', 0xA4E0, 200);
