const fs = require('fs');
const path = require('path');

function parseNum(s) {
  s = s.trim();
  if (/^0x/i.test(s)) return parseInt(s, 16);
  return parseInt(s, 10);
}

const file = path.join(__dirname, '..', 'src', 'game', 'prg', 'data', 'rom', 'prg-bank-00.ts');
let src = fs.readFileSync(file, 'utf8');
const m = src.match(/const PRG_BANK_00: readonly number\[\] = \[([\s\S]*?)\];/);
if (!m) { console.error('not found'); process.exit(1); }
const nums = m[1].split(',').map(parseNum).filter(n => !isNaN(n));
console.log('len:', nums.length);
const ranges = [[0x92a0, 0x92e6], [0x9305, 0x9320], [0x9492, 0x94d8]];
for (const [lo, hi] of ranges) {
  console.log(`== $${lo.toString(16)}-$${hi.toString(16)} ==`);
  for (let i = lo; i <= hi; i += 16) {
    const row = nums.slice(i - 0x8000, Math.min(i + 16, hi + 1) - 0x8000);
    console.log(`$${i.toString(16).toUpperCase()}: ` + row.map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' '));
  }
  console.log('');
}

// grep loadSceneStream / TileRenderService / sceneStreamNext callers
const root = path.join(__dirname, '..', 'src');
function walk(d, out) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p, out);
    else if (f.name.endsWith('.ts')) {
      try {
        const c = fs.readFileSync(p, 'utf8');
        if (c.includes('loadSceneStream') || c.includes('sceneStreamNext')) out.push(p);
      } catch (e) {}
    }
  }
}
const hits = [];
walk(root, hits);
console.log('callers:\n' + hits.join('\n'));
