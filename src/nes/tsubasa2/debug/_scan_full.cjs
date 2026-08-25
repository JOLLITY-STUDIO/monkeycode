const fs = require('fs');
const lines = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/aftertecmo/tsubasa-when-show380-逐帧.log', 'utf8').split('\n');

let cur = 0;
const stat = { ppu2007: 0, ppu2006: 0, palette: 0, oamDma: 0, chrWrite: 0, total: 0 };
const byFrame = {};
for (const ln of lines) {
  const fm = ln.match(/^f(\d+)\s/);
  if (fm) cur = +fm[1];
  if (cur < 1 || cur > 4000) continue;
  if (!byFrame[cur]) byFrame[cur] = { ppu2007:0, ppu2006:0, palette:0, oamDma:0, chrWrite:0 };
  if (/STA\b.*\$2007\b/.test(ln)) { stat.ppu2007++; byFrame[cur].ppu2007++; }
  if (/STA\b.*\$2006\b/.test(ln)) { stat.ppu2006++; byFrame[cur].ppu2006++; }
  if (/STA\b.*\$3F00|\$3F10|\$3F14/.test(ln)) { stat.palette++; byFrame[cur].palette++; }
  if (/STA\b.*\$4014\b/.test(ln)) { stat.oamDma++; byFrame[cur].oamDma++; }
  if (/STA\b.*\$8000\b|\$8001\b/.test(ln)) { stat.chrWrite++; byFrame[cur].chrWrite++; }
  stat.total++;
}
console.log('frame 1-4000 TOTAL:');
console.log('  total lines   :', stat.total);
console.log('  STA $2007 (PPU data):', stat.ppu2007);
console.log('  STA $2006 (PPU addr):', stat.ppu2006);
console.log('  palette writes :', stat.palette);
console.log('  STA $4014 (OAM DMA):', stat.oamDma);
console.log('  STA $8000/$8001 :', stat.chrWrite);

const withRender = [];
for (let f = 1; f <= 400; f++) {
  const o = byFrame[f];
  if (!o) continue;
  const sum = o.ppu2007 + o.ppu2006 + o.palette + o.oamDma;
  if (sum > 0) withRender.push([f, o]);
}
console.log('\nFrames WITH rendering (f1-f400), count:', withRender.length);
withRender.slice(0, 50).forEach(([f, o]) => {
  console.log('  f'+f+':', JSON.stringify(o));
});
