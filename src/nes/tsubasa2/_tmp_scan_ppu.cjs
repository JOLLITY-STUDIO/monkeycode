const fs = require('fs');
const p = 'src/core/ppu/index.ts';
const lines = fs.readFileSync(p, 'utf8').split('\n');
const keys = ['renderBgScanline', 'imgPalette', 'updatePalettes', 'palRead', 'writeMem(', 'startVBlank', 'endScanline', 'startFrame', 'vramMem', 'ptTile', 'scanline', 'readMem('];
for (let i = 0; i < lines.length; i++) {
  for (const k of keys) {
    if (lines[i].includes(k)) {
      console.log(String(i + 1).padStart(5), k.padEnd(16), lines[i].trim().slice(0, 110));
      break;
    }
  }
}
