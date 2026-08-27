// 检查 emu f710 vs H5 f710 顶部 y0-12 全宽像素(找 1px 垂直偏移来源)
const fs = require('fs');
const zlib = require('zlib');
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');

function decodePng(file) {
  const buf = fs.readFileSync(file);
  let off = 8, width = 0, height = 0, colorType = 0;
  const idat = [];
  while (off < buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString('ascii', off + 4, off + 8);
    const data = buf.slice(off + 8, off + 8 + len);
    if (type === 'IHDR') { width = data.readUInt32BE(0); height = data.readUInt32BE(4); colorType = data[9]; }
    else if (type === 'IDAT') idat.push(data);
    else if (type === 'IEND') break;
    off += 12 + len;
  }
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const bpp = colorType === 6 ? 4 : colorType === 2 ? 3 : 1;
  const realStride = width * bpp;
  const px = Buffer.alloc(width * height * 3);
  let pos = 0;
  let prev = Buffer.alloc(realStride);
  for (let y = 0; y < height; y++) {
    const filter = raw[pos++];
    const line = Buffer.alloc(realStride);
    for (let x = 0; x < realStride; x++) {
      const cur = raw[pos];
      const a = x >= bpp ? line[x - bpp] : 0;
      const b = prev[x];
      const c = x >= bpp ? prev[x - bpp] : 0;
      let v;
      switch (filter) {
        case 0: v = cur; break;
        case 1: v = (cur + a) & 0xff; break;
        case 2: v = (cur + b) & 0xff; break;
        case 3: v = (cur + ((a + b) >> 1)) & 0xff; break;
        case 4: { const p = a + b - c; const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c); v = (cur + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 0xff; break; }
        default: v = cur;
      }
      line[x] = v; pos++;
    }
    prev = line;
    for (let x = 0; x < width; x++) {
      px[(y * width + x) * 3 + 0] = line[x * bpp + 0];
      px[(y * width + x) * 3 + 1] = line[x * bpp + 1];
      px[(y * width + x) * 3 + 2] = line[x * bpp + 2];
    }
  }
  return { width, height, px };
}

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;
for (let h5 = 0; h5 <= 700; h5++) game.frame(runtime);
const h5 = runtime.ppu.buffer;

const emu = decodePng('output/emu-full/frame-0710/screen.png');

function luma(px, x, y, w) { const i = (y * w + x) * 3; return Math.round(0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]); }
function h5luma(b, x, y) { const v = b[y * 256 + x]; return Math.round(0.299 * ((v >> 16) & 0xff) + 0.587 * ((v >> 8) & 0xff) + 0.114 * (v & 0xff)); }

const out = [];
out.push('=== emu 顶部 y0-12 (每行 0-255, 每4列采样) ===');
for (let y = 0; y < 13; y++) {
  let line = '';
  for (let x = 0; x < 256; x += 4) {
    const v = luma(emu.px, x, y, emu.width);
    line += v > 180 ? '#' : v > 90 ? '+' : v > 30 ? '.' : ' ';
  }
  out.push(String(y).padStart(3) + '|' + line);
}
out.push('');
out.push('=== H5 顶部 y0-12 ===');
for (let y = 0; y < 13; y++) {
  let line = '';
  for (let x = 0; x < 256; x += 4) {
    const v = h5luma(h5, x, y);
    line += v > 180 ? '#' : v > 90 ? '+' : v > 30 ? '.' : ' ';
  }
  out.push(String(y).padStart(3) + '|' + line);
}
out.push('');
out.push('=== emu 底部 y228-239 ===');
for (let y = 228; y < 240; y++) {
  let line = '';
  for (let x = 0; x < 256; x += 4) {
    const v = luma(emu.px, x, y, emu.width);
    line += v > 180 ? '#' : v > 90 ? '+' : v > 30 ? '.' : ' ';
  }
  out.push(String(y).padStart(3) + '|' + line);
}
out.push('');
out.push('=== H5 底部 y228-239 ===');
for (let y = 228; y < 240; y++) {
  let line = '';
  for (let x = 0; x < 256; x += 4) {
    const v = h5luma(h5, x, y);
    line += v > 180 ? '#' : v > 90 ? '+' : v > 30 ? '.' : ' ';
  }
  out.push(String(y).padStart(3) + '|' + line);
}
fs.writeFileSync('_cmp_top_bottom.txt', out.join('\n'), 'utf8');
console.log('written');
