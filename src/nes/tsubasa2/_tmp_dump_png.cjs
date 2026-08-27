// 临时：dump H5 f0-f3 的 buffer 到 PNG + 检查 emu 对应帧
const { HeadlessRuntime } = require('./dist-cjs/game/runtime/HeadlessRuntime');
const { Tsubasa2 } = require('./dist-cjs/game/index');
const fs = require('fs');

const rt = new HeadlessRuntime();
const g = new Tsubasa2();
g.boot(rt);
const ppu = rt.ppu;

// PNG encoder (minimal)
function writePng(path, buf, w, h) {
  const fs = require('fs');
  const zlib = require('zlib');
  const raw = Buffer.alloc((w * 3 + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (w * 3 + 1)] = 0;
    for (let x = 0; x < w; x++) {
      const v = buf[y * w + x];
      const r = (v >> 16) & 0xff, gr = (v >> 8) & 0xff, b = v & 0xff;
      const o = y * (w * 3 + 1) + 1 + x * 3;
      raw[o] = r; raw[o + 1] = gr; raw[o + 2] = b;
    }
  }
  const idat = zlib.deflateSync(raw);
  const chunk = (t, d) => {
    const len = Buffer.alloc(4); len.writeUInt32BE(d.length);
    const td = Buffer.concat([Buffer.from(t), d]);
    const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td) >>> 0);
    return Buffer.concat([len, td, crc]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 2; // 8bit RGB
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  fs.writeFileSync(path, Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))]));
}
function crc32(buf) {
  let c, crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = (crc ^ buf[i]) & 0xff;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    crc = (crc >>> 8) ^ c;
  }
  return crc ^ 0xffffffff;
}

for (let f = 0; f < 4; f++) {
  rt.frame(g);
  const buf = ppu.buffer;
  // 找出非零像素区域
  let minX = 999, maxX = -1, minY = 999, maxY = -1, nz = 0;
  const colors = {};
  for (let y = 0; y < 240; y++) {
    for (let x = 0; x < 256; x++) {
      const v = buf[y * 256 + x];
      if (v) {
        nz++;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        colors['#' + v.toString(16)] = (colors['#' + v.toString(16)] || 0) + 1;
      }
    }
  }
  console.log(`f=${f} (NES f${f + 10}) bufNz=${nz} bbox x[${minX}..${maxX}] y[${minY}..${maxY}] colors=${JSON.stringify(colors)}`);
  writePng(`_tmp_h5_f${f}.png`, buf, 256, 240);
}
