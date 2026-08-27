const fs = require('fs');
const p = 'src/core/ppu/index.ts';
const c = fs.readFileSync(p, 'utf8');
const lines = c.split('\n');
for (const kw of ['renderStartOverride', 'regHT', 'regVT', 'cntHT', 'cntVT', 'renderBgScanline', 'regH', 'regV', 'renderStart', 'cntV', 'cntH']) {
  console.log('### ' + kw);
  lines.forEach((l, i) => {
    if (l.includes(kw)) console.log((i + 1) + ': ' + l.trim());
  });
}
