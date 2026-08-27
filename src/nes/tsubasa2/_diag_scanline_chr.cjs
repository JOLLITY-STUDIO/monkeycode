// 综合诊断：f790(NES 800) 渲染期间每个 scanline 的 chrSlots + H5 buffer 与 emu PNG 逐行对比
const fs = require('fs');
const zlib = require('zlib');
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');

function decodePng(file) {
  const buf = fs.readFileSync(file);
  let pos = 8;
  let width = 0, height = 0, bitDepth = 0, colorType = 0;
  const idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.slice(pos + 4, pos + 8).toString('ascii');
    const data = buf.slice(pos + 8, pos + 8 + len);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0); height = data.readUInt32BE(4);
      bitDepth = data[8]; colorType = data[9];
    } else if (type === 'IDAT') {
      idat.push(data);
    } else if (type === 'IEND') break;
    pos += 12 + len;
  }
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const bpp = colorType === 2 ? 3 : colorType === 6 ? 4 : 1;
  const stride = width * bpp;
  const out = Buffer.alloc(height * stride);
  let prev = Buffer.alloc(stride);
  let p = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[p++];
    const line = raw.slice(p, p + stride);
    const cur = out.slice(y * stride, (y + 1) * stride);
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? cur[x - bpp] : 0;
      const b = y > 0 ? prev[x] : 0;
      const c = x >= bpp && y > 0 ? prev[x - bpp] : 0;
      let v = line[x];
      if (filter === 1) v += a;
      else if (filter === 2) v += b;
      else if (filter === 3) v += (a + b) >> 1;
      else if (filter === 4) {
        const pa = Math.abs(b - c), pb = Math.abs(a - c), pc = Math.abs(a + b - 2 * c);
        const pr = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
        v += pr;
      }
      cur[x] = v & 0xff;
    }
    prev = cur;
    p += stride;
  }
  return { width, height, bpp, data: out };
}

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;

// hook per-scanline CHR 应用
const mmap = runtime.ppu.nes.mmap;
const origApply = mmap.onBgRenderScanline.bind(mmap);
const chrLog = [];
mmap.onBgRenderScanline = (scan) => {
  origApply(scan);
  chrLog.push([scan, [...runtime.chrSlots]]);
};

const END = 800 - 10;
for (let h5 = 0; h5 <= END; h5++) {
  game.frame(runtime);
}
// h5=790 是 NES 800
const out = [];
out.push('=== chrSlots per scanline (last frame f790) ===');
const startIdx = Math.max(0, chrLog.length - 260);
for (let i = startIdx; i < chrLog.length; i++) {
  const [scan, slots] = chrLog[i];
  if (scan <= 30 || scan === 153 || scan === 154 || scan === 155 || scan === 239) {
    out.push(`scan=${scan} chr=[${slots.join(',')}]`);
  }
}

out.push('');
out.push('=== NT0 rows 0-4 (H5 ppu.nameTable[0]) ===');
const nt0 = runtime.ppu.nameTable[0];
for (let r = 0; r < 5; r++) {
  const base = r * 32;
  out.push('r' + r + ': ' + Array.from(nt0.tile.slice(base, base + 32)).join(','));
}

// H5 buffer rows -> color ids
const h5buf = runtime.ppu.buffer;
function rowStr(buf, y, w) {
  const seen = {};
  const ids = [];
  for (let x = 0; x < w; x++) {
    const v = buf[y * 256 + x] & 0xffffff;
    if (!(v in seen)) seen[v] = '#' + Object.keys(seen).length;
    ids.push(seen[v] + (v.toString(16).padStart(6, '0')));
  }
  return ids;
}

const emu = decodePng('output/emu-full/frame-0800/screen.png');
out.push('');
out.push('=== H5 buffer rows 0-30 (colorid+hex) ===');
for (let y = 0; y < 31; y++) out.push('H5 y' + y + ': ' + rowStr(h5buf, y, 32).join(' '));
out.push('');
out.push('=== emu PNG rows 0-30 ===');
for (let y = 0; y < 31; y++) {
  const seen = {};
  const ids = [];
  for (let x = 0; x < 32; x++) {
    const p = y * emu.width * emu.bpp + x * emu.bpp;
    const v = (emu.data[p] << 16) | (emu.data[p + 1] << 8) | emu.data[p + 2];
    if (!(v in seen)) seen[v] = '#' + Object.keys(seen).length;
    ids.push(seen[v] + (v.toString(16).padStart(6, '0')));
  }
  out.push('E y' + y + ': ' + ids.join(' '));
}

// 全屏 diff 统计（逐像素）
let diff = 0;
const diffRows = [];
for (let y = 0; y < 240; y++) {
  let rd = 0;
  for (let x = 0; x < 256; x++) {
    const p = y * emu.width * emu.bpp + x * emu.bpp;
    const ev = (emu.data[p] << 16) | (emu.data[p + 1] << 8) | emu.data[p + 2];
    const hv = h5buf[y * 256 + x] & 0xffffff;
    if (ev !== hv) rd++;
  }
  if (rd > 0) diffRows.push(y + ':' + rd);
  diff += rd;
}
out.push('');
out.push('total diff pixels=' + diff);
out.push('diff rows: ' + diffRows.join(' '));

fs.writeFileSync('_diag_scanline_chr_out.txt', out.join('\n'));
console.log('done');
