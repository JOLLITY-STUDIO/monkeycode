// Verify bank31 $FBCC palette table within prg-bank-31.ts array
const fs = require('fs');
const txt = fs.readFileSync('src/game/data/prg-bank-31.ts', 'utf8');
const m = txt.match(/=\s*\[([\s\S]*?)\];/);
if (!m) { console.log('no array found'); process.exit(1); }
const bytes = m[1].split(/,\s*/).map(s => parseInt(s.trim(), 16));
console.log('array length =', bytes.length, '0x' + bytes.length.toString(16));
// bank31 fixed at CPU $E000-$FFFF → $FBCC = array index $FBCC - $E000 = 0x1BCC
const base = 0x1bcc;
const hex = n => '0x' + n.toString(16).toUpperCase().padStart(4, '0');
for (let id = 0; id <= 0x18; id++) {
  const off = (id << 3) & 0xff;
  const row = [];
  for (let i = 0; i < 16; i++) row.push(bytes[base + off + i]);
  console.log(`id=${hex(id)} off=${hex(off)} cpu=${hex(0xfbcc + off)} row=${row.map(b => b.toString(16).padStart(2, '0')).join(' ')}`);
}
