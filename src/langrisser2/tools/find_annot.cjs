const fs = require('fs');
const s = fs.readFileSync('20260713/asm/m68k/rom.asm', 'utf8');
const lines = s.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('★') && (lines[i].includes('99B2') || lines[i].includes('99FA') || lines[i].includes('9A0E'))) {
    console.log('L' + i + ': ' + lines[i].trim());
    for (let j = i; j < Math.min(i + 8, lines.length); j++) {
      console.log('  ' + j + ': ' + lines[j].trim());
    }
    console.log('---');
  }
}
