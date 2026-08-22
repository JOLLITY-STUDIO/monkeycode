const fs = require('fs');
const path = require('path');
function grepFile(file, patterns) {
  const txt = fs.readFileSync(file, 'utf8');
  const lines = txt.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const p of patterns) {
      if (line.includes(p)) {
        console.log(`${path.basename(file)}:${i + 1}: ${line}`);
        break;
      }
    }
  }
}
const dir = 'src/game/prg/code/system';
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.ts'))) {
  grepFile(path.join(dir, f), ['subC50C', 'subC539', 'subC524', 'subC52D', 'subC54E', 'subC575', 'subC530', 'subC533']);
}
