const fs = require('fs');
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/rom-data/prg-bank-00.ts';
const c = fs.readFileSync(p, 'utf8');
const bytes = [...c.matchAll(/0x([0-9a-fA-F]{2})/g)].map(x => parseInt(x[1], 16));
const dump = (o, n, label) => {
  console.log(`== ${label} ($${o.toString(16)}) ==`);
  console.log(bytes.slice(o, o + n).map(b => b.toString(16).padStart(2, '0')).join(' '));
};
dump(0x8464 - 0x8000, 120, '$8464 startScript full');
dump(0x8aec - 0x8000, 64, '$8AEC idMap full');
