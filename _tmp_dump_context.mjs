import fs from 'fs';
const rom = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');
const h = 16;

// Tsubasa ptrIndex=60 (0x3C), ptr addr=0x9494 in Bank 0C
const attrOff = h + 0x0C*16384 + (0x9494-0x8000);
console.log('=== Tsubasa attr block at Bank 0C 0x9494 ===');
const ctx = Array.from(rom.slice(attrOff-4, attrOff+64));
console.log('Hex:', ctx.map(b=>b.toString(16).padStart(2,'0')).join(' '));
console.log('Dec:', ctx.join(' '));

// All attr blocks for ptrIndex 56-64
console.log('\n=== All attr blocks for ptrIndex 56-64 ===');
for (let idx = 56; idx <= 64; idx++) {
  const ptrOff = h + 0x0C*16384 + (0x8DC2-0x8000);
  const lo = rom[ptrOff + idx*2], hi = rom[ptrOff + idx*2 + 1];
  const addr = lo | (hi<<8);
  if (addr < 0x8000 || addr >= 0xC000) { console.log(`  idx ${idx}: invalid addr 0x${addr.toString(16)}`); continue; }
  const fileOff = h + 0x0C*16384 + (addr-0x8000);
  const hdr = Array.from(rom.slice(fileOff, fileOff+3));
  let len = 0;
  while (len < 32 && fileOff+3+len < rom.length && rom[fileOff+3+len] !== 0) len++;
  const body = Array.from(rom.slice(fileOff+3, fileOff+3+len));
  console.log(`  idx ${idx} addr=0x${addr.toString(16)} hdr=${hdr.map(b=>b.toString(16).padStart(2,'0')).join(' ')} body(${len})=${body.map(b=>b.toString(16).padStart(2,'0')).join(' ')}`);
}

// statBlock03 by ptrIndex
console.log('\n=== statBlock03 by ptrIndex 56-64 ===');
const s3off = h + 3*16384 + (0x951B-0x8000);
for (let idx = 56; idx <= 64; idx++) {
  if (s3off + idx*6 + 5 >= rom.length) break;
  const rec = Array.from(rom.slice(s3off+idx*6, s3off+idx*6+6));
  console.log(`  ptrIndex ${idx}: ${rec.map(b=>b.toString(16).padStart(2,'0')).join(' ')} dec: ${rec.join(' ')}`);
}

// statBlock05 by ptrIndex
console.log('\n=== statBlock05 by ptrIndex 56-64 ===');
const s5off = h + 5*16384 + (0xABDC-0x8000);
for (let idx = 56; idx <= 64; idx++) {
  if (s5off + idx*8 + 7 >= rom.length) break;
  const rec = Array.from(rom.slice(s5off+idx*8, s5off+idx*8+8));
  console.log(`  ptrIndex ${idx}: ${rec.map(b=>b.toString(16).padStart(2,'0')).join(' ')} dec: ${rec.join(' ')}`);
}

// classType
console.log('\n=== classType ptrIndex 56-64 ===');
const ctOff = h + 0x0C*16384 + (0x86B8-0x8000);
for (let idx = 56; idx <= 64; idx++) {
  console.log(`  ptrIndex ${idx}: 0x${rom[ctOff+idx].toString(16)} (${rom[ctOff+idx]})`);
}
