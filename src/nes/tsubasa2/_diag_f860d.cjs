const fs = require('fs');
const nt = [new Array(960).fill(0), new Array(960).fill(0), new Array(960).fill(0), new Array(960).fill(0)];
const files = [
  ['src/game/prg/data/scene/opening/opening-tecmo-start.ts', 10, 342],
  ['src/game/prg/data/scene/opening/opening-title-1.ts', 343, 818],
  ['src/game/prg/data/scene/opening/opening-title-2.ts', 819, 824],
  ['src/game/prg/data/scene/opening/opening-subtitle-1.ts', 825, 1039],
];

function apply(path) {
  const lines = fs.readFileSync(path, 'utf8').split('\n');
  for (const ln of lines) {
    const mm = ln.match(/^\s*\{f:(\d+),/);
    if (!mm) continue;
    const f = parseInt(mm[1]);
    const idx = ln.indexOf('n:[');
    if (idx < 0) continue;
    let depth = 0, si = idx;
    for (let i = idx; i < ln.length; i++) {
      const ch = ln[i];
      if (ch === '[') { depth++; if (depth === 1) si = i + 1; }
      else if (ch === ']') { depth--; if (depth === 0) { processN(ln.slice(si, i)); break; } }
    }
    if (f === 860) {
      console.log('=== NT stats f860 ===');
      for (let ni = 0; ni < 4; ni++) {
        let nz = 0;
        for (let i = 0; i < 960; i++) if (nt[ni][i] !== 0) nz++;
        console.log(`nt[${ni}] nz=${nz}`);
      }
      return true;
    }
  }
  return false;
}

function processN(str) {
  const re = /\{ni:(\d+),r:(\d+),d:\[([^\]]*)\]\}/g;
  let m;
  while ((m = re.exec(str)) !== null) {
    const ni = parseInt(m[1]), r = parseInt(m[2]), d = m[3].split(',').map(x => parseInt(x.trim()));
    const base = r * 32;
    for (let c = 0; c < 32; c++) nt[ni][base + c] = d[c] & 0xff;
  }
}

for (const [p] of files) {
  if (apply(p)) break;
}
