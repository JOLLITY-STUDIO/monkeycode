// 临时: 调试推进模型 — 打印 prerender / scroll / scrollEnd / 模拟结果
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

for (const f of [50, 377, 378, 379, 380, 400, 450, 460, 3700, 3725, 3782, 4000, 4200]) {
  const p = preMap.get(f);
  let st = null;
  try { st = JSON.parse(fs.readFileSync(path.join('output/emu-full/frame-' + String(f).padStart(4, '0'), 'state.json'), 'utf8')); } catch { }
  if (!p || !st) { console.log('f' + f, 'MISS'); continue; }
  const base = { fv: p.cntFV, vt: p.cntVT, v: p.cntV };
  const e239 = advanceN(base, 239);
  const e240 = advanceN(base, 240);
  const e241 = advanceN(base, 241);
  const e242 = advanceN(base, 242);
  const end = st.scrollEnd;
  const match = (e) => e.v === end.cntV && e.vt === end.cntVT;
  console.log('f' + f,
    'prefv=' + p.cntFV, 'prevt=' + p.cntVT, 'prev=' + p.cntV,
    '| end v=' + end.cntV, 'vt=' + end.cntVT,
    '| 239:' + JSON.stringify(e239), '240:' + JSON.stringify(e240),
    '241:' + JSON.stringify(e241), '242:' + JSON.stringify(e242),
    '| match240=' + match(e240), 'match241=' + match(e241));
}
