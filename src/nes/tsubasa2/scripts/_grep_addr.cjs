const fs = require('fs');
const files = process.argv.slice(2);
const addrRe = new RegExp('; \\$8A(0|1|2|3|4|5|6|7|8|9|A|B|C|D|E|F)');
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  const lines = t.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (addrRe.test(lines[i])) console.log(f + ':' + (i + 1) + ': ' + lines[i].trim().slice(0, 170));
  }
}
