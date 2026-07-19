const fs = require('fs');

// Check both ROM files for the match setup data pattern
const roms = [
  '_pynasm_tool/nesrc/tsubasa2/tsubasa2.nes',
  'src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes',
];

for (const romPath of roms) {
  if (!fs.existsSync(romPath)) { console.log(romPath + ' NOT FOUND'); continue; }
  const rom = fs.readFileSync(romPath);
  console.log('=== ' + romPath + ' (' + rom.length + ' bytes) ===');
  
  // Search for F3 00 E1 DC 40 52 C3 4B 3F 45 45 pattern (team A from out.txt)
  const pattern = [0xF3, 0x00, 0xE1, 0xDC, 0x40, 0x52, 0xC3, 0x4B, 0x3F, 0x45, 0x45];
  for (let i = 16; i < rom.length - 11; i++) {
    let match = true;
    for (let j = 0; j < 11; j++) {
      if (rom[i + j] !== pattern[j]) { match = false; break; }
    }
    if (match) {
      console.log('  Found Team A pattern at ROM offset 0x' + i.toString(16).toUpperCase());
      // Show context: 16 bytes before and 32 bytes after
      const ctxStart = Math.max(16, i - 16);
      const ctxEnd = Math.min(rom.length, i + 44);
      const ctx = rom.slice(ctxStart, ctxEnd);
      console.log('  Context (' + (i - ctxStart) + ' bytes before):');
      let hex = '';
      for (let k = 0; k < ctx.length; k++) {
        hex += ctx[k].toString(16).padStart(2,'0').toUpperCase();
        hex += (k === i - ctxStart + 10) ? ' | ' : ' ';
        if ((k + 1) % 16 === 0) { console.log('    ' + hex); hex = ''; }
      }
      if (hex) console.log('    ' + hex);
    }
  }
  
  // Also search for 02 03 04 05 06 07 08 09 0A 01 0B (AA47 Group 0)
  const pat2 = [0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x01, 0x0B];
  for (let i = 16; i < rom.length - 11; i++) {
    let match = true;
    for (let j = 0; j < 11; j++) {
      if (rom[i + j] !== pat2[j]) { match = false; break; }
    }
    if (match) {
      console.log('  Found Group0 pattern at ROM offset 0x' + i.toString(16).toUpperCase());
    }
  }
  
  console.log('');
}
