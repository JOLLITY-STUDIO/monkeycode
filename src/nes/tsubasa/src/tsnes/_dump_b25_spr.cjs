// Extract bank25 SPR_PTR table ($B3CF) and the target sprite blocks
const fs = require('fs');
function loadBankTs(path) {
  const src = fs.readFileSync(path, 'utf8');
  const m = src.match(/=\s*\[([\s\S]*?)\];/);
  if (!m) throw new Error('no array in ' + path);
  return m[1].split(',').map(s => parseInt(s.trim().replace(/^0x/i, ''), 16) || 0);
}
const b25 = loadBankTs('rom-data/prg-bank-25.ts');
const BASE = 0xa000;
function rb(cpu) {
  const off = cpu - BASE;
  return off >= 0 && off < b25.length ? b25[off] : -1;
}
console.log('=== bank25 $B3CF sprite ptr table (32 entries) ===');
const ptrs = [];
for (let i = 0; i < 32; i++) {
  const p = rb(0xb3cf + i * 2) | (rb(0xb3d0 + i * 2) << 8);
  ptrs.push(p);
  console.log(`  [${i}] $${p.toString(16)}`);
}
console.log('\n=== bank25 $B3BD sprite bits table (24 bytes) ===');
let row = '';
for (let i = 0; i < 24; i++) {
  row += rb(0xb3bd + i).toString(16).padStart(2, '0') + ' ';
}
console.log('  ' + row);

console.log('\n=== bank25 sprite data blocks (follow SPR_PTR) ===');
const seen = new Set();
for (let i = 0; i < 32; i++) {
  const p = ptrs[i];
  if (seen.has(p) || p < 0xa000) continue;
  seen.add(p);
  const bytes = [];
  for (let k = 0; k < 48 && rb(p + k) !== -1; k++) bytes.push(rb(p + k));
  console.log(`  block @ $${p.toString(16)} (${bytes.length}B): ${bytes.map(b => b.toString(16).padStart(2, '0')).join(' ')}`);
}
