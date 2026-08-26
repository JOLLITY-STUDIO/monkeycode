const fs = require('fs');
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/core/ppu/index.ts';
const s = fs.readFileSync(p, 'utf8');
const lines = s.split('\n');
const funcs = ['setMirroring', 'renderBgScanline', 'writeVRAM', 'startFrame', 'endFrame'];
for (const fn of funcs) {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(fn) && (lines[i].includes('function') || lines[i].includes('=') || lines[i].includes('('))) {
      console.log(`\n=== ${fn} @ line ${i + 1} ===`);
      for (let j = i; j < Math.min(lines.length, i + 60); j++) {
        console.log(`${j + 1}|${lines[j]}`);
        if (lines[j].trim() === '}' && (j > i + 3)) break;
      }
      break;
    }
  }
}
