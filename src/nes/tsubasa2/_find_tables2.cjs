const fs = require('fs');
const s = fs.readFileSync('asm/bank00/_full.s', 'utf8');
const lines = s.split('\n');
// Print lines around the table addresses by searching for the offset markers
const markers = ['$8A14', '$8AE6', '$8AEC', '$8AEE'];
for (let i = 0; i < lines.length; i++) {
  for (const m of markers) {
    if (lines[i].includes('; ' + m) || lines[i].includes('$8A14,Y') || lines[i].includes('$8AE6,X') || lines[i].includes('$8AEC,Y') || lines[i].includes('$8AEE,Y')) {
      console.log('L' + (i + 1), lines[i]);
    }
  }
}
console.log('=== tail of full.s (last 60 lines) ===');
for (let i = Math.max(0, lines.length - 60); i < lines.length; i++) console.log('L' + (i + 1), lines[i]);
