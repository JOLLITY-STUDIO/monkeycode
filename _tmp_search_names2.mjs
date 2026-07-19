import fs from 'fs';

// Search in main ROM
const rom = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');
function search(buf, seq, label) {
  const out = [];
  for (let i = 0; i < buf.length - seq.length; i++) {
    let ok = true;
    for (let j = 0; j < seq.length; j++) if (buf[i + j] !== seq[j]) { ok = false; break; }
    if (ok) out.push(i);
  }
  console.log(label, out.length ? out.slice(0, 10).map(x => hex(x)).join(', ') : 'NONE');
  return out;
}
const hex = n => n.toString(16).padStart(4, '0');

// "つばさ" = [0x12, 0x1A, 0x0B]
search(rom, [0x12, 0x1A, 0x0B], 'つばさ [12,1A,0B]');

// Also search in the PRG dump from CDL
if (fs.existsSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan)-球员属性第一关大空翼以及技能.prg.bin')) {
  const prg = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan)-球员属性第一关大空翼以及技能.prg.bin');
  search(prg, [0x12, 0x1A, 0x0B], 'つばさ IN PRG dump [12,1A,0B]');
}
if (fs.existsSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan)-球员属性第一关大空翼以及技能.unuseddata.prg.bin')) {
  const unused = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan)-球员属性第一关大空翼以及技能.unuseddata.prg.bin');
  search(unused, [0x12, 0x1A, 0x0B], 'つばさ IN unuseddata [12,1A,0B]');
}

// Also search for "ジウ" if encoded similarly; check what the encoding might be
// Try common patterns: ジ=0x12?, but the user only gave つばさ so far.
// Let's search for the three bytes in the ROM near other known data
console.log('--- Context around つばさ hits (if any) ---');
const hits = search(rom, [0x12, 0x1A, 0x0B], 'dummy');
for (const pos of hits.slice(0, 5)) {
  const ctx = rom.subarray(pos - 16, pos + 20);
  console.log('  @0x' + hex(pos) + ': ' + Array.from(ctx).map(b => b.toString(16).padStart(2,'0')).join(' '));
}
