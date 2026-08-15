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

function edges(g) {
  // 边界格: 自身非0 且 有邻居值为0 (外部轮廓) 或 自身0且邻居非0
  const out = [];
  for (let y = 0; y < g.h; y++) {
    const row = [];
    for (let x = 0; x < g.w; x++) {
      const v = g.grid[y][x];
      let isEdge = false;
      if (v === 0) {
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = x + dx, ny = y + dy;
          if (nx >= 0 && ny >= 0 && nx < g.w && ny < g.h && g.grid[ny][nx] !== 0) { isEdge = true; break; }
        }
      } else {
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = x + dx, ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= g.w || ny >= g.h || g.grid[ny][nx] !== v) { isEdge = true; break; }
        }
      }
      row.push(isEdge ? '#' : '.');
    }
    out.push(row);
  }
  return out;
}

for (const f of ['4000101_Cat & mouse.map', '4000201_House.map', '4000103_Frog.map']) {
  const g = load(f);
  console.log('\n########', f, g.w + 'x' + g.h, '边界线');
  const e = edges(g);
  for (const row of e) console.log(row.join(''));
  // 统计线格数
  const n = e.reduce((a, r) => a + r.filter(c => c === '#').length, 0);
  console.log('线格:', n, '/', g.w * g.h);
}
