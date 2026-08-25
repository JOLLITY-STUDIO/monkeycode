const fs = require('fs');
const dir = 'src/asm/bank00';
for (const f of fs.readdirSync(dir)) {
  const p = dir + '/' + f;
  const lines = fs.readFileSync(p, 'utf8').split(/\r\n|\r|\n/);
  for (let i = 0; i < lines.length; i++) {
    if (/\$9085|\$908[0-9A-F]/.test(lines[i])) {
      console.log(p + ':' + (i + 1) + ': ' + lines[i].trim());
    }
  }
}
