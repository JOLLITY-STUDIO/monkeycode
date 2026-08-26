const fs = require('fs');
const s = fs.readFileSync('src/core/ppu/index.ts', 'utf8');
const ls = s.split('\n');
let inWrite = false;
let brace = 0;
for (let i = 0; i < ls.length; i++) {
  const l = ls[i];
  if (/writeMem\s*\(/.test(l)) {
    inWrite = true;
    brace = 0;
  }
  if (inWrite) {
    console.log((i + 1) + ': ' + l);
    for (const ch of l) {
      if (ch === '{') brace++;
      if (ch === '}') brace--;
    }
    if (brace === 0 && l.trim().startsWith('}')) {
      // continue one more line maybe
    }
    if (brace === 0 && /writeMem/.test(ls[i - 1] || '')) {
      // single line
    }
    if (brace === 0 && l.trim() === '}' && i > 0 && /[{}]/.test(ls.slice(Math.max(0, i - 5), i).join(''))) {
      inWrite = false;
    }
  }
}
