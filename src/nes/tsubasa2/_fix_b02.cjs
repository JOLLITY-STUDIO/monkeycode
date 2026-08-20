const fs = require('fs');
const path = require('path');
const f = path.join(__dirname, 'src/game/service/bank02_scene.service.ts');

let s = fs.readFileSync(f, 'utf8');
const lines = s.split(/\r?\n/);

// Remove exact import lines for SPRITE_UPLOAD / SPRITE_UPLOAD2
const filtered = lines.filter((l) => {
  const t = l.trim();
  return t !== 'SPRITE_UPLOAD,' && t !== 'SPRITE_UPLOAD2,';
});

const out = filtered.join('\n');
fs.writeFileSync(f, out, 'utf8');

const report = [
  'SPRITE_UPLOAD lines removed: ' + (lines.length - filtered.length),
  'remaining SPRITE_UPLOAD: ' + /SPRITE_UPLOAD/.test(out),
  'remaining PRG_BANK: ' + /PRG_BANK/.test(out),
  'import path prg: ' + out.includes("from '../data/prg/bank02-tables'"),
  'lines before: ' + lines.length + ', after: ' + filtered.length,
].join('\n');

fs.writeFileSync(path.join(__dirname, '_b02_fix_report.txt'), report, 'utf8');
console.log('FIX DONE');
