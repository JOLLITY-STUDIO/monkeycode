import fs from 'fs';
const rom = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');
const h = 16;

// 截图显示值: 16,14,12,12,11,12  -> hex 0x10,0x0E,0x0C,0x0C,0x0B,0x0C
const seq1 = [0x10,0x0E,0x0C,0x0C,0x0B,0x0C];
const seq2 = [0x0C,0x0E,0x10,0x0B,0x0C,0x0C];
const maxGuts = [0xEC,0x02];

function search(arr, label) {
  console.log('=== Searching:', label, arr.map(b=>b.toString(16)).join(' '));
  let count = 0;
  for (let i = h; i < rom.length; i++) {
    let match = true;
    for (let j = 0; j < arr.length; j++) { if (rom[i+j] !== arr[j]) { match = false; break; } }
    if (match) {
      const bank = Math.floor((i-h) / 16384);
      const addr = 0x8000 + ((i-h) % 16384);
      const ctx = Array.from(rom.slice(Math.max(h,i-8), Math.min(rom.length,i+24)))
        .map(b=>b.toString(16).padStart(2,'0')).join(' ');
      console.log(`  Bank ${bank} CPU 0x${addr.toString(16)} | ctx: ${ctx}`);
      count++;
      if (count >= 8) { console.log('  ... (stopped)'); break; }
    }
  }
  console.log(`  Total: ${count} matches\n`);
}

search(seq1, 'display 16,14,12,12,11,12');
search(seq2, 'display 12,14,16,11,12,12');
search(maxGuts, 'maxGuts 748 (EC 02)');

// Also search bank 05 around statBlock05 for any pattern
const s5off = h + 5*16384 + (0xABDC-0x8000);
console.log('=== Bank 5 statBlock05 raw (first 176 bytes = 22 records) ===');
for (let i = 0; i < 176; i += 8) {
  const rec = Array.from(rom.slice(s5off+i, s5off+i+8));
  console.log(`  rec ${(i/8).toString().padStart(2)}:`, rec.map(b=>b.toString().padStart(2,'0')).join(' '), 'dec:', rec.join(' '));
}

// Look at Bank 03 statBlock03
const s3off = h + 3*16384 + (0x951B-0x8000);
console.log('\n=== Bank 3 statBlock03 raw (first 132 bytes = 22 records) ===');
for (let i = 0; i < 132; i += 6) {
  const rec = Array.from(rom.slice(s3off+i, s3off+i+6));
  console.log(`  rec ${(i/6).toString().padStart(2)}:`, rec.map(b=>b.toString().padStart(2,'0')).join(' '), 'dec:', rec.join(' '));
}

// Look at Tsubasa's classType and attrBlock
console.log('\n=== Tsubasa (0xF3) ptrIndex:', 0xF3>>2, '=', (0xF3>>2).toString());
const ptrStart = h + 0x0C*16384 + (0x8DC2-0x8000);
const idx = 0xF3 >> 2;
const lo = rom[ptrStart + idx*2], hi = rom[ptrStart + idx*2 + 1];
const addr = lo | (hi << 8);
console.log(`  Pointer: 0x${addr.toString(16)}`);
const ctOff = h + 0x0C*16384 + (0x86B8-0x8000);
console.log(`  ClassType: 0x${rom[ctOff+idx].toString(16)} (${rom[ctOff+idx]})`);

// Bank 09 skills/typeMarkers
const skOff = h + 9*16384 + (0x9620-0x8000);
const tmOff = h + 9*16384 + (0x9360-0x8000);
console.log('  Skills[09:9620]:', Array.from(rom.slice(skOff+idx*6, skOff+idx*6+6)).map(b=>b.toString(16)).join(' '));
console.log('  TypeMarkers[09:9360]:', Array.from(rom.slice(tmOff+idx*6, tmOff+idx*6+6)).map(b=>b.toString(16)).join(' '));
