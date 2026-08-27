// scan opening GT data files for ni values used in n (NT) and a (attr) arrays
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'game', 'prg', 'data', 'scene', 'opening');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && !f.includes('Types'));
const niCount = {};
const niRowCount = {};
let totalFrames = 0;
for (const f of files) {
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  // count frames
  const fCount = (c.match(/\{f:/g) || []).length;
  totalFrames += fCount;
  // count ni usage in n:[...] arrays — rough regex for {ni:X,
  const re = /\{ni:(\d+),r:(\d+)/g;
  let m;
  while ((m = re.exec(c)) !== null) {
    const ni = m[1], r = m[2];
    niCount[ni] = (niCount[ni] || 0) + 1;
    const key = `ni${ni}`;
    niRowCount[key] = (niRowCount[key] || 0) + 1;
    if (ni === '1' && niRowCount['ni1'] <= 10) console.log(`${f}: ni=1 r=${r}`);
  }
}
console.log('total frames:', totalFrames);
console.log('ni usage counts:', JSON.stringify(niCount));
