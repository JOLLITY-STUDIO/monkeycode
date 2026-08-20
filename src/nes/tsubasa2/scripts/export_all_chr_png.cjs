// 批量导出全部 16 个 CHR bank 的 tile 为 BMP 图片
const fs = require('fs');
const path = require('path');

function writeBmp(filename, width, height, pixels) {
  const rowSize = Math.floor((width * 3 + 3) / 4) * 4;
  const dataSize = rowSize * height;
  const fileSize = 54 + dataSize;
  const buf = Buffer.alloc(fileSize);
  buf.write('BM', 0);
  buf.writeUInt32LE(fileSize, 2);
  buf.writeUInt32LE(54, 10);
  buf.writeUInt32LE(40, 14);
  buf.writeInt32LE(width, 18);
  buf.writeInt32LE(-height, 22); // top-down
  buf.writeUInt16LE(1, 26);
  buf.writeUInt16LE(24, 28);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const [r, g, b] = pixels[y][x];
      const off = 54 + y * rowSize + x * 3;
      buf[off] = b; buf[off + 1] = g; buf[off + 2] = r;
    }
  }
  fs.writeFileSync(filename, buf);
}

function loadChr(p) {
  const src = fs.readFileSync(p, 'utf8');
  const m = src.match(/=\s*\[([\s\S]*?)\]/);
  return m[1].split(',').map(s => s.trim()).filter(s => /^0x/.test(s)).map(s => parseInt(s, 16));
}

function renderTile(chr, tileIdx) {
  const base = tileIdx * 16;
  const rows = [];
  for (let y = 0; y < 8; y++) {
    const p0 = chr[base + y] || 0;
    const p1 = chr[base + 8 + y] || 0;
    const row = [];
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      const v = ((p1 >> bit) & 1) << 1 | ((p0 >> bit) & 1);
      const colors = [[255,255,255],[192,192,192],[64,64,64],[0,0,0]];
      row.push(colors[v]);
    }
    rows.push(row);
  }
  return rows;
}

const chrDir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/data/chr';
const outDir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/output/chr';

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// 每个 CHR bank 8KB = 512 tile, 排成 32列×16行
for (let b = 0; b < 16; b++) {
  const id = b.toString().padStart(2, '0');
  const chrPath = path.join(chrDir, `chr-bank-${id}.ts`);
  if (!fs.existsSync(chrPath)) { console.log(`bank ${id}: 文件不存在, 跳过`); continue; }
  const chr = loadChr(chrPath);
  if (chr.length < 512 * 16) { console.log(`bank ${id}: 数据不足 ${chr.length}B, 跳过`); continue; }

  const cols = 32, rowsCount = 16;
  const tw = 8, th = 8, gap = 1;
  const W = cols * tw + (cols + 1) * gap;
  const H = rowsCount * th + (rowsCount + 1) * gap;
  const pix = [];
  for (let y = 0; y < H; y++) { pix.push([]); for (let x = 0; x < W; x++) pix[y].push([255,255,255]); }

  for (let t = 0; t < 256; t++) {  // pattern table 0: tile $00-$FF
    const tc = t % cols, tr = Math.floor(t / cols);
    const tile = renderTile(chr, t);
    const ox = gap + tc * (tw + gap);
    const oy = gap + tr * (th + gap);
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) pix[oy+y][ox+x] = tile[y][x];
  }

  const outPath = path.join(outDir, `chr-bank-${id}_pt0.bmp`);
  writeBmp(outPath, W, H, pix);
  console.log(`bank ${id}: pattern table 0 → ${outPath} (${W}x${H})`);
}

console.log('\n全部 CHR bank pattern table 0 已导出到 output/chr/');
console.log('每张图含 256 个 8x8 tile, 排成 32列×16行');
