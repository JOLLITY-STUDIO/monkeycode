const fs = require('fs');
const files = fs.readdirSync('roms/extracted/map_d').sort().filter(f => f.endsWith('.map'));

// 1) 统计所有文件所有格子的值分布
const dist = {};
for (const file of files) {
  const b = fs.readFileSync('roms/extracted/map_d/' + file);
  const h = b[0], w = b[1];
  const body = b.slice(6);
  for (let i = 0; i < h * w; i++) {
    const bb = body[i >> 1];
    const v = i & 1 ? (bb >> 4) : (bb & 0x0F);
    dist[v] = (dist[v] || 0) + 1;
  }
}
console.log('全文件值分布:', JSON.stringify(dist));

// 2) 4000101 单文件：按值渲染（0=背景）
const file = files[0];
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
// 3) 值=1 的格子连通域分析（看是否成线）
function label(v) {
  const seen = new Set();
  const comps = [];
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (grid[y][x] !== v || seen.has(y * w + x)) continue;
    let size = 0, minX = 1e9, maxX = -1, minY = 1e9, maxY = -1;
    const q = [[x, y]];
    seen.add(y * w + x);
    while (q.length) {
      const [cx, cy] = q.pop();
      size++; minX = Math.min(minX, cx); maxX = Math.max(maxX, cx);
      minY = Math.min(minY, cy); maxY = Math.max(maxY, cy);
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = cx + dx, ny = cy + dy;
        if (nx >= 0 && ny >= 0 && nx < w && ny < h && grid[ny][nx] === v && !seen.has(ny * w + nx)) {
          seen.add(ny * w + nx); q.push([nx, ny]);
        }
      }
    }
    comps.push({ size, w: maxX - minX + 1, h: maxY - minY + 1, dense: size / ((maxX - minX + 1) * (maxY - minY + 1)) });
  }
  comps.sort((a, b) => b.size - a.size);
  return comps;
}
console.log('\n值1连通域 (size, bboxW, bboxH, dense): 前10');
console.log(label(1).slice(0, 10).map(c => `${c.size},${c.w},${c.h},${c.dense.toFixed(2)}`).join(' | '));
console.log('\n值9连通域 前10');
console.log(label(9).slice(0, 10).map(c => `${c.size},${c.w},${c.h},${c.dense.toFixed(2)}`).join(' | '));
console.log('\n值8连通域 前10');
console.log(label(8).slice(0, 10).map(c => `${c.size},${c.w},${c.h},${c.dense.toFixed(2)}`).join(' | '));

// 4) 相邻值关系：每对相邻格子 (v1,v2) 统计
const pair = {};
for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
  const v = grid[y][x];
  for (const [dx, dy] of [[1, 0], [0, 1]]) {
    const nx = x + dx, ny = y + dy;
    if (nx < w && ny < h) {
      const k = Math.min(v, grid[ny][nx]) + ',' + Math.max(v, grid[ny][nx]);
      pair[k] = (pair[k] || 0) + 1;
    }
  }
}
const sorted = Object.entries(pair).sort((a, b) => b[1] - a[1]);
console.log('\n相邻值对 top15:', sorted.slice(0, 15).map(([k, n]) => k + ':' + n).join(' '));
