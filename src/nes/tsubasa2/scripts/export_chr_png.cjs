// 把 chr-bank-00 的关键 tile + 双 tile 渲染成 PNG 图片供肉眼验证
// 生成: tile $00-$5F 单 tile 图 + 双 tile $A0-$D1 上下拼接图
const fs = require('fs');

// 手写最小 BMP 写入 (24bit, 无外部依赖)
function writeBmp(filename, width, height, pixels) {
  // pixels: height 行, 每行 width 个 [r,g,b]
  const rowSize = Math.floor((width * 3 + 3) / 4) * 4;
  const dataSize = rowSize * height;
  const fileSize = 54 + dataSize;
  const buf = Buffer.alloc(fileSize);
  // BMP header
  buf.write('BM', 0);
  buf.writeUInt32LE(fileSize, 2);
  buf.writeUInt32LE(54, 10); // offset to pixel data
  buf.writeUInt32LE(40, 14); // DIB header size
  buf.writeInt32LE(width, 18);
  buf.writeInt32LE(-height, 22); // 负数=从上到下 (top-down), 避免图像倒置
  buf.writeUInt16LE(1, 26); // planes
  buf.writeUInt16LE(24, 28); // bpp
  // pixel data (top-down: 第0行在最上)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const [r, g, b] = pixels[y][x];
      const off = 54 + y * rowSize + x * 3;
      buf[off] = b; buf[off + 1] = g; buf[off + 2] = r;
    }
  }
  fs.writeFileSync(filename, buf);
}

function loadChr(path) {
  const src = fs.readFileSync(path, 'utf8');
  const m = src.match(/=\s*\[([\s\S]*?)\]/);
  return m[1].split(',').map(s => s.trim()).filter(s => /^0x/.test(s)).map(s => parseInt(s, 16));
}

function renderTile(chr, tileIdx) {
  // NES tile: 16 bytes, 8x8, 2bpp
  const base = tileIdx * 16;
  const rows = [];
  for (let y = 0; y < 8; y++) {
    const p0 = chr[base + y] || 0;
    const p1 = chr[base + 8 + y] || 0;
    const row = [];
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      const v = ((p1 >> bit) & 1) << 1 | ((p0 >> bit) & 1);
      // 0=白 1=浅灰 2=深灰 3=黑
      const colors = [[255,255,255],[192,192,192],[64,64,64],[0,0,0]];
      row.push(colors[v]);
    }
    rows.push(row);
  }
  return rows;
}

const chr = loadChr('d:/studio/github/monkeycode/src/nes/tsubasa2/src/game/data/chr/chr-bank-00.ts');

// === 图1: 单 tile $00-$1F (ア-ト 等) ===
// 8x8 tile, 排成 4列×8行 = 32 tile, 每个 tile 间留 1px 间隔
// 总宽: 4*8 + 5*1 = 37, 总高: 8*8 + 9*1 = 73
{
  const cols = 4, rowsCount = 8;
  const tw = 8, th = 8, gap = 1;
  const W = cols * tw + (cols + 1) * gap;
  const H = rowsCount * th + (rowsCount + 1) * gap;
  const pix = [];
  for (let y = 0; y < H; y++) { pix.push([]); for (let x = 0; x < W; x++) pix[y].push([255,255,255]); }
  for (let t = 0; t < 32; t++) {
    const tc = t % cols, tr = Math.floor(t / cols);
    const tile = renderTile(chr, t);
    const ox = gap + tc * (tw + gap);
    const oy = gap + tr * (th + gap);
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) pix[oy+y][ox+x] = tile[y][x];
  }
  writeBmp('d:/studio/github/monkeycode/src/nes/tsubasa2/output/chr00_tiles_00_1f.bmp', W, H, pix);
  console.log('生成 chr00_tiles_00_1f.bmp (tile $00-$1F)');
}

