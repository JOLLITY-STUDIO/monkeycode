// 临时:H5 f2 buffer 输出 ASCII 概览 + 与 emu screen 对比
const { HeadlessRuntime } = require('./dist-cjs/game/runtime/HeadlessRuntime');
const { Tsubasa2 } = require('./dist-cjs/game/index');
const fs = require('fs');

const rt = new HeadlessRuntime();
const g = new Tsubasa2();
g.boot(rt);
for (let f = 0; f < 3; f++) rt.frame(g);
const ppu = rt.ppu;
const buf = ppu.buffer;

// ASCII 4x4 downsample (240x256 → 60x64)
function ascii(buf, w, h) {
  let out = '';
  for (let y = 0; y < h; y += 4) {
    let row = '';
    for (let x = 0; x < w; x += 4) {
      let nz = 0;
      for (let dy = 0; dy < 4; dy++) {
        for (let dx = 0; dx < 4; dx++) {
          const idx = (y + dy) * w + (x + dx);
          if (idx < buf.length && buf[idx]) nz++;
        }
      }
      row += nz === 0 ? '.' : (nz >= 8 ? '#' : (nz >= 3 ? '+' : ':'));
    }
    out += row + '\n';
  }
  return out;
}
const a = ascii(buf, 256, 240);
console.log('=== H5 f2 buffer (4x4 downsampled) ===');
console.log(a);

// 每行非零像素计数
console.log('=== H5 f2 row nonzero counts (per 8px band) ===');
for (let y = 0; y < 240; y += 8) {
  let n = 0;
  for (let i = y * 256; i < (y + 8) * 256 && i < buf.length; i++) if (buf[i]) n++;
  if (n) console.log('y=' + y + '..' + (y + 7) + ': ' + n);
}
