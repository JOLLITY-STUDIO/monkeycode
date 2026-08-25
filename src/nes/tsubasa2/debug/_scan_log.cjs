const fs = require('fs');
const lines = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/aftertecmo/tsubasa-when-show380-逐帧.log', 'utf8').split('\n');

let cur = 0;
const stat = {
  ppu2007: 0, ppu2006: 0, palette: 0, oamDma: 0,
  chrWrite: 0, // STA $8000/$8001
  bankSwitch: 0,
  ramWrite: 0, // STA abs / STA zpg
  total: 0,
};
const byFrame = {};
for (const ln of lines) {
  const fm = ln.match(/^f(\d+)\s/);
  if (fm) cur = +fm[1];
  if (cur < 374 || cur > 385) continue;
  if (!byFrame[cur]) byFrame[cur] = {};
  if (/STA\b.*\$2007\b/.test(ln)) { stat.ppu2007++; (byFrame[cur].ppu2007 = (byFrame[cur].ppu2007||0)+1); }
  if (/STA\b.*\$2006\b/.test(ln)) { stat.ppu2006++; (byFrame[cur].ppu2006 = (byFrame[cur].ppu2006||0)+1); }
  if (/STA\b.*\$3F00|\$3F10|\$3F14/.test(ln)) { stat.palette++; (byFrame[cur].palette = (byFrame[cur].palette||0)+1); }
  if (/STA\b.*\$4014\b/.test(ln)) { stat.oamDma++; (byFrame[cur].oamDma = (byFrame[cur].oamDma||0)+1); }
  if (/STA\b.*\$8000\b|\$8001\b/.test(ln)) { stat.chrWrite++; (byFrame[cur].chrWrite = (byFrame[cur].chrWrite||0)+1); }
  if (/STA\s+abs\s|STA\s+zp\b|STA\s+\(/.test(ln)) { stat.ramWrite++; }
  stat.total++;
}
console.log('frame 374-385 TOTAL:');
console.log('  total lines   :', stat.total);
console.log('  STA $2007 (PPU data):', stat.ppu2007);
console.log('  STA $2006 (PPU addr):', stat.ppu2006);
console.log('  palette writes :', stat.palette);
console.log('  STA $4014 (OAM DMA):', stat.oamDma);
console.log('  STA $8000/$8001 (CHR/bank switch):', stat.chrWrite);
console.log('  other RAM writes:', stat.ramWrite);
console.log('\nBy frame:');
for (const f of Object.keys(byFrame).sort((a,b)=>+a-+b)) {
  const o = byFrame[f];
  console.log('  f'+f+':', JSON.stringify(o));
}
