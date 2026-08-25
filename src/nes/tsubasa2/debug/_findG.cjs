const fs = require('fs');
const p = 'src/core/nes.ts';
const lines = fs.readFileSync(p, 'utf8').split(/\r\n|\r|\n/);
for (let i = 0; i < lines.length; i++) {
  const t = lines[i];
  if (/cpu|mem|loadROM|frame\(|reset/.test(t) && (i < 60 || /^\s*(export|this\.|readonly|public|private)/.test(t))) {
    console.log((i + 1) + ': ' + t.trim());
  }
}
