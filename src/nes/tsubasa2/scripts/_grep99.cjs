const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'asm', 'bank00');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.s'));
for (const f of files) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
  lines.forEach((ln, i) => {
    if (/\b0099\b/.test(ln) || /#\$FE/.test(ln)) {
      console.log(f + ':' + (i + 1) + ': ' + ln.trim());
    }
  });
}
