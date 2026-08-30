const fs = require('fs');
const p = 'src/core/ppu/index.ts';
const lines = fs.readFileSync(p, 'utf8').split('\n');
lines.forEach((l, i) => {
  if (/renderStartOverride|ntable1\s*=|this\.ntable1|setMirroring|skipPrerenderAdvance|ntable1\[/.test(l)) {
    console.log((i + 1) + ': ' + l.slice(0, 200));
  }
});
