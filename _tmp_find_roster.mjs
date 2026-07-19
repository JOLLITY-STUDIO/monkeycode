// Search for 11-byte sequences where most bytes are non-trivial (not 00-0F sequential)
// Looking for real player roster data in the ROM
import fs from 'fs';

const rom = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');
const prgSize = rom[4] * 16384;
const prg = rom.slice(16, 16 + prgSize);

console.log(`PRG size: ${prgSize} bytes (${prgSize/1024}KB)\n`);

// Scan for 11-byte sequences (roster candidates)
// Criteria: at least 8 of 11 bytes should be > 0x0F (not simple sequential indices)
let candidates = [];

for (let i = 0; i < prg.length - 11; i++) {
  let count = 0;
  let min = 0xFF, max = 0;
  for (let j = 0; j < 11; j++) {
    const b = prg[i + j];
    if (b > 0x0F) count++;
    if (b < min) min = b;
    if (b > max) max = b;
  }
  if (count >= 8) {
    const bank = Math.floor(i / 0x4000);
    const bankOff = i % 0x4000;
    const cpu = bankOff + 0x8000;
    const bytes = Array.from(prg.slice(i, i + 11)).map(b => b.toString(16).padStart(2, '0')).join(' ');
    candidates.push({
      romOff: i,
      bank,
      cpu: '$' + cpu.toString(16).padStart(4, '0'),
      bytes,
      distinct: max - min
    });
  }
}

// Sort by ROM offset and show
candidates.sort((a, b) => a.romOff - b.romOff);
console.log(`Found ${candidates.length} candidate 11-byte sequences (>=8 bytes > 0x0F):\n`);

// Group by bank
const byBank = {};
for (const c of candidates) {
  if (!byBank[c.bank]) byBank[c.bank] = [];
  byBank[c.bank].push(c);
}

for (const [bank, cands] of Object.entries(byBank)) {
  console.log(`=== Bank $${bank.toString(16).padStart(2, '0')} (${cands.length} candidates) ===`);
  for (const c of cands.slice(0, 30)) {
    console.log(`  ROM 0x${c.romOff.toString(16).padStart(6, '0')} CPU ${c.cpu.padEnd(6)} | ${c.bytes}`);
  }
  if (cands.length > 30) console.log(`  ... and ${cands.length - 30} more`);
  console.log('');
}

// Also search specifically for 00 00 00 00 00 ending pattern (many roster tables have padded endings)
console.log('\n=== Sequences with high-value bytes (>=0x80) followed by 00 gaps ===');
for (let i = 0; i < prg.length - 11; i++) {
  const b0 = prg[i];
  const b1 = prg[i + 1];
  if (b0 >= 0x80 || b0 === 0x00) continue; // skip very common bytes
  let highCount = 0;
  for (let j = 0; j < 11; j++) {
    if (prg[i + j] >= 0x40) highCount++;
  }
  if (highCount >= 6) {
    const bank = Math.floor(i / 0x4000);
    const bytes = Array.from(prg.slice(i, i + 16)).map(b => b.toString(16).padStart(2, '0')).join(' ');
    console.log(`  ROM 0x${i.toString(16).padStart(6, '0')} bank $${bank.toString(16).padStart(2, '0')} | ${bytes}`);
  }
}
