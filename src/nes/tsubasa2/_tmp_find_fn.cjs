const fs = require('fs');
const s = fs.readFileSync('scripts/_emu_full.ts', 'utf8');
const lines = s.split('\n');
let inFn = false;
let brace = 0;
for (let i = 0; i < lines.length; i++) {
  if (/function renderAllNameTablesNoBg/.test(lines[i])) { inFn = true; }
  if (inFn) {
    console.log((i + 1) + ': ' + lines[i]);
    for (const ch of lines[i]) {
      if (ch === '{') brace++;
      if (ch === '}') brace--;
    }
    if (brace === 0 && i > 0 && !/function renderAllNameTablesNoBg/.test(lines[i])) break;
  }
}
