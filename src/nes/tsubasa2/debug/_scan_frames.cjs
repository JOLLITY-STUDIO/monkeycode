// 分析 tsubasa1045.log：帧分布 + 每帧 PPU/关键 RAM 写
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'docs', 'roms', 'aftertecmo');
const file = 'tsubasa1045.log';

const lines = fs.readFileSync(path.join(DIR, file), 'utf8').split('\n');
console.log('total lines:', lines.length);

// 帧号分布
const frames = new Map(); // f -> count
let firstLineOfFrame = null;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const m = line.match(/^f(\d+)\s/);
  if (m) {
    const f = parseInt(m[1]);
    frames.set(f, (frames.get(f) || 0) + 1);
    if (firstLineOfFrame === null) firstLineOfFrame = f;
  }
}
const fsorted = [...frames.keys()].sort((a, b) => a - b);
console.log('frame range:', fsorted[0], '->', fsorted[fsorted.length - 1], 'count:', fsorted.length);
console.log('first 20 frames:', fsorted.slice(0, 20).join(','));
console.log('last 20 frames:', fsorted.slice(-20).join(','));
// 找连续段
let seg = [], segs = [];
for (const f of fsorted) {
  if (seg.length === 0 || f === seg[seg.length - 1] + 1) seg.push(f);
  else { segs.push(seg); seg = [f]; }
}
segs.push(seg);
console.log('contiguous segments:', segs.map(s => s.length === 1 ? s[0] : s[0] + '-' + s[s.length - 1]).join(' | '));
