// 提取 curtain 期间每帧的 scroll 值 + NT0 内容变化
const fs = require('fs');

// 1. 从 trace log 提取 Y scroll
const trace = fs.readFileSync('_trace_curtain3.log', 'utf8').split('\n');
const frames = {};
for (const l of trace) {
  const m = /f=(\d+)/.exec(l);
  if (!m) continue;
  const f = parseInt(m[1]);
  if (f < 3700 || f > 3800) continue;
  if (!frames[f]) frames[f] = { main: null, split: null };
  // 主 scroll 写入: 在 pre-render 阶段 (scan<=20) 的第一个非$00 Y 值
  const w5 = /W2005 f=\d+ scan=(\d+) dot=\d+ val=\$(\w+) .*-> 0\/0\/(\d+)\/(\d+)/.exec(l);
  if (w5) {
    const scan = parseInt(w5[1]);
    const val = parseInt(w5[2], 16);
    const fine = parseInt(w5[3]);
    const coarse = parseInt(w5[4]);
    const y = coarse * 8 + fine;
    if (scan <= 20) {
      if (!frames[f].main && y !== 0) frames[f].main = `scan${scan} val$${w5[2]} y=${y}`;
    } else if (scan > 20 && scan < 240) {
      frames[f].split = `scan${scan} val$${w5[2]} y=${y}`;
    }
  }
}

// 2. 检查 emu NT0 内容变化（每帧 diff 非空行范围）
function ntRows(f) {
  const p = `output/emu-full/frame-${String(f).padStart(4, '0')}/nt.json`;
  if (!fs.existsSync(p)) return null;
  const nt = JSON.parse(fs.readFileSync(p, 'utf8'));
  const rows = [];
  for (let i = 0; i < 4; i++) {
    let nonEmpty = 0;
    const sig = [];
    for (let r = 0; r < 30; r++) {
      let any = false;
      for (let c = 0; c < 32; c++) if (nt[i].tile[r * 32 + c] !== 0) { any = true; break; }
      if (any) { nonEmpty++; if (sig.length < 4) sig.push(r); }
    }
    rows.push(`NT${i}:${nonEmpty}rows${sig.length ? '@' + sig.join(',') : ''}`);
  }
  return rows.join(' ');
}

console.log('frame | mainY(splitY) | NT rows');
let prev = null;
for (let f = 3725; f <= 3785; f++) {
  const fr = frames[f];
  if (!fr) continue;
  const nt = ntRows(f);
  const isDiff = nt !== prev;
  if (isDiff) console.log(`f${f}  ${JSON.stringify(fr)}  ${nt}`);
  else console.log(`f${f}  ${JSON.stringify(fr)}  (same NT)`);
  prev = nt;
}
