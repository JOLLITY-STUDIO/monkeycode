// 精确对比 emu 与 H5 的 y0-y30 每行颜色分布
const fs = require('fs');
const zlib = require('zlib');
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');

function decodePng(file) {
  const b = fs.readFileSync(file);
  let pos = 8, w = 0, h = 0, ct = 0, idat = [];
  while (pos < b.length) {
    const len = b.readUInt32BE(pos);
    const t = b.slice(pos + 4, pos + 8).toString();
    const d = b.slice(pos + 8, pos + 8 + len);
    if (t === 'IHDR') { w = d.readUInt32BE(0); h = d.readUInt32BE(4); ct = d[9]; }
    else if (t === 'IDAT') idat.push(d);
    else if (t === 'IEND') break;
    pos += 12 + len;
  }
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const bpp = ct === 2 ? 3 : ct === 6 ? 4 : 1;
  const stride = w * bpp;
  const out = Buffer.alloc(h * stride);
  let prev = Buffer.alloc(stride), p = 0;
  for (let y = 0; y < h; y++) {
    const f = raw[p++];
    const line = raw.slice(p, p + stride);
    const cur = out.slice(y * stride, (y + 1) * stride);
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? cur[x - bpp] : 0;
      const bb = y > 0 ? prev[x] : 0;
      const c = x >= bpp && y > 0 ? prev[x - bpp] : 0;
      let v = line[x];
      if (f === 1) v += a;
      else if (f === 2) v += bb;
      else if (f === 3) v += (a + bb) >> 1;
      else if (f === 4) {
        const pa = Math.abs(bb - c), pb = Math.abs(a - c), pc = Math.abs(a + bb - 2 * c);
        v += (pa <= pb && pa <= pc ? a : pb <= pc ? bb : c);
      }
      cur[x] = v & 0xff;
    }
    prev = cur;
    p += stride;
  }
  return { w, h, bpp, data: out };
}

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;
for (let i = 0; i <= 790; i++) game.frame(runtime);
const h5 = runtime.ppu.buffer;

const emu = decodePng('output/emu-full/frame-0800/screen.png');
const out = [];

function rowColors(buf, w, bpp, y, x0, x1) {
  // 返回每 4 像素一个采样：颜色 hex + 该段主色
  const seg = [];
  for (let x = x0; x < x1; x += 4) {
    const p = y * w * bpp + x * bpp;
    const v = (buf[p] << 16) | (buf[p + 1] << 8) | buf[p + 2];
    seg.push(v === 0 ? 'k' : '#' + v.toString(16).padStart(6, '0'));
  }
  return seg.join(' ');
}

out.push('=== emu y8-y25, x0-63 (每4px采样) ===');
for (let y = 8; y <= 25; y++) {
  out.push(`E y${y}: ${rowColors(emu.data, emu.w, emu.bpp, y, 0, 64)}`);
}
out.push('');
out.push('=== H5 y8-y25, x0-63 ===');
for (let y = 8; y <= 25; y++) {
  out.push(`H y${y}: ${rowColors(h5, 256, 1, y, 0, 64)}`);
}
fs.writeFileSync('_diag_xy2_out.txt', out.join('\n'));
console.log('done');
