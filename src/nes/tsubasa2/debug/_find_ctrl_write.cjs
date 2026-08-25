const fs = require('fs'), path = require('path');
function walk(d) {
  let out = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) out = out.concat(walk(p));
    else if (/\.ts$/.test(e.name)) out.push(p);
  }
  return out;
}
for (const f of walk('src/game/prg')) {
  const c = fs.readFileSync(f, 'utf8');
  const lines = c.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (/ppuState\.ctrl\s*=/.test(lines[i]) || /writeByte\(0x0020/.test(lines[i])) {
      console.log(f + ':' + (i + 1), lines[i].trim());
    }
  }
}
