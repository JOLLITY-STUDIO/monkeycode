const fs = require('fs');
const files = process.argv.slice(2);
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  const lines = t.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (/浊音|半浊|0x94|0x95|\$94|\$95/.test(lines[i])) {
      console.log(f + ':' + (i + 1) + ': ' + lines[i].trim().slice(0, 180));
    }
  }
}
