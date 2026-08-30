// 临时: 全帧推进模式分类。mode0=240(无 dummy), mode1=241(有 dummy), AMBIG=无法区分
const fs = require('fs');
const path = require('path');
const pre = JSON.parse(fs.readFileSync('output/emu-full/scroll-prerender.json', 'utf8'));
const preMap = new Map(pre.map((e) => [e.f, e]));

function advance(s) {
  let fv = s.fv, vt = s.vt, v = s.v;
  fv++;
  if (fv === 8) {
    fv = 0; vt++;
    if (vt === 30) { vt = 0; v++; v %= 2; }
    else if (vt === 32) { vt = 0; }
  }
  return { fv, vt, v };
}
function advanceN(state, n) { let s = state; for (let i = 0; i < n; i++) s = advance(s); return s; }

const modes = [];
for (let f = 10; f <= 4331; f++) {
  const p = preMap.get(f);
  let end = null;
  try {
    end = JSON.parse(fs.readFileSync(path.join('output/emu-full/frame-' + String(f).padStart(4, '0'), 'state.json'), 'utf8')).scrollEnd;
  } catch { modes.push({ f, mode: 'MISS' }); continue; }
  if (!p || !end) { modes.push({ f, mode: 'MISS' }); continue; }
  const base = { fv: p.cntFV, vt: p.cntVT, v: p.cntV };
  const m240 = advanceN(base, 240);
  const m241 = advanceN(base, 241);
  const ok240 = m240.v === end.cntV && m240.vt === end.cntVT;
  const ok241 = m241.v === end.cntV && m241.vt === end.cntVT;
  let mode;
  if (ok240 && !ok241) mode = 0;
  else if (ok241 && !ok240) mode = 1;
  else if (ok240 && ok241) mode = 'A';
  else mode = 'X';
  modes.push({ f, mode });
}

const ranges = [];
let cur = null;
for (const m of modes) {
  if (!cur || cur.mode !== m.mode) {
    if (cur) ranges.push(cur);
    cur = { mode: m.mode, f0: m.f, f1: m.f };
  } else cur.f1 = m.f;
}
if (cur) ranges.push(cur);

for (const r of ranges) console.log(`f${r.f0}-f${r.f1} mode=${r.mode}`);
console.log('---- stats ----');
for (const m of [0, 1, 'A', 'X', 'MISS']) {
  console.log('mode', m, '=', modes.filter((x) => x.mode === m).length);
}
