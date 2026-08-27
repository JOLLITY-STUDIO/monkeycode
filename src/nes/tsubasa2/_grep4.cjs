const fs = require('fs');
const f = 'src/core/ppu/index.ts';
const lines = fs.readFileSync(f, 'utf8').split('\n');
const pats = ['renderStartOverride', 'cntV', 'cntH', 'ntable1', 'curNt', 'case 20', 'case20', 'renderBgScanline', 'applyScroll', 'setScroll'];
for (let i = 0; i < lines.length; i++) {
  for (const p of pats) {
    if (lines[i].includes(p)) {
      console.log(i + 1 + ': ' + lines[i].trimEnd());
      break;
    }
  }
}
