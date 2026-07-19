import fs from 'fs';
const rom = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');

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

const h = search(rom, [0x94, 0x1A], 'ば combo [94,1A]');
for (const pos of h) {
  const ctx = rom.subarray(pos - 32, pos + 64);
  console.log('--- ROM context @0x' + pos.toString(16).padStart(5,'0') + ' (cpu mapped? see below) ---');
  for (let i = 0; i < ctx.length; i += 16) {
    const off = pos - 32 + i;
    const line = ctx.subarray(i, i + 16);
    const hex = Array.from(line).map(b => b.toString(16).padStart(2,'0')).join(' ');
    const ascii = Array.from(line).map(b => b >= 0x20 && b < 0x7f ? String.fromCharCode(b) : '.').join('');
    console.log(`  0x${off.toString(16).padStart(5,'0')}: ${hex} |${ascii}|`);
  }
}

// Also search for 0x94 and 0x1A individually to see distribution
console.log('\n--- single 0x94 hits in ROM first 100 ---');
const hits94 = [];
for (let i = 0; i < rom.length; i++) if (rom[i] === 0x94) hits94.push(i);
console.log('0x94 count:', hits94.length, 'first 20:', hits94.slice(0,20).map(x=>x.toString(16)));

console.log('--- single 0x1A hits in ROM first 100 ---');
const hits1A = [];
for (let i = 0; i < rom.length; i++) if (rom[i] === 0x1A) hits1A.push(i);
console.log('0x1A count:', hits1A.length, 'first 20:', hits1A.slice(0,20).map(x=>x.toString(16)));
