const fs = require('fs');
const p = 'src/core/ppu/index.ts';
const lines = fs.readFileSync(p, 'utf8').split('\n');
lines.forEach((l, i) => {
  if (/cntFV|cntVT|cntV|cntH|renderStartOverride|startFrame|scanline\s*=|preRender|advance/i.test(l)) {
    console.log((i + 1) + ': ' + l);
  }
});
