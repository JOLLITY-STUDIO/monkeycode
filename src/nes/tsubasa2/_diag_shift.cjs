// 检测 H5 buffer 与 emu PNG 的行偏移对齐：H5[y] 与 emu[y+d] 匹配数
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
const lines = [];
for (let d = -6; d <= 6; d++) {
  let match = 0, total = 0;
  for (let y = 0; y < 240; y++) {
    const ey = y + d;
    if (ey < 0 || ey >= 240) continue;
    for (let x = 0; x < 256; x++) {
      const p = ey * emu.w * emu.bpp + x * emu.bpp;
      const ev = (emu.data[p] << 16) | (emu.data[p + 1] << 8) | emu.data[p + 2];
      if (ev === (h5[y * 256 + x] & 0xffffff)) match++;
      total++;
    }
  }
  lines.push(`d=${d}: match=${match}/${total} (${(100 * match / total).toFixed(2)}%)`);
}
fs.writeFileSync('_diag_shift_out.txt', lines.join('\n'));
console.log('done');
