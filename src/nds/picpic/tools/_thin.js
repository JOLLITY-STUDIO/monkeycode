const fs = require('fs');
const SRC = 'roms/extracted/map_d/';

function load(fname) {
  const b = fs.readFileSync(SRC + fname);
  const h = b[0], w = b[1];
  const body = b.slice(6);
  const grid = [];
  for (let y = 0; y < h; y++) {
    const row = [];
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      const bb = body[i >> 1];
      row.push(i & 1 ? (bb >> 4) : (bb & 0x0F));
    }
    grid.push(row);
  }
  return { w, h, grid };
}

// Zhang-Suen 细化, 输入/输出 Uint8Array (1=前景)
function zhangSuen(w, h, img) {
  const a = new Uint8Array(img);
  const b = new Uint8Array(img.length);
  const N = (x, y, off) => {
    const k = (y + off[1]) * w + (x + off[0]);
    if (x + off[0] < 0 || y + off[1] < 0 || x + off[0] >= w || y + off[1] >= h) return 0;
    return a[k];
  };
  // 8 邻居
  const P = (x, y) => [
    N(x, y, [0, -1]), N(x, y, [1, -1]), N(x, y, [1, 0]), N(x, y, [1, 1]),
    N(x, y, [0, 1]), N(x, y, [-1, 1]), N(x, y, [-1, 0]), N(x, y, [-1, -1]),
  ];
  let changed = true;
  let guard = 0;
  while (changed && guard++ < 100) {
    changed = false;
    // 阶段1
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = y * w + x;
      b[i] = a[i];
      if (!a[i]) continue;
      const p = P(x, y);
      const B = p.reduce((s, v) => s + v, 0);
      if (B < 2 || B > 6) continue;
      let A = 0;
      for (let k = 0; k < 8; k++) if (p[k] === 0 && p[(k + 1) % 8] === 1) A++;
      if (A !== 1) continue;
      if (p[0] * p[2] * p[4] === 0 && p[2] * p[4] * p[6] === 0) { b[i] = 0; changed = true; }
    }
    a.set(b);
    // 阶段2
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = y * w + x;
      b[i] = a[i];
      if (!a[i]) continue;
      const p = P(x, y);
      const B = p.reduce((s, v) => s + v, 0);
      if (B < 2 || B > 6) continue;
      let A = 0;
      for (let k = 0; k < 8; k++) if (p[k] === 0 && p[(k + 1) % 8] === 1) A++;
      if (A !== 1) continue;
      if (p[0] * p[2] * p[6] === 0 && p[0] * p[4] * p[6] === 0) { b[i] = 0; changed = true; }
    }
    a.set(b);
  }
  return a;
}

for (const f of ['4000101_Cat & mouse.map', '4000201_House.map', '4000103_Frog.map', '4000112_Ship.map']) {
  const g = load(f);
  const img = new Uint8Array(g.w * g.h);
  for (let i = 0; i < g.w * g.h; i++) img[i] = g.grid[(i / g.w) | 0][i % g.w] !== 0 ? 1 : 0;
  const sk = zhangSuen(g.w, g.h, img);
  console.log('\n########', f, g.w + 'x' + g.h, '骨架');
  let n = 0;
  for (let y = 0; y < g.h; y++) {
    let row = '';
    for (let x = 0; x < g.w; x++) { row += sk[y * g.w + x] ? '#' : '.'; n += sk[y * g.w + x]; }
    console.log(row);
  }
  console.log('骨架线格:', n);
}
