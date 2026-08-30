// 临时: 从 GT 场景文件统计 pr:0 帧
const fs = require('fs');
const path = require('path');
const dir = 'src/game/prg/data/scene/opening';
const files = fs.readdirSync(dir).filter((f) => /^opening-.*\.ts$/.test(f));
const pr0 = [];
for (const f of files) {
  const txt = fs.readFileSync(path.join(dir, f), 'utf8');
  for (const m of txt.matchAll(/\{f:(\d+),c:\[.*?,pr:(\d+)\}/g)) {
    if (m[2] === '0') pr0.push(+m[1]);
  }
}
pr0.sort((a, b) => a - b);
console.log('pr:0 count =', pr0.length);
let ranges = [], s = pr0[0], prev = pr0[0];
for (let i = 1; i < pr0.length; i++) {
  if (pr0[i] === prev + 1) { prev = pr0[i]; continue; }
  ranges.push(s === prev ? `f${s}` : `f${s}-f${prev}`);
  s = prev = pr0[i];
}
ranges.push(s === prev ? `f${s}` : `f${s}-f${prev}`);
console.log('ranges:', ranges.join(', '));
