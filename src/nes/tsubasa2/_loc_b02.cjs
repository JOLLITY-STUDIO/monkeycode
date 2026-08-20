const fs = require('fs');
const path = require('path');
const f = path.join(__dirname, 'src/game/service/bank02_scene.service.ts');
const s = fs.readFileSync(f, 'utf8');
let out = '';
for (const tok of ['PRG_BANK', 'prg-bank', 'rom-data', 'SPRITE_UPLOAD', 'SCROLL_DX', 'SCROLL_DY']) {
  out += '=== ' + tok + ' ===\n';
  let idx = 0;
  while ((idx = s.indexOf(tok, idx)) !== -1) {
    const lineNo = s.slice(0, idx).split('\n').length;
    const line = s.split('\n')[lineNo - 1];
    out += '  line ' + lineNo + ': ' + line.trim() + '\n';
    idx += tok.length;
  }
  if (!s.includes(tok)) out += '  (none)\n';
}
out += '\nTotal lines: ' + s.split('\n').length + '\n';
fs.writeFileSync(path.join(__dirname, '_loc_b02.txt'), out, 'utf8');
