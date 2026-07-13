const fs = require('fs');
const path = require('path');

const rom = fs.readFileSync(path.join(__dirname, '..', '20260713', 'Langrisser II (Japan).md'));

function findSeq(buf, pat, step = 1) {
  const positions = [];
  for (let i = 0; i <= buf.length - pat.length; i += step) {
    let ok = true;
    for (let j = 0; j < pat.length; j++) {
      if (pat[j] === null) continue;
      if (buf[i + j] !== pat[j]) { ok = false; break; }
    }
    if (ok) positions.push(i);
  }
  return positions;
}

console.log('=== VDP control port $C00004 references ===');
const p1 = findSeq(rom, [0x00, 0xC0, 0x00, 0x04], 2);
console.log('00 C0 00 04:', p1.length, p1.slice(0, 10).map(x => x.toString(16)));
const p2 = findSeq(rom, [0xC0, 0x00, 0x00, 0x04], 2);
console.log('C0 00 00 04:', p2.length, p2.slice(0, 10).map(x => x.toString(16)));
const p3 = findSeq(rom, [0x00, 0x00, 0x00, 0x04], 2);
console.log('00 00 00 04 (VDP data):', p3.length, p3.slice(0, 10).map(x => x.toString(16)));

console.log('\n=== VDP DMA register write patterns (0x93-0x97) ===');
for (let r = 0x13; r <= 0x17; r++) {
  const code = 0x80 | r;
  // Search for byte pattern 0x93XX, 0x94XX, etc. as VDP register writes
  const pat = [code, null];
  const hits = findSeq(rom, pat, 2);
  console.log('Reg 0x' + r.toString(16) + ' (0x' + code.toString(16) + '):', hits.length, hits.slice(0, 15).map(x => x.toString(16)));
}

console.log('\n=== VDP command words (0x4xxx = VRAM, 0xCxxx = CRAM, 0x0xxx = DMA) ===');
for (const cmd of [0x40, 0xC0, 0x00]) {
  const pat = [cmd, null, null, null];
  const hits = findSeq(rom, pat, 2);
  console.log('Cmd prefix 0x' + cmd.toString(16) + ':', hits.length, hits.slice(0, 10).map(x => x.toString(16)));
}

console.log('\n=== DMA source address 0x3F8000 / 0x3FC6E6 byte patterns ===');
const src1 = findSeq(rom, [0x00, 0x3F, 0x80, 0x00], 2);
console.log('00 3F 80 00:', src1.length, src1.map(x => x.toString(16)));
const src2 = findSeq(rom, [0x00, 0x3F, 0xC6, 0xE6], 2);
console.log('00 3F C6 E6:', src2.length, src2.map(x => x.toString(16)));
const src3 = findSeq(rom, [0x00, 0x1F, 0x80, 0x00], 2);
console.log('00 1F 80 00:', src3.length, src3.map(x => x.toString(16)));
const src4 = findSeq(rom, [0x00, 0x1F, 0xC6, 0xE6], 2);
console.log('00 1F C6 E6:', src4.length, src4.map(x => x.toString(16)));
