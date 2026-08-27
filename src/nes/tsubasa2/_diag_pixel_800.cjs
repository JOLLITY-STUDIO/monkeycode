// 对比 H5 nes=800 渲染 buffer 与 emu frame-0800 screen.png 的像素差异
const fs = require('fs');
const zlib = require('zlib');
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');

// 解码 PNG → RGBA buffer
function decodePng(file) {
  const buf = fs.readFileSync(file);
  // 找 IDAT
  let pos = 8;
  let idat = Buffer.alloc(0);
  let w = 0, h = 0, bitDepth = 0, colorType = 0;
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.slice(pos + 8, pos + 8 + len);
    if (type === 'IHDR') {
      w = data.readUInt32BE(0); h = data.readUInt32BE(4);
      bitDepth = data[8]; colorType = data[9];
    } else if (type === 'IDAT') {
      idat = Buffer.concat([idat, data]);
    } else if (type === 'IEND') break;
    pos += 12 + len;
  }
  const raw = zlib.inflateSync(idat);
  // 支持 colorType 2 (RGB) 和 6 (RGBA)
  const bpp = colorType === 6 ? 4 : 3;
  const stride = w * bpp;
  const px = new Uint8Array(w * h * 4);
  for (let y = 0; y < h; y++) {
    const filter = raw[y * (stride + 1)];
    const row = y * (stride + 1) + 1;
    const prev = (y - 1) * (stride + 1) + 1;
    for (let x = 0; x < stride; x++) {
      let v = raw[row + x];
      const a = x >= bpp ? raw[row + x - bpp] : 0;
      const b = y > 0 ? raw[prev + x] : 0;
      const c = (x >= bpp && y > 0) ? raw[prev + x - bpp] : 0;
      if (filter === 1) v = (v + a) & 0xff;
      else if (filter === 2) v = (v + b) & 0xff;
      else if (filter === 3) v = (v + ((a + b) >> 1)) & 0xff;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        const pr = (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
        v = (v + pr) & 0xff;
      }
      raw[row + x] = v;
    }
    for (let x = 0; x < w; x++) {
      const si = row + x * bpp;
      px[(y * w + x) * 4 + 0] = raw[si + 0];
      px[(y * w + x) * 4 + 1] = raw[si + 1];
      px[(y * w + x) * 4 + 2] = raw[si + 2];
      px[(y * w + x) * 4 + 3] = colorType === 6 ? raw[si + 3] : 0xff;
    }
  }
  return { w, h, px };
}

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;

for (let h5 = 0; h5 <= 790; h5++) game.frame(runtime);

// H5 buffer: Uint32Array 0x00RRGGBB
const h5buf = runtime.ppu.buffer;
const out = [];

// emu
const emu = decodePng('output/emu-full/frame-0800/screen.png');
out.push('emu size: ' + emu.w + 'x' + emu.h + '  H5 buffer len: ' + h5buf.length);

// 统计差异
let diff = 0;
const diffRows = new Array(240).fill(0);
const samples = [];
for (let y = 0; y < 240; y++) {
  for (let x = 0; x < 256; x++) {
    const e = (y * 256 + x) * 4;
    const er = emu.px[e], eg = emu.px[e + 1], eb = emu.px[e + 2];
    const h5 = h5buf[y * 256 + x];
    const hr = (h5 >> 16) & 0xff, hg = (h5 >> 8) & 0xff, hb = h5 & 0xff;
    if (er !== hr || eg !== hg || eb !== hb) {
      diff++;
      diffRows[y]++;
      if (samples.length < 200) samples.push({ x, y, emu: [er, eg, eb], h5: [hr, hg, hb] });
    }
  }
}
out.push('diff pixels: ' + diff + ' / ' + 256 * 240);
out.push('--- 差异行分布 (y: count) ---');
let rowList = [];
for (let y = 0; y < 240; y++) if (diffRows[y] > 0) rowList.push(y + ':' + diffRows[y]);
out.push(rowList.join(' '));
out.push('--- 前 50 差异样本 ---');
for (const s of samples.slice(0, 50)) {
  out.push('(' + s.x + ',' + s.y + ') emu=' + s.emu.join('/') + ' h5=' + s.h5.join('/'));
}
fs.writeFileSync('_diag_pixel_800_out.txt', out.join('\n'), 'utf8');
console.log('done');
