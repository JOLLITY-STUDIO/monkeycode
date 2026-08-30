// 逐帧模拟 GT diff 累积（括号配对解析），对比 emu nt.json 真实状态
const fs = require('fs');
const path = require('path');

const SCENE_DIR = 'src/game/prg/data/scene/opening';
const sceneFiles = fs.readdirSync(SCENE_DIR).filter(f => f.startsWith('opening-') && f.endsWith('.ts'));

// 从字符串提取 [start) 区间内括号配对的数组文本
function extractBracket(str, startIdx) {
  let depth = 0;
  for (let i = startIdx; i < str.length; i++) {
    const ch = str[i];
    if (ch === '[') depth++;
    else if (ch === ']') {
      depth--;
      if (depth === 0) return str.slice(startIdx, i + 1);
    }
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
    if (nIdx >= 0) {
      const arr = extractBracket(ln, nIdx + 2);
      if (arr) n = parseRows(arr);
    }
    allFrames.push({ f, n });
  }
}
allFrames.sort((a, b) => a.f - b.f);
console.log('total frames:', allFrames.length);

const nt = [new Array(960).fill(0), new Array(960).fill(0), new Array(960).fill(0), new Array(960).fill(0)];
const emuBase = 'output/emu-full';

// 记录哪些帧写了 NT diff
const writeFrames = [];
for (const fr of allFrames) {
  for (const row of fr.n) {
    if (fr.f > 0) {
      writeFrames.push({ f: fr.f, ni: row.ni, r: row.r, nz: row.d.filter(x => x !== 0).length });
    }
    const base = row.r * 32;
    for (let c = 0; c < 32; c++) nt[row.ni][base + c] = row.d[c] & 0xff;
  }
}

// 对比特定帧
for (const target of [710, 760, 800, 810, 860]) {
  const dir = path.join(emuBase, 'frame-' + String(target).padStart(4, '0'));
  if (!fs.existsSync(dir)) continue;
  const emuNt = JSON.parse(fs.readFileSync(path.join(dir, 'nt.json'), 'utf8'));
  const sim = [], emu = [];
  for (let ni = 0; ni < 4; ni++) {
    let s = 0, e = 0;
    for (let i = 0; i < 960; i++) {
      if (nt[ni][i] !== 0) s++;
      if (emuNt[ni].tile[i] !== 0) e++;
    }
    sim.push(s); emu.push(e);
  }
  console.log(`f${target} sim=[${sim}] emu=[${emu}] match=${JSON.stringify(sim) === JSON.stringify(emu)}`);
}

// 前 30 个 NT diff 写入
console.log('\n前 40 个 NT diff 写入帧:');
for (const w of writeFrames.slice(0, 40)) {
  console.log(`  f${w.f} ni=${w.ni} r=${w.r} nz=${w.nz}`);
}

// emu f710 NT0 非零行分布
const emu710 = JSON.parse(fs.readFileSync(path.join(emuBase, 'frame-0710', 'nt.json'), 'utf8'));
console.log('\nemu f710 NT0 非零行:');
for (let r = 0; r < 30; r++) {
  let nz = 0;
  for (let c = 0; c < 32; c++) if (emu710[0].tile[r * 32 + c] !== 0) nz++;
  if (nz > 0) console.log(`  r${r}: ${nz} tiles`);
}

// sim f710 的 NT0/NT1 非零行
console.log('\nsim f710 NT0/NT1 非零行:');
for (let ni = 0; ni < 2; ni++) {
  for (let r = 0; r < 30; r++) {
    let nz = 0;
    for (let c = 0; c < 32; c++) if (nt[ni][r * 32 + c] !== 0) nz++;
    if (nz > 0) console.log(`  ni=${ni} r${r}: ${nz} tiles`);
  }
}
