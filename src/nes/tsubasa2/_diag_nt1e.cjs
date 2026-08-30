// 追踪 f343-f520 逐帧 NT1 累积状态
const fs = require('fs');
const path = require('path');

const SCENE_DIR = 'src/game/prg/data/scene/opening';
const sceneFiles = fs.readdirSync(SCENE_DIR).filter(f => f.startsWith('opening-') && f.endsWith('.ts'));

function extractBracket(str, startIdx) {
  let depth = 0;
  for (let i = startIdx; i < str.length; i++) {
    if (str[i] === '[') depth++;
    else if (str[i] === ']') { depth--; if (depth === 0) return str.slice(startIdx, i + 1); }
  }
  return null;
}
function parseRows(str) {
  const out = [];
  const re = /\{ni:(\d+),r:(\d+),d:\[([^\]]*)\]\}/g;
  let m;
  while ((m = re.exec(str)) !== null) {
    out.push({ ni: parseInt(m[1]), r: parseInt(m[2]), d: m[3].split(',').map(x => parseInt(x.trim())) });
  }
  return out;
}

const allFrames = [];
for (const fn of sceneFiles) {
  const lines = fs.readFileSync(path.join(SCENE_DIR, fn), 'utf8').split('\n');
  for (const ln of lines) {
    const mm = ln.match(/^\s*\{f:(\d+),/);
    if (!mm) continue;
    const f = parseInt(mm[1]);
    const nIdx = ln.indexOf('n:[');
    let n = [];
    if (nIdx >= 0) { const arr = extractBracket(ln, nIdx + 2); if (arr) n = parseRows(arr); }
    allFrames.push({ f, n });
  }
}
allFrames.sort((a, b) => a.f - b.f);

const nt = [new Array(960).fill(0), new Array(960).fill(0), new Array(960).fill(0), new Array(960).fill(0)];
const nzCount = () => nt.map(t => { let n = 0; for (let i = 0; i < 960; i++) if (t[i] !== 0) n++; return n; });

let lastReport = 0;
for (const fr of allFrames) {
  // 记录帧内写入的 ni
  const written = new Set();
  for (const row of fr.n) {
    const base = row.r * 32;
    for (let c = 0; c < 32; c++) nt[row.ni][base + c] = row.d[c] & 0xff;
    written.add(row.ni);
  }
  if (fr.f >= 343 && fr.f <= 520) {
    if (written.size > 0 || fr.f - lastReport >= 20) {
      console.log(`f${fr.f} write=${[...written].join(',')} nz=[${nzCount()}]`);
      lastReport = fr.f;
    }
  }
}
console.log('final f520:', nzCount());
