// 找 emu f710 与 H5 f710 的第一/最后非空行,确认 1px 偏移来源
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

function rowHasContent(px, y, w) {
  for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 3;
    const v = 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];
    if (v > 12) return true;
  }
  return false;
}
function h5RowHasContent(b, y) {
  for (let x = 0; x < 256; x++) {
    const v = b[y * 256 + x];
    if (0.299 * ((v >> 16) & 0xff) + 0.587 * ((v >> 8) & 0xff) + 0.114 * (v & 0xff) > 12) return true;
  }
  return false;
}

const out = [];
let eFirst = -1, eLast = -1, hFirst = -1, hLast = -1;
for (let y = 0; y < 240; y++) {
  const e = rowHasContent(emu.px, y, emu.width);
  const h = h5RowHasContent(h5, y);
  if (e && eFirst < 0) eFirst = y;
  if (e) eLast = y;
  if (h && hFirst < 0) hFirst = y;
  if (h) hLast = y;
}
out.push(`emu  first content row=${eFirst} last=${eLast}`);
out.push(`H5   first content row=${hFirst} last=${hLast}`);
out.push(`diff: emu first - H5 first = ${eFirst - hFirst}, emu last - H5 last = ${eLast - hLast}`);

// 逐行比较 x=0..255: 每行有多少像素 emu 有内容而 H5 对应行(y-1)也有(检查 1px 平移假设)
let match1 = 0, match0 = 0, total = 0;
for (let y = 0; y < 240; y++) {
  for (let x = 0; x < 256; x++) {
    const i = (y * 256 + x) * 3;
    const ev = 0.299 * emu.px[i] + 0.587 * emu.px[i + 1] + 0.114 * emu.px[i + 2];
    if (ev <= 12) continue;
    total++;
    // H5 同 y 是否接近
    const hv = h5[y * 256 + x];
    const hLuma = 0.299 * ((hv >> 16) & 0xff) + 0.587 * ((hv >> 8) & 0xff) + 0.114 * (hv & 0xff);
    if (Math.abs(ev - hLuma) <= 8) match0++;
    // H5 y-1 是否接近
    if (y > 0) {
      const hv2 = h5[(y - 1) * 256 + x];
      const hLuma2 = 0.299 * ((hv2 >> 16) & 0xff) + 0.587 * ((hv2 >> 8) & 0xff) + 0.114 * (hv2 & 0xff);
      if (Math.abs(ev - hLuma2) <= 8) match1++;
    }
  }
}
out.push(`内容像素总数=${total} 匹配同y=${match0}(${(match0 / total * 100).toFixed(1)}%) 匹配y-1=${match1}(${(match1 / total * 100).toFixed(1)}%)`);
fs.writeFileSync('_cmp_first_content.txt', out.join('\n'), 'utf8');
console.log(out.join('\n'));
