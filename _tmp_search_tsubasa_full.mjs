import fs from 'fs';
const rom = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');
const BASE = 'src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan)-球员属性第一关大空翼以及技能';
const prg = fs.readFileSync(`${BASE}.prg.bin`);
const unused = fs.readFileSync(`${BASE}.unuseddata.prg.bin`);
const cdl = fs.readFileSync(`${BASE}.cdl`);

function search(buf, seq, label) {
  const out = [];
  for (let i = 0; i < buf.length - seq.length; i++) {
    let ok = true;
    for (let j = 0; j < seq.length; j++) if (buf[i + j] !== seq[j]) { ok = false; break; }
    if (ok) out.push(i);
  }
  console.log(label, 'seq=' + seq.map(b => b.toString(16).padStart(2,'0')).join(' '), 'hits=' + out.length);
  return out;
}

// PPU Name Table full sequence: つ(0x12), は(0x94), 浊点(0x1A), さ(0x0B)
const seqFull = [0x12, 0x94, 0x1A, 0x0B];
// If ROM uses base-only encoding: つ, は(ば), さ
const seqBase = [0x12, 0x94, 0x0B];
// If ば is a single code point: つ, 0x??, さ
const seqDakuten = [0x12, 0x1A, 0x0B]; // already searched, likely no

console.log('=== ROM ===');
const h1 = search(rom, seqFull, 'Full PPU [12,94,1A,0B]');
const h2 = search(rom, seqBase, 'Base-only [12,94,0B]');
const h3 = search(rom, [0x94, 0x1A], 'ば combo [94,1A]');

console.log('=== PRG dump ===');
search(prg, seqFull, 'PRG Full PPU');
search(prg, seqBase, 'PRG Base-only');
search(prg, [0x94, 0x1A], 'PRG ば combo');

console.log('=== unuseddata ===');
search(unused, seqFull, 'unused Full PPU');
search(unused, seqBase, 'unused Base-only');
search(unused, [0x94, 0x1A], 'unused ば combo');

// For hits, print context
for (const pos of h1.slice(0, 3)) {
  const ctx = rom.subarray(pos - 16, pos + 32);
  console.log('ROM context @0x' + pos.toString(16).padStart(5,'0') + ': ' + Array.from(ctx).map(b => b.toString(16).padStart(2,'0')).join(' '));
}
for (const pos of h2.slice(0, 3)) {
  const ctx = rom.subarray(pos - 16, pos + 32);
  console.log('ROM base-only context @0x' + pos.toString(16).padStart(5,'0') + ': ' + Array.from(ctx).map(b => b.toString(16).padStart(2,'0')).join(' '));
}
