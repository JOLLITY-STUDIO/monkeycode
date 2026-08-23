const path = require('path');
const fs = require('fs');
const ts = require(path.resolve(__dirname, '../_tmp_out/game/index.js'));
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));
const NES = tsnes.NES;
const nes = new NES();
nes.loadROM(fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes')));
const game = new ts.default(nes);
game.boot();
for (let i = 0; i < 90; i++) game.frame(nes);
const ppu = nes.ppu;
const W = 256, H = 240;
// 非零像素行分布 (每 8 像素行一组)
const rows = new Array(H / 8).fill(0);
const cols = new Array(W / 8).fill(0);
let minY = 999, maxY = -1, minX = 999, maxX = -1;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (ppu.buffer[y * W + x] !== 0) {
      rows[y >> 3]++;
      cols[x >> 3]++;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
    }
  }
}
const log = [];
log.push(`bbox: x[${minX},${maxX}] y[${minY},${maxY}]`);
log.push('row(8px) nonZero: ' + rows.map((v, i) => v ? `${i}:${v}` : '.').join(' '));
log.push('col(8px) nonZero: ' + cols.map((v, i) => v ? `${i}:${v}` : '.').join(' '));
// 颜色分布
const colors = new Map();
for (let i = 0; i < ppu.buffer.length; i++) {
  const c = ppu.buffer[i];
  if (c !== 0) colors.set(c, (colors.get(c) || 0) + 1);
}
log.push('colors: ' + Array.from(colors.entries()).map(([c, n]) => `#${c.toString(16).padStart(6, '0')}(${n})`).join(' '));
// ASCII 粗览: 每 4px 块是否有内容
log.push('--- 4px grid (≈) ---');
for (let y = 0; y < H; y += 4) {
  let line = '';
  for (let x = 0; x < W; x += 4) {
    let has = false;
    for (let dy = 0; dy < 4 && !has; dy++) {
      for (let dx = 0; dx < 4; dx++) {
        if (ppu.buffer[(y + dy) * W + x + dx] !== 0) { has = true; break; }
      }
    }
    line += has ? '#' : '.';
  }
  log.push(line);
}
console.log(log.join('\n'));
