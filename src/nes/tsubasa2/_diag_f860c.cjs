const fs = require('fs');

const files = [
  ['src/game/prg/data/scene/opening/opening-tecmo-start.ts', 10, 342],
  ['src/game/prg/data/scene/opening/opening-title-1.ts', 343, 818],
  ['src/game/prg/data/scene/opening/opening-title-2.ts', 819, 824],
  ['src/game/prg/data/scene/opening/opening-subtitle-1.ts', 825, 1039],
];

const nt = [new Array(960).fill(0), new Array(960).fill(0), new Array(960).fill(0), new Array(960).fill(0)];
const attr = [new Array(64).fill(0), new Array(64).fill(0), new Array(64).fill(0), new Array(64).fill(0)];

function parseRows(str) {
  const out = [];
  const re = /\{ni:(\d+),r:(\d+),d:\[([^\]]*)\]\}/g;
  let m;
  while ((m = re.exec(str)) !== null) {
    out.push({ ni: parseInt(m[1]), r: parseInt(m[2]), d: m[3].split(',').map(x => parseInt(x.trim())) });
  }
  return out;
}

for (const [p] of files) {
  const lines = fs.readFileSync(p, 'utf8').split('\n');
  for (const ln of lines) {
    const mm = ln.match(/^\s*\{f:(\d+),/);
    if (!mm) continue;
    const f = parseInt(mm[1]);
    const nMatch = ln.match(/n:\[([^\]]*)\]/);
    const aMatch = ln.match(/a:\[([^\]]*)\]/);
    const n = parseRows(nMatch ? nMatch[1] : '');
    const a = parseRows(aMatch ? aMatch[1] : '');
    for (const row of n) {
      const base = row.r * 32;
      for (let c = 0; c < 32; c++) nt[row.ni][base + c] = row.d[c] & 0xff;
    }
    for (const row of a) {
      const base = row.r * 8;
      for (let c = 0; c < 8; c++) attr[row.ni][base + c] = row.d[c] & 0xff;
    }
    if (f === 860) {
      console.log('=== 模拟累积到 f860 的 NT/ATTR ===');
      for (let ni = 0; ni < 4; ni++) {
        let nz = 0;
        for (let i = 0; i < 960; i++) if (nt[ni][i] !== 0) nz++;
        let nza = 0;
        for (let i = 0; i < 64; i++) if (attr[ni][i] !== 0) nza++;
        console.log(`nameTable[${ni}] tiles=${nz}/960 attr=${nza}/64`);
      }
      const counts = {};
      for (const row of n) counts[row.ni] = (counts[row.ni] || 0) + 1;
      console.log('f860 n ni counts:', counts);
      console.log('f860 a count:', a.length);
      break;
    }
  }
}
