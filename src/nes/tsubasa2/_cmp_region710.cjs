// f710: emu vs H5 像素差异区域分析（找差异集中在哪）
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
for (let i = 0; i < 700; i++) game.frame(runtime);
const h5 = runtime.ppu.buffer;
console.log('H5 f_spPatternTable =', runtime.ppu.f_spPatternTable, 'f_bgPatternTable =', runtime.ppu.f_bgPatternTable);
console.log('emu spTable = 1 (from state.json), bgTable = 0');

// 每 8x8 块统计差异像素数
const blockDiffs = [];
for (let by = 0; by < 30; by++) {
  for (let bx = 0; bx < 32; bx++) {
    let d = 0;
    for (let y = by * 8; y < by * 8 + 8; y++) {
      for (let x = bx * 8; x < bx * 8 + 8; x++) {
        const i = y * 256 + x;
        const er = emu.px[i * 3], eg = emu.px[i * 3 + 1], eb = emu.px[i * 3 + 2];
        const h = h5[i];
        const hr = (h >> 16) & 0xff, hg = (h >> 8) & 0xff, hb = h & 0xff;
        if (er !== hr || eg !== hg || eb !== hb) d++;
      }
    }
    if (d > 0) blockDiffs.push({ by, bx, d });
  }
}
blockDiffs.sort((a, b) => b.d - a.d);
console.log('差异块总数(8x8):', blockDiffs.length, '/ 960');
const rows = new Map();
for (const b of blockDiffs) rows.set(b.by, (rows.get(b.by) || 0) + 1);
console.log('按行块分布 (行:差异块数):', JSON.stringify([...rows.entries()]));
console.log('差异最重 20 块:', blockDiffs.slice(0, 20).map(b => `(${b.bx},${b.by}):${b.d}`).join(' '));
