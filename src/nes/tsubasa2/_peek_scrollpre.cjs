const fs = require('fs');
const p = 'output/emu-full/scroll-prerender.json';
if (!fs.existsSync(p)) { console.log('MISSING'); process.exit(0); }
const arr = JSON.parse(fs.readFileSync(p, 'utf8'));
console.log('entries:', arr.length);
const keyFrames = [343, 690, 700, 710, 720, 730, 740, 750, 755, 758, 759, 760, 761, 762, 765, 770, 780, 790, 800, 818, 819, 824, 825];
for (const e of arr) {
  if (keyFrames.includes(e.f)) {
    console.log(`f${e.f}: regV=${e.regV} regH=${e.regH} regVT=${e.regVT} regHT=${e.regHT} regFV=${e.regFV} regFH=${e.regFH} | cntV=${e.cntV} cntH=${e.cntH} cntVT=${e.cntVT} cntHT=${e.cntHT} cntFV=${e.cntFV}`);
  }
}
