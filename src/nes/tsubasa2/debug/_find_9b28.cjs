const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prg = rom.slice(16);
const want = [0x48, 0x2c, 0x29, 0x06]; // PHA BIT $0629
for (let off = 0; off < prg.length - 4; off++) {
  if (prg[off] === want[0] && prg[off + 1] === want[1] && prg[off + 2] === want[2] && prg[off + 3] === want[3]) {
    console.log('candidate $9B28 at PRG offset 0x' + off.toString(16) + ' (bank idx ' + Math.floor(off / 0x2000) + ', half-offset 0x' + (off % 0x2000).toString(16) + ')');
    const bytes = Array.from(prg.slice(off, off + 0x30));
    console.log(JSON.stringify(bytes));
  }
}
console.log('PRG size: 0x' + prg.length.toString(16));
