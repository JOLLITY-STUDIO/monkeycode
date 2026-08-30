const fs = require('fs');

const files = [
  ['src/game/prg/data/scene/opening/opening-tecmo-start.ts', 10, 342],
  ['src/game/prg/data/scene/opening/opening-title-1.ts', 343, 818],
  ['src/game/prg/data/scene/opening/opening-title-2.ts', 819, 824],
  ['src/game/prg/data/scene/opening/opening-subtitle-1.ts', 825, 1039],
];

const nt = [new Array(960).fill(0), new Array(960).fill(0), new Array(960).fill(0), new Array(960).fill(0)];
const attr = [new Array(64).fill(0), new Array(64).fill(0), new Array(64).fill(0), new Array(64).fill(0)];

function parseRows(str, prefix) {
  const out = [];
  // 匹配 {ni:X,r:Y,d:[...]}
  const re = /\{ni:(\d+),r:(\d+),d:\[([^\]]*)\]\}/g;
  let m;
  while ((m = re.exec(str)) !== null) {
    out.push({ ni: parseInt(m[1]), r: parseInt(m[2]), d: m[3].split(',').map(x => parseInt(x.trim())) });
  }
  return out;
}

function findFrame(path, target) {
  const lines = fs.readFileSync(path, 'utf8').split('\n');
  for (const ln of lines) {
    const mm = ln.match(/^\s*\{f:(\d+),/);
    if (mm && parseInt(mm[1]) === target) {
      const nMatch = ln.match(/n:\[([^\]]*)\]/);
      const aMatch = ln.match(/a:\[([^\]]*)\]/);
      const n = parseRows(nMatch ? nMatch[1] : '', 'n');
      const a = parseRows(aMatch ? aMatch[1] : '', 'a');
      return { ln, n, a };
    }
  }
  return null;
}

function applyUntil(target) {
  for (const [p, f0, f1] of files) {
    if (target < f0) continue;
    const lines = fs.readFileSync(p, 'utf8').split('\n');
    for (const ln of lines) {
      const mm = ln.match(/^\s*\{f:(\d+),/);
      if (!mm) continue;
      const f = parseInt(mm[1]);
      if (f < f0 || f > Math.min(f1, target)) continue;
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
      if (f === target) return;
    }
  }
}

applyUntil(860);
console.log('=== 模拟累积到 f860 的 NT/ATTR ===');
for (let ni = 0; ni < 4; ni++) {
  let nz = 0;
  for (let i = 0; i < 960; i++) if (nt[ni][i] !== 0) nz++;
  let nza = 0;
  for (let i = 0; i < 64; i++) if (attr[ni][i] !== 0) nza++;
  console.log(`nameTable[${ni}] tiles=${nz}/960 attr=${nza}/64`);
}

const f860 = findFrame('src/game/prg/data/scene/opening/opening-title-1.ts', 860);
console.log('\n=== f860 diff ===');
console.log('n:', f860 ? f860.n.length : 'not found');
console.log('a:', f860 ? f860.a.length : 'not found');
if (f860) {
  const counts = {};
  for (const row of f860.n) counts[row.ni] = (counts[row.ni] || 0) + 1;
  console.log('n ni counts:', counts);
  console.log('f860 line head:', f860.ln.slice(0, 260));
}
