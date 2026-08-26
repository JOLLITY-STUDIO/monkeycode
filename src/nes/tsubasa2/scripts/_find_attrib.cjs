const fs = require('fs');
const s = fs.readFileSync('src/core/ppu/index.ts', 'utf8');
const lines = s.split('\n');
lines.forEach((l, i) => {
  if (l.includes('attrib')) {
    console.log(i + 1, l.trim());
  }
});
