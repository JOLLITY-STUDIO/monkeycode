const fs = require('fs');
const path = require('path');
const ROM = 'docs/roms/Captain Tsubasa II - Super Striker (Japan).nes';
const rom = fs.readFileSync(ROM);
const chrOff = 16 + 16 * 16384;  // skip header + 16 PRG banks
const baseBank = i => rom.slice(chrOff + i * 8192, chrOff + (i + 1) * 8192);
let bad = 0, total = 0;
for (let b = 0; b < 16; b++) {
  const tsFile = path.join('src/game/chr', `chr-bank-${String(b).padStart(2, '0')}.ts`);
  const ts = fs.readFileSync(tsFile, 'utf8');
  const m = ts.match(/export default \[([^\]]+)\]/s);
  if (!m) { console.log(`bad: ${tsFile} (no match)`); continue; }
  const arr = m[1].split(',').map(s => {
    s = s.trim();
    const h = s.match(/^0x([0-9a-fA-F]+)$/);
    return h ? parseInt(h[1], 16) : 0;
  });
  const romBank = baseBank(b);
  for (let i = 0; i < 8192; i++) {
    total++;
    if (arr[i] !== romBank[i]) bad++;
  }
  if (bad > 0) console.log(`chr-bank-${b}: ${bad} bytes differ from ROM bank ${b}`);
}
console.log(`Total: ${bad}/${total} bytes differ across 16 CHR banks`);