// === 图2: 单 tile $20-$5E (符号/英文/假名) ===
// 排成 8列×8行 = 64 tile
{
  const cols = 8, rowsCount = 8;
  const tw = 8, th = 8, gap = 1;
  const W = cols * tw + (cols + 1) * gap;
  const H = rowsCount * th + (rowsCount + 1) * gap;
  const pix = [];
  for (let y = 0; y < H; y++) { pix.push([]); for (let x = 0; x < W; x++) pix[y].push([255,255,255]); }
  for (let t = 0; t < 64; t++) {
    const tc = t % cols, tr = Math.floor(t / cols);
    const tile = renderTile(chr, 0x20 + t);
    const ox = gap + tc * (tw + gap);
    const oy = gap + tr * (th + gap);
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) pix[oy+y][ox+x] = tile[y][x];
  }
  writeBmp('d:/studio/github/monkeycode/src/nes/tsubasa2/output/chr00_tiles_20_5f.bmp', W, H, pix);
  console.log('生成 chr00_tiles_20_5f.bmp (tile $20-$5F)');
}

// === 图3: 双 tile $A0-$D1 (浊点+基础假名 上下拼接) ===
// 16行高 (8 浊点 + 8 假名), 排成 10列×5行 = 50 双 tile
const DOUBLE = {
  0xA0: [0x94, 0x06], 0xA1: [0x94, 0x07], 0xA2: [0x94, 0x08], 0xA3: [0x94, 0x09],
  0xA4: [0x94, 0x0A], 0xA5: [0x94, 0x0B], 0xA6: [0x94, 0x0C], 0xA7: [0x94, 0x0D],
  0xA8: [0x94, 0x0E], 0xA9: [0x94, 0x0F], 0xAA: [0x94, 0x10], 0xAB: [0x94, 0x11],
  0xAC: [0x94, 0x12], 0xAD: [0x94, 0x13], 0xAE: [0x94, 0x14], 0xAF: [0x94, 0x1A],
  0xB0: [0x94, 0x1B], 0xB1: [0x94, 0x1C], 0xB2: [0x94, 0x1D], 0xB3: [0x94, 0x1E],
  0xB4: [0x94, 0x46], 0xB5: [0x94, 0x47], 0xB6: [0x94, 0x48], 0xB7: [0x94, 0x49],
  0xB8: [0x94, 0x4A], 0xB9: [0x94, 0x4B], 0xBA: [0x94, 0x4C], 0xBB: [0x94, 0x4D],
  0xBC: [0x94, 0x4E], 0xBD: [0x94, 0x4F], 0xBE: [0x94, 0x50], 0xBF: [0x94, 0x51],
  0xC0: [0x94, 0x52], 0xC1: [0x94, 0x53], 0xC2: [0x94, 0x54], 0xC3: [0x94, 0x5A],
  0xC4: [0x94, 0x5B], 0xC5: [0x94, 0x5C], 0xC6: [0x94, 0x5D], 0xC7: [0x94, 0x5E],
  0xC8: [0x95, 0x1A], 0xC9: [0x95, 0x1B], 0xCA: [0x95, 0x1C], 0xCB: [0x95, 0x1D],
  0xCC: [0x95, 0x1E], 0xCD: [0x95, 0x5A], 0xCE: [0x95, 0x5B], 0xCF: [0x95, 0x5C],
  0xD0: [0x95, 0x5D], 0xD1: [0x95, 0x5E],
};
{
  const cols = 10, rowsCount = 5;
  const tw = 8, th = 16, gap = 2;
  const W = cols * tw + (cols + 1) * gap;
  const H = rowsCount * th + (rowsCount + 1) * gap;
  const pix = [];
  for (let y = 0; y < H; y++) { pix.push([]); for (let x = 0; x < W; x++) pix[y].push([255,255,255]); }
  const codes = Object.keys(DOUBLE).map(Number);
  for (let i = 0; i < codes.length; i++) {
    const code = codes[i];
    const [hi, lo] = DOUBLE[code];
    const tc = i % cols, tr = Math.floor(i / cols);
    const hiTile = renderTile(chr, hi);
    const loTile = renderTile(chr, lo);
    const ox = gap + tc * (tw + gap);
    const oy = gap + tr * (th + gap);
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) pix[oy+y][ox+x] = hiTile[y][x];
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) pix[oy+8+y][ox+x] = loTile[y][x];
  }
  writeBmp('d:/studio/github/monkeycode/src/nes/tsubasa2/output/double_tile_A0_D1.bmp', W, H, pix);
  console.log('生成 double_tile_A0_D1.bmp (双 tile $A0-$D1, 上下拼接)');
}

console.log('\n图片输出到 output/ 目录, 请用图片查看器打开验证');
