// 直接对比 H5 buffer vs emu PNG 的 y14-20 x0-20 每个像素
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
const h5buf = runtime.ppu.buffer;

const emu = decodePng('output/emu-full/frame-0800/screen.png');
const lines = [];
for (let y = 14; y <= 20; y++) {
  let s = 'y' + y + ': ';
  for (let x = 0; x < 20; x++) {
    const p = y * emu.w * emu.bpp + x * emu.bpp;
    const ev = (emu.data[p] << 16) | (emu.data[p + 1] << 8) | emu.data[p + 2];
    const hv = h5buf[y * 256 + x] & 0xffffff;
    const m = ev === hv ? '=' : ev === 0 ? 'E' : hv === 0 ? 'H' : 'X';
    s += m;
  }
  lines.push(s);
  s = '  E: ';
  for (let x = 0; x < 20; x++) {
    const p = y * emu.w * emu.bpp + x * emu.bpp;
    const ev = (emu.data[p] << 16) | (emu.data[p + 1] << 8) | emu.data[p + 2];
    s += (ev === 0 ? '.' : ev.toString(16).slice(0, 4)) + ' ';
  }
  lines.push(s);
  s = '  H: ';
  for (let x = 0; x < 20; x++) {
    const hv = h5buf[y * 256 + x] & 0xffffff;
    s += (hv === 0 ? '.' : hv.toString(16).slice(0, 4)) + ' ';
  }
  lines.push(s);
}
// 统计 y17 整行 diff
let d17 = 0;
for (let x = 0; x < 256; x++) {
  const p = 17 * emu.w * emu.bpp + x * emu.bpp;
  const ev = (emu.data[p] << 16) | (emu.data[p + 1] << 8) | emu.data[p + 2];
  if (ev !== (h5buf[17 * 256 + x] & 0xffffff)) d17++;
}
lines.push('y17 total diff = ' + d17);
fs.writeFileSync('_diag_xy_out.txt', lines.join('\n'));
console.log('done');
