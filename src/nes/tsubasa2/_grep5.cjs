const fs = require('fs');
const lines = fs.readFileSync('src/core/ppu/index.ts', 'utf8').split('\n');
const pats = ['bgbuffer', 'this.buffer', 'renderBgScanline', 'renderSprites', 'composite', 'copyBuffer'];
for (let i = 0; i < lines.length; i++) {
  for (const p of pats) {
    if (lines[i].includes(p)) {
      console.log(i + 1 + ': ' + lines[i].trimEnd());
      break;
    }
  }
}
