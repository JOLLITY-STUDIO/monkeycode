/**
 * 渲染 CHR Bank 00 全部 512 tiles 为 16 列精灵图
 * 用法: node _render_chr_bank0.cjs
 */
const fs = require('fs');
const path = require('path');

// ── 读取 CHR BANK 00 ──
const raw = fs.readFileSync(path.join(__dirname, 'rom-data', 'chr-bank-00.ts'), 'utf-8');
const m = raw.match(/\[\s*([\s\S]*?)\s*\];/);
if (!m) throw new Error('parse error');
const CHR = m[1].split(',').map(s => parseInt(s.trim(), 16)).filter(b => !isNaN(b));
if (CHR.length > 8192) CHR.length = 8192;

const TOTAL_TILES = CHR.length / 16; // 512
const COLS = 16;
const ROWS = Math.ceil(TOTAL_TILES / COLS); // 32
const TILE_W = 8, TILE_H = 8, GAP = 1, SCALE = 3;

const imgW = COLS * TILE_W + (COLS + 1) * GAP;
const imgH = ROWS * TILE_H + (ROWS + 1) * GAP;

// 像素缓冲区
const pixels = Array.from({ length: imgH }, () => new Array(imgW).fill(0));

function renderTile(tileId, px, py) {
  const off = tileId * 16;
  for (let y = 0; y < 8; y++) {
    const p0 = CHR[off + y];
    const p1 = CHR[off + 8 + y];
    for (let x = 0; x < 8; x++) {
      const mask = 0x80 >> x;
      pixels[py + y][px + x] = ((p0 & mask) ? 1 : 0) | ((p1 & mask) ? 2 : 0);
    }
  }
}

for (let i = 0; i < TOTAL_TILES; i++) {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  renderTile(i, col * TILE_W + (col + 1) * GAP, row * TILE_H + (row + 1) * GAP);
}

// ── 写 BMP ──
function writeBMP(pix, w, h, scale, filepath) {
  const sw = w * scale, sh = h * scale;
  const rowBytes = Math.ceil(sw * 3 / 4) * 4;
  const dataSize = rowBytes * sh;
  const buf = Buffer.alloc(54 + dataSize, 0);

  buf.write('BM', 0);
  buf.writeUInt32LE(54 + dataSize, 2);
  buf.writeUInt32LE(54, 10);
  buf.writeUInt32LE(40, 14);
  buf.writeInt32LE(sw, 18);
  buf.writeInt32LE(-sh, 22);
  buf.writeUInt16LE(1, 26);
  buf.writeUInt16LE(24, 28);
  buf.writeUInt32LE(dataSize, 34);

  const pal = [[0,0,0],[100,100,100],[180,180,180],[255,255,255]];
  for (let y = 0; y < sh; y++) {
    const sy = Math.floor(y / scale);
    const rowOff = 54 + y * rowBytes;
    for (let x = 0; x < sw; x++) {
      const sx = Math.floor(x / scale);
      const [r, g, b] = pal[pix[sy][sx]];
      const off = rowOff + x * 3;
      buf[off] = b; buf[off+1] = g; buf[off+2] = r;
    }
  }
  fs.writeFileSync(filepath, buf);
}

const outDir = path.join(__dirname, 'temp', 'chr_bank0');
fs.mkdirSync(outDir, { recursive: true });

const bmpPath = path.join(outDir, 'chr_bank_00_16col.bmp');
writeBMP(pixels, imgW, imgH, SCALE, bmpPath);
console.log(`已保存: ${bmpPath}`);
console.log(`布局: ${COLS}列 × ${ROWS}行, 共${TOTAL_TILES}个tile`);
console.log(`Tile 0x00 = 第1行第1列, Tile 0x01 = 第2列, ... Tile 0x0F = 第16列`);
console.log(`Tile 0x10 = 第2行第1列, ... 以此类推`);
