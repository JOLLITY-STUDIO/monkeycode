import fs from 'fs';

const rom = fs.readFileSync('src/langrisser2/20260713/Langrisser II (Japan).md');

// VDP register init pattern: values followed by register numbers
// Typically: move.w  #$xx,($C00004).l in sequence
// But often stored as data table: value, reg_index, value, reg_index, ...

// Look for common VDP reg 0 / reg 1 values
const patterns = [
  // Common MD VDP init sequences (reg_value, reg_index)
  [0x04, 0x00, 0x74, 0x01], // reg0=0x04, reg1=0x74
  [0x04, 0x00, 0x54, 0x01], // H-int off/on variants
  [0x04, 0x00, 0x64, 0x01],
  [0x04, 0x00, 0x7c, 0x01],
  [0x14, 0x00, 0x74, 0x01],
];

for (const pat of patterns) {
  for (let a = 0; a < rom.length - 24; a += 2) {
    let match = true;
    for (let i = 0; i < pat.length; i++) {
      if (rom[a + i] !== pat[i]) { match = false; break; }
    }
    if (match) {
      console.log('Pattern found at 0x' + a.toString(16).padStart(6, '0'));
      for (let i = 0; i < 24; i += 2) {
        console.log('  reg ' + rom[a + i + 1] + ' = 0x' + rom[a + i].toString(16).padStart(2, '0'));
      }
      console.log('---');
    }
  }
}

// Also search for VDP control port writes pattern
// move.w #$xx, $C00004 sequence often has 0x40 0x00 before values
for (let a = 0; a < rom.length - 50; a++) {
  if (rom[a] === 0x40 && rom[a + 1] === 0x00 && rom[a + 2] === 0x10 && rom[a + 3] === 0x01) {
    console.log('Possible VDP write pattern at 0x' + a.toString(16));
  }
}
