const fs = require('fs');
const files = fs.readdirSync('roms/extracted/map_d').sort().filter(f => f.endsWith('.map'));

// 统计每个值与其4邻居(非0?)的关系
const stats = {}; // value -> {up,down,left,right} 统计邻居非0比例
for (const file of files) {
  const b = fs.readFileSync('roms/extracted/map_d/' + file);
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
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const v = grid[y][x];
      if (v === 0) continue;
      if (!stats[v]) stats[v] = { up: 0, down: 0, left: 0, right: 0, n: 0 };
      const s = stats[v];
      s.n++;
      if (y > 0 && grid[y - 1][x] !== 0) s.up++;
      if (y < h - 1 && grid[y + 1][x] !== 0) s.down++;
      if (x > 0 && grid[y][x - 1] !== 0) s.left++;
      if (x < w - 1 && grid[y][x + 1] !== 0) s.right++;
    }
  }
}
console.log('value: up/down/left/right 非0邻居比例');
for (const v of Object.keys(stats).sort((a, b) => a - b)) {
  const s = stats[v];
  console.log(v, 'n=' + s.n,
    'up=' + (s.up / s.n).toFixed(2),
    'down=' + (s.down / s.n).toFixed(2),
    'left=' + (s.left / s.n).toFixed(2),
    'right=' + (s.right / s.n).toFixed(2));
}

// 单文件详细分析：4000101
const file = files[0];
const b = fs.readFileSync('roms/extracted/map_d/' + file);
const h = b[0], w = b[1];
const body = b.slice(6);
console.log('\n====', file, w + 'x' + h);
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
// 找起点终点：值0 格子，以及边界的非0格？
// 打印整图（值0=' ', 其他='#'）
for (const row of grid) {
  console.log(row.map(v => (v === 0 ? ' ' : v === 1 ? '#' : v === 2 ? 'c' : v === 3 ? 'd' : v === 8 ? 'i' : v === 9 ? 'j' : v === 10 ? 'k' : 'l')).join(''));
}
// 连通性：从每个非0格 BFS，看是否全连通
const total = grid.reduce((a, r) => a + r.filter(v => v !== 0).length, 0);
let start = null;
outer: for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (grid[y][x] !== 0) { start = [x, y]; break outer; }
const seen = new Set();
const q = [start];
while (q.length) {
  const [x, y] = q.pop();
  const k = y * w + x;
  if (seen.has(k)) continue;
  seen.add(k);
  for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const nx = x + dx, ny = y + dy;
    if (nx >= 0 && ny >= 0 && nx < w && ny < h && grid[ny][nx] !== 0 && !seen.has(ny * w + nx)) q.push([nx, ny]);
  }
}
console.log('非0格总数:', total, '连通数:', seen.size, '连通?', seen.size === total);
// 每格邻居数分布（路径线=2个端点/度, 死胡同=1, 交点=3/4）
const deg = {};
for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
  if (grid[y][x] === 0) continue;
  let d = 0;
  for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const nx = x + dx, ny = y + dy;
    if (nx >= 0 && ny >= 0 && nx < w && ny < h && grid[ny][nx] !== 0) d++;
  }
  deg[d] = (deg[d] || 0) + 1;
}
console.log('度数分布(路径线特征):', JSON.stringify(deg));
