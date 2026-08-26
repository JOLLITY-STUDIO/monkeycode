// 扫描 opening f10-f4200: 找出 NT1/NT2/NT3 有内容的帧区间
const fs = require('fs');
const path = require('path');
const IN = path.join(__dirname, '..', 'output', 'emu-full');
const ranges = [];
const cur = {};
const flush = (f, nt) => {
  if (cur[nt] && cur[nt].active) {
    cur[nt].f1 = f - 1;
    ranges.push(cur[nt]);
    cur[nt] = null;
  }
};
for (let f = 10; f <= 4200; f++) {
  const dir = path.join(IN, 'frame-' + String(f).padStart(4, '0'));
  const nt = JSON.parse(fs.readFileSync(path.join(dir, 'nt.json'), 'utf8'));
  for (let ni = 0; ni < 4; ni++) {
    let nz = 0;
    for (let i = 0; i < 960; i++) if (nt[ni].tile[i] !== 0) nz++;
    if (nz > 0) {
      if (!cur[ni] || !cur[ni].active) cur[ni] = { nt: ni, f0: f, f1: f, maxNz: nz, active: true };
      else { cur[ni].f1 = f; if (nz > cur[ni].maxNz) cur[ni].maxNz = nz; }
    } else {
      flush(f, ni);
      cur[ni] = { active: false };
    }
  }
}
for (let ni = 0; ni < 4; ni++) flush(4201, ni);
ranges.sort((a, b) => a.nt - b.nt || a.f0 - b.f0);
console.log('ranges:', ranges.length);
for (const r of ranges) console.log('NT' + r.nt, 'f' + r.f0 + '-f' + r.f1, 'maxNz=' + r.maxNz);
