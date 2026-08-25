const fs = require('fs');
const lines = fs.readFileSync('src/asm/bank02/_full.s', 'utf8').split(/\r\n|\r|\n/);
for (let i = 0; i < lines.length; i++) {
  if (/\$A2[0-9A-F][0-9A-F]/.test(lines[i])) {
    console.log((i + 1) + ': ' + lines[i].trim());
  }
}
