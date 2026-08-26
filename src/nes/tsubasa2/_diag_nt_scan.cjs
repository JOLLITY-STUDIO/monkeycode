// 扫描 emu 各 NT 的非零 tile 区域 + H5 各 NT（修正格式）
const fs = require('fs');
function pad(n) { return n.toString(16).padStart(2, '0'); }

// ---- emu frame-030 ----
const emuNT = JSON.parse(fs.readFileSync('output/emu-reference/frame-030/nt.json', 'utf8'));
for (let nt = 0; nt < 4; nt++) {
  const t = emuNT[nt];
  if (!t) { console.log('emu nt' + nt + ': MISSING'); continue; }
  const tiles = t.tile, attrs = t.attr;
  let nz = 0; let minY = 99, maxY = -1, minX = 99, maxX = -1;
  const rows = {};
  for (let i = 0; i < 960; i++) {
    if (tiles[i]) {
      nz++;
      const y = Math.floor(i / 32), x = i % 32;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (!rows[y]) rows[y] = [];
      rows[y].push(x + ':' + pad(tiles[i]) + (attrs && attrs[i] ? '/' + pad(attrs[i]) : ''));
    }
  }
  console.log('emu nt' + nt + ': nz=' + nz + ' y[' + minY + '-' + maxY + '] x[' + minX + '-' + maxX + ']');
  const ys = Object.keys(rows).map(Number).sort((a, b) => a - b);
  for (const y of ys) console.log('  y' + y + ': ' + rows[y].join(' '));
}

// ---- H5 ----
const { HeadlessRuntime } = require('./dist-cjs/game/runtime/HeadlessRuntime');
const { Tsubasa2 } = require('./dist-cjs/game/index');
const r = new HeadlessRuntime();
const g = new Tsubasa2();
g.boot(r);
for (let f = 0; f < 21; f++) r.frame(g);
console.log('--- H5 frame 20 ---');
for (let nt = 0; nt < 4; nt++) {
  const t = r.ppu.nameTable[nt];
  if (!t) { console.log('H5 nt' + nt + ': MISSING'); continue; }
  let nz = 0; let minY = 99, maxY = -1, minX = 99, maxX = -1;
  const rows = {};
  for (let i = 0; i < 960; i++) {
    const v = t[i];
    const tv = typeof v === 'object' ? v.tile : v;
    if (tv) {
      nz++;
      const y = Math.floor(i / 32), x = i % 32;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (!rows[y]) rows[y] = [];
      rows[y].push(x + ':' + pad(tv));
    }
  }
  console.log('H5 nt' + nt + ': nz=' + nz + ' y[' + minY + '-' + maxY + '] x[' + minX + '-' + maxX + ']');
  const ys = Object.keys(rows).map(Number).sort((a, b) => a - b);
  for (const y of ys) console.log('  y' + y + ': ' + rows[y].join(' '));
}
