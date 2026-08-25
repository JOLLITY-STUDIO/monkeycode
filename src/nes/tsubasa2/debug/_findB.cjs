const fs = require('fs');
const lines = fs.readFileSync('src/asm/bank02/code_main.s', 'utf8').split(/\r\n|\r|\n/);
for (let i = 0; i < lines.length; i++) {
  if (/\$A20[0-9A-F]|\$A21/.test(lines[i])) {
    console.log((i + 1) + ': ' + lines[i].trim());
  }
}
