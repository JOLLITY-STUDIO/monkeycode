const fs = require('fs');
const buf = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');

const h = buf.slice(0, 16);
console.log('PRG-ROM 16KB banks:', h[4]);

// MMC3: 8KB bank 6 mapped to $A000-$BFFF via reg7=$06 (from $9B0B)
// ROM offset: 16 + 6*0x2000
const bank6Off = 16 + 6 * 0x2000;
console.log('Bank 6 ROM base: 0x' + bank6Off.toString(16));

// $9AB8: 百位 pattern base = $B000 - $A000 = $1000 within bank 6
// $9ADA: 十位 pattern base = $B300 - $A000 = $1300 within bank 6
const hundredsBase = bank6Off + 0x1000;
const tensBase     = bank6Off + 0x1300;

function hex(b) { return [...b].map(x => x.toString(16).padStart(2,'0').toUpperCase()).join(' '); }
function bin8(n) { return n.toString(2).padStart(8,'0'); }

console.log('\n=== 百位 patterns (bank6 + $1000) ===');
for (let d = 0; d < 10; d++) {
  let off = hundredsBase + d * 16;
  let data = buf.slice(off, off + 16);
  let bytes = [...data];
  console.log(`Digit ${d}: ${hex(data)}`);
  // Show binary for visual
  for (let row = 0; row < 16; row++) {
    console.log(`  ${bin8(bytes[15-row]).replace(/0/g,'.').replace(/1/g,'#')}`);
  }
}

console.log('\n=== 十位 patterns (bank6 + $1300) ===');
for (let d = 0; d < 10; d++) {
  let off = tensBase + d * 16;
  let data = buf.slice(off, off + 16);
  let bytes = [...data];
  console.log(`Digit ${d}: ${hex(data)}`);
}

// Now dump tile $3A from CHR
const chrHeader = h[5];
console.log('\n=== CHR tile $3A (from CHR ROM) ===');
// MMC3 divides CHR into 16 x 8KB banks
// We need to check which bank contains tile $3A
// tile $3A = tile index 0x3A = 58 decimal
// Each 8KB bank = 256 tiles, so tile $3A is in bank 0 (tiles $00-$FF)
// But at runtime, it depends on MMC3 register mapping
// Let's just dump all banks where tile $3A might be

const chrStart = 16 + h[4] * 16384;
for (let bk = 0; bk < 16 && bk < h[5]; bk++) {
  let chrOff = chrStart + bk * 8192;
  // tile $3A = 16 bytes at offset $3A * 16 = 0x3A0
  let tileOff = chrOff + 0x3A0;
  let tile = buf.slice(tileOff, tileOff + 16);
  let tbytes = [...tile];
  // Check if this tile could be digit 7
  let hasData = tbytes.some(b => b !== 0);
  if (hasData) {
    console.log(`\nCHR bank ${bk}: tile $3A offsets 0x${tileOff.toString(16)}`);
    console.log('  Bytes:', hex(tile));
    for (let i = 0; i < 8; i++) {
      let lo = tbytes[i], hi = tbytes[i + 8];
      let line = '';
      for (let b = 0; b < 8; b++) {
        let px = ((hi >> (7-b)) & 1) * 2 + ((lo >> (7-b)) & 1);
        line += [' ','.','+','#'][px];
      }
      console.log(`  ${line}`);
    }
  }
}

// Also dump the same tile for all CHR banks 
// that might be mapped to PPU table 1 ($1000-$1FFF)
console.log('\n=== All tile $3A in CHR banks (bank 0..15) ===');
for (let bk = 0; bk < 16; bk++) {
  let chrOff = chrStart + bk * 8192;
  let tile = [...buf.slice(chrOff + 0x3A0, chrOff + 0x3B0)];
  console.log(`Bank ${bk.toString().padStart(2)}: ${hex(tile)}`);
}
