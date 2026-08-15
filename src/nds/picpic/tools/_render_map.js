const fs = require('fs');
const files = fs.readdirSync('roms/extracted/map_d').sort().filter(f => f.endsWith('.map'));
for (const file of files.slice(0, 12)) {
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
  // 值分布
  const dist = {};
  for (const r of grid) for (const v of r) dist[v] = (dist[v] || 0) + 1;
  console.log('====', file, 'size', w + 'x' + h, 'dist', JSON.stringify(dist));
  // 0 -> 空格, 非0 -> #
  const legend = Object.keys(dist).sort((a, b) => a - b).join(',');
  for (const row of grid) {
    console.log(row.map(v => (v === 0 ? '.' : v === 1 ? '#' : String.fromCharCode(97 + v))).join(''));
  }
}
