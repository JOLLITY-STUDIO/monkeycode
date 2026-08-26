const fs = require('fs');
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/core/ppu/index.ts';
const s = fs.readFileSync(p, 'utf8');
const lines = s.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (/renderBgScanline\s*\(/.test(lines[i])) {
    console.log(`renderBgScanline at line ${i + 1}`);
    break;
  }
}
for (let i = 0; i < lines.length; i++) {
  if (/this\.nameTable\s*=/.test(lines[i])) {
    console.log(`nameTable init at line ${i + 1}`);
  }
}
