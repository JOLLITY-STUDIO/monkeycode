// H5 frame N vs emu f710 screen.png 逐像素精确匹配率，找最佳对齐
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

const emu = decodePng('output/emu-full/frame-0710/screen.png');
const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;
// 先跑到 690
for (let i = 0; i < 690; i++) game.frame(runtime);
const frames = [];
for (let n = 690; n <= 715; n++) {
  game.frame(runtime);
  const h5 = runtime.ppu.buffer;
  let same = 0, total = 0, near = 0;
  for (let i = 0; i < 256 * 240; i++) {
    const er = emu.px[i * 3], eg = emu.px[i * 3 + 1], eb = emu.px[i * 3 + 2];
    const h = h5[i];
    const hr = (h >> 16) & 0xff, hg = (h >> 8) & 0xff, hb = h & 0xff;
    total++;
    if (er === hr && eg === hg && eb === hb) same++;
    else if (Math.abs(er - hr) <= 8 && Math.abs(eg - hg) <= 8 && Math.abs(eb - hb) <= 8) near++;
  }
  frames.push(`H5帧${n}: 精确匹配 ${(same / total * 100).toFixed(2)}% (${same}/${total}), 容差8 ${(near / total * 100).toFixed(2)}%`);
  console.log(frames[frames.length - 1]);
}
fs.writeFileSync('_cmp_px710_out.txt', frames.join('\n'), 'utf8');
