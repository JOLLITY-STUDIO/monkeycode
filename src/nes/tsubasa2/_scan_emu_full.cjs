const fs = require('fs');
const c = fs.readFileSync('scripts/_emu_full.ts', 'utf8');
const lines = c.split('\n');
console.log('total lines:', lines.length);
lines.forEach((l, i) => {
  if (/scroll|regVT|regHT|regV|regH|cntV|cntVT|cntH|cntHT|require\(|from '|from "|import|state\.json|scrollEnd|ppu\./i.test(l)) {
    console.log((i + 1) + ': ' + l.trim().slice(0, 160));
  }
});
