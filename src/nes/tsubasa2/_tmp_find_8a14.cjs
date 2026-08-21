const fs = require('fs');
const lines = fs.readFileSync('asm/bank00/_full.s', 'latin1').split('\n');
for (let i = 0; i < lines.length; i++) {
  if (/8A14/.test(lines[i])) {
    for (let j = Math.max(0, i - 3); j < i + 40 && j < lines.length; j++) {
      console.log((j + 1) + ': ' + lines[j]);
    }
    break;
  }
}
