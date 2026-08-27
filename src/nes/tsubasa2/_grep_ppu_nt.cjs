// grep in core ppu for nametable / mirroring
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'core', 'ppu');
for (const f of fs.readdirSync(dir)) {
  if (!/\.ts$/.test(f)) continue;
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  const lines = c.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (/setMirroring|nameTable\s*=|ntable1|ntable[23]?=|nameTable\[|curNt\s*=|writeNameTable/i.test(lines[i])) {
      console.log(`${f}:${i + 1}: ${lines[i].trim().slice(0, 140)}`);
    }
  }
}
