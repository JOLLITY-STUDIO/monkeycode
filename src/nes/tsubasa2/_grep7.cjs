const fs = require('fs');
const lines = fs.readFileSync('src/core/ppu/index.ts', 'utf8').split('\n');
const pats = ['writePalette', 'imgPalette[', 'sprPalette[', 'palette[', '0x3f00', 'writeMem('];
for (let i = 0; i < lines.length; i++) {
  if (pats.some(p => lines[i].includes(p))) {
    console.log(i + 1 + ': ' + lines[i].trimEnd());
  }
}
