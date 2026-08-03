const fs = require('fs');
const c = fs.readFileSync('game-engine/native-game/tsubasa/banks/prg/bank-01-data.ts', 'utf8');

function extractArray(label) {
  const idx = c.indexOf('DATA_' + label);
  if (idx < 0) { console.log('  NOT FOUND:', label); return []; }
  // Find "= [" not just "[" (avoid matching number[] from type declaration)
  const eqIdx = c.indexOf('=', idx);
  const open = c.indexOf('[', eqIdx);
  if (open < 0) return [];
  let depth = 0, close = open;
  for (let i = open; i < c.length; i++) {
    if (c[i] === '[') depth++;
    else if (c[i] === ']') { depth--; if (depth === 0) { close = i; break; } }
  }
  const arr = c.substring(open + 1, close);
  return (arr.match(/0x[0-9A-Fa-f]{2}/g) || []).map(h => parseInt(h, 16));
}

// === TEXT_STRING_DATA $9DF2-$9F14 ===
const t = extractArray('$9DF2_$9F14');
console.log('=== TEXT_DATA (' + t.length + ' bytes) ===');
const strings = [];
let cur = [];
for (const b of t) {
  if (b === 0xFF) { if (cur.length) strings.push(cur); cur = []; }
  else cur.push(b);
}
if (cur.length) strings.push(cur);
console.log('Strings:', strings.length);
strings.forEach((s, i) => {
  const ascii = s.filter(b => b >= 0x20 && b < 0x7F).map(b => String.fromCharCode(b)).join('');
  const hex = s.map(b => b.toString(16).padStart(2,'0')).join(' ');
  console.log(`  [${i}] ${s.length}B ascii="${ascii}"`);
  console.log(`       hex: ${hex}`);
});

// === PPU_UPLOAD_DATA $9F15-$9FFF ===
const p = extractArray('$9F15_$9FFF');
console.log('\n=== PPU_DATA (' + p.length + ' bytes) ===');
// Format: addrLo, addrHi, data_bytes..., ($FD or $FF terminator)
const recs = [];
let i = 0;
while (i < p.length) {
  if (p[i] === 0xFF) { i++; continue; }
  if (i + 1 >= p.length) break;
  const addr = p[i] | (p[i+1] << 8);
  i += 2;
  const data = [];
  while (i < p.length && p[i] !== 0xFD && p[i] !== 0xFF) data.push(p[i++]);
  const term = i < p.length ? p[i] : null;
  if (term === 0xFD || term === 0xFF) i++;
  const isPPU = addr >= 0x2000 && addr <= 0x2FFF;
  recs.push({
    addr: '0x'+addr.toString(16).padStart(4,'0'),
    ppu: isPPU,
    len: data.length,
    term: term ? '0x'+term.toString(16).padStart(2,'0') : 'none',
    hex: data.map(b=>b.toString(16).padStart(2,'0')).join(' ')
  });
}
console.log('Records:', recs.length);
recs.forEach((r, j) => {
  console.log(`  [${j}] addr=$${r.addr} ppu=${r.ppu} len=${r.len} term=${r.term}`);
  if (r.len <= 30) console.log(`       ${r.hex}`);
  else console.log(`       ${r.hex.substring(0,80)}...`);
});
