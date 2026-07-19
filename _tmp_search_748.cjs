const fs = require('fs');
const rom = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');
const h = rom.slice(0, 16);
const prgCount = h[4];
const prgSize = prgCount * 16384;

// Search for byte pairs that could represent 百位/十位 for stamina 748
// In bytecode: FF 07 04 (two-digit encoding)
console.log('=== FF 07 04 in PRG-ROM ===');
for (let off = 16; off < 16 + prgSize - 2; off++) {
  if (rom[off] === 0xFF && rom[off+1] === 0x07 && rom[off+2] === 0x04) {
    let prg = off - 16;
    let bank = Math.floor(prg / 0x2000);
    console.log(`PRG bank ${bank}: CPU $${(0x8000+prg%0x2000).toString(16)}, ROM 0x${off.toString(16)}`);
    // Show context
    let ctx = [];
    for (let i = -4; i <= 12; i++) {
      let b = rom[off + i];
      ctx.push(b.toString(16).padStart(2, '0').toUpperCase());
    }
    console.log(`  context: ${ctx.join(' ')}`);
  }
}

// Also search in all CHR (might be false positive in graphics)
console.log('\n=== FF 07 XX (FF followed by 07, any third byte) ===');
let count = 0;
for (let off = 16; off < 16 + prgSize - 2; off++) {
  if (rom[off] === 0xFF && rom[off+1] === 0x07 && count < 30) {
    let prg = off - 16;
    let bank = Math.floor(prg / 0x2000);
    let ctx = [];
    for (let i = -2; i <= 14; i++) {
      ctx.push(rom[off+i].toString(16).padStart(2, '0').toUpperCase());
    }
    console.log(`bank ${bank} 0x${(0x8000+prg%0x2000).toString(16)}: ${ctx.join(' ')}`);
    count++;
  }
}

// Search for single-byte digit encoding: positive values 01-7F that represent digits
// Look for patterns where a single byte = 07 (hundreds mode for 748) followed by 04
console.log('\n=== Byte 07 followed by 04 in PRG (possible single-digit encoding) ===');
count = 0;
for (let off = 16; off < 16 + prgSize - 1; off++) {
  if (rom[off] === 0x07 && rom[off+1] === 0x04 && count < 20) {
    let prg = off - 16;
    let bank = Math.floor(prg / 0x2000);
    let ctx = [];
    for (let i = -4; i <= 16; i++) {
      ctx.push(rom[off+i].toString(16).padStart(2, '0').toUpperCase());
    }
    console.log(`bank ${bank} 0x${(0x8000+prg%0x2000).toString(16)}: ${ctx.join(' ')}`);
    count++;
  }
}
