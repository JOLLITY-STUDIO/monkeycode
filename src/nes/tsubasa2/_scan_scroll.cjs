// 扫描 OpeningFrameTable 的 scroll 字段,列出非零滚动片段
const fs = require('fs');
const t = fs.readFileSync('src/game/prg/data/scene/OpeningFrameTable.ts', 'utf8');
// 提取 OPENING_FRAMES 数组条目
const m = t.match(/export const OPENING_FRAMES:[\s\S]*?=\s*\[([\s\S]*)\];\s*export function getOpeningFrame/);
if (!m) { console.log('no match'); process.exit(1); }
const body = m[1];
// 按 {f:...} 分割
const entries = [];
const re = /\{f:(\d+),c:\[(.*?)\],p:(null|\{[^}]*\}),o:\[(.*?)\],n:\[(.*?)\],a:\[(.*?)\],s:\{(.*?)\}\}/gs;
let mm;
while ((mm = re.exec(body)) !== null) {
  const s = mm[7];
  const sv = {};
  for (const kv of s.split(',')) {
    const [k, v] = kv.split(':');
    sv[k] = parseInt(v, 10);
  }
  entries.push({ f: parseInt(mm[1], 10), s: sv });
}
// 输出滚动非零的帧段(合并连续)
let segments = [];
let cur = null;
for (const e of entries) {
  const nonZero = e.s.v !== 0 || e.s.h !== 0 || e.s.vt !== 0 || e.s.ht !== 0 || e.s.fv !== 0 || e.s.fh !== 0 || e.s.cv !== 0 || e.s.ch !== 0 || e.s.cvt !== 0 || e.s.cht !== 0;
  if (nonZero) {
    if (!cur) cur = { f0: e.f, f1: e.f, sample: [] };
    cur.f1 = e.f;
    if (cur.sample.length < 3) cur.sample.push({ f: e.f, s: e.s });
  } else if (cur) {
    segments.push(cur);
    cur = null;
  }
}
if (cur) segments.push(cur);
console.log('total frames: ' + entries.length);
console.log('scroll segments: ' + segments.length);
for (const seg of segments.slice(0, 60)) {
  console.log('f' + seg.f0 + '-f' + seg.f1 + ' sample=' + JSON.stringify(seg.sample));
}
