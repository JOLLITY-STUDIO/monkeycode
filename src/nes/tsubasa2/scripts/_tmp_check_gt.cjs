// 检查 OpeningFrameTable.ts 的帧数 + 标题屏区间 scroll 值
const fs = require('fs');
const t = fs.readFileSync('src/game/prg/data/scene/OpeningFrameTable.ts', 'utf8');
const m = t.match(/OPENING_FRAMES: ReadonlyArray<OpeningFrameEntry> = \[([\s\S]*)\];/);
const body = m[1];
const lines = body.split('\n').filter(l => l.trim().startsWith('{f:'));
console.log('total frames:', lines.length);
const getS = (i) => {
  const mm = lines[i].match(/s:\{v:(\d+),h:(\d+),vt:(\d+),ht:(\d+),fv:(\d+),fh:(\d+)\}/);
  return mm ? mm.slice(1).join(',') : '?';
};
for (const f of [10, 100, 1000, 3000, 3599, 3600, 3700, 3800, 3900, 4000, 4096, 4100, 4200]) {
  const i = f - 10;
  if (i >= 0 && i < lines.length) console.log('f' + f, 'scroll=' + getS(i));
}
// 统计非零 v/h 的帧
let nzV = 0, nzH = 0, nzVT = 0, nzHT = 0;
for (let i = 0; i < lines.length; i++) {
  const mm = lines[i].match(/s:\{v:(\d+),h:(\d+),vt:(\d+),ht:(\d+),fv:(\d+),fh:(\d+)\}/);
  if (!mm) continue;
  if (mm[1] !== '0') nzV++;
  if (mm[2] !== '0') nzH++;
  if (mm[3] !== '0') nzVT++;
  if (mm[4] !== '0') nzHT++;
}
console.log('nonZero v:', nzV, 'h:', nzH, 'vt:', nzVT, 'ht:', nzHT);
