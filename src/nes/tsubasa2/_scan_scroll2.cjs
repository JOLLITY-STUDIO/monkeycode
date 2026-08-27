// 扫描 OpeningFrameTable: 统计滚动字段(vt/fv/cvt/ht/fh)随帧变化
const fs = require('fs');
const t = fs.readFileSync('src/game/prg/data/scene/OpeningFrameTable.ts', 'utf8');
const m = t.match(/export const OPENING_FRAMES:[\s\S]*?=\s*\[([\s\S]*)\];\s*export function getOpeningFrame/);
if (!m) { console.log('no match'); process.exit(1); }
const body = m[1];
const re = /\{f:(\d+),c:\[(.*?)\],p:(null|\{[^}]*\}),o:\[(.*?)\],n:\[(.*?)\],a:\[(.*?)\],s:\{(.*?)\}\}/gs;
let mm;
let prev = null;
const changes = [];
while ((mm = re.exec(body)) !== null) {
  const f = parseInt(mm[1], 10);
  const s = {};
  for (const kv of mm[7].split(',')) {
    const [k, v] = kv.split(':');
    s[k] = parseInt(v, 10);
  }
  if (prev) {
    if (s.v !== prev.v || s.h !== prev.h || s.vt !== prev.vt || s.ht !== prev.ht ||
        s.fv !== prev.fv || s.fh !== prev.fh || s.cv !== prev.cv || s.ch !== prev.ch ||
        s.cvt !== prev.cvt || s.cht !== prev.cht) {
      changes.push({ f, s });
    }
  }
  prev = s;
}
console.log('total scroll changes: ' + changes.length);
// 打印变化点(每帧一行, 只显示 v 相关字段)
for (const c of changes.slice(0, 120)) {
  const s = c.s;
  const vs = 'v=' + s.v + ' vt=' + s.vt + ' fv=' + s.fv + ' cv=' + s.cv + ' cvt=' + s.cvt;
  const hs = 'h=' + s.h + ' ht=' + s.ht + ' fh=' + s.fh + ' ch=' + s.ch + ' cht=' + s.cht;
  console.log('f' + c.f + ' ' + vs + ' | ' + hs);
}
