const fs = require('fs');
const s = fs.readFileSync('scripts/_verify_300frame.ts', 'utf8');
const lines = s.split(/\r?\n/);
lines.forEach((l, i) => {
  if (/function dumpOam|function writeVerifyTriple|function dumpPalette|function dumpNt|oam\.json|spr=|spr >|bg=|bg >|composite/.test(l)) {
    console.log((i + 1) + ':' + l);
  }
});
