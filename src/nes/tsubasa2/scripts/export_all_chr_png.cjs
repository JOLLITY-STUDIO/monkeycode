// G5: 导出全部 16 个 CHR bank 为 PNG 图片 (每 bank 2 张: pattern table 0 + 1)
// 每 pattern table 256 tile, 排成 16列×16行, 每 tile 8×8, 带 1px 间隔
// 输出: output/chr-bank-NN-pt0.png / chr-bank-NN-pt1.png
const fs = require('fs');
const path = require('path');

// ── PNG 写入 (手写最小 PNG, 无外部依赖) ──
const zlib = require('zlib');

function writePng(filename, width, height, pixels) {
  // pixels: height 行, 每行 width 个 [r,g,b]
  const rowSize = width * 3 + 1; // RGB + filter byte
  const rawData = Buffer.alloc(rowSize * height);
  for (let y = 0; y < height; y++) {
    rawData[y * rowSize] = 0; // filter: None
    for (let x = 0; x < width; x++) {
      const [r, g, b] = pixels[y][x];
      rawData[y * rowSize + 1 + x * 3] = r;
      rawData[y * rowSize + 1 + x * 3 + 1] = g;
      rawData[y * rowSize + 1 + x * 3 + 2] = b;
    }
  }
  const compressed = zlib.deflateSync(rawData);

  // PNG signature
  const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    // CRC32
    const crcTable = [];
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      }
      crcTable[n] = c;
    }
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < typeBuf.length; i++) crc = crcTable[(crc ^ typeBuf[i]) & 0xFF] ^ (crc >>> 8);
    for (let i = 0; i < data.length; i++) crc = crcTable[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
    crc = (crc ^ 0xFFFFFFFF) >>> 0;
    crcBuf.writeUInt32BE(crc, 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 2;  // color type: RGB
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const png = Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', compressed), chunk('IEND', Buffer.alloc(0))]);
  fs.writeFileSync(filename, png);
}

// ── CHR Bank 加载 ──
function loadChrBank(bankId) {
  const p = `src/game/data/chr/chr-bank-${bankId.toString().padStart(2, '0')}.ts`;
  const src = fs.readFileSync(p, 'utf8');
  const m = src.match(/=\s*\[([\s\S]*?)\]/);
  return m[1].split(',').map(s => s.trim()).filter(s => /^0x/.test(s)).map(s => parseInt(s, 16));
}

// ── NES tile 渲染 (8×8, 2bpp) ──
function renderTile(chr, tileIdx, palette) {
  // palette: [bgColor, color1, color2, color3] — NES 调色板 4 色
  const base = tileIdx * 16;
  const rows = [];
  for (let y = 0; y < 8; y++) {
    const p0 = chr[base + y] || 0;
    const p1 = chr[base + 8 + y] || 0;
    const row = [];
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      const v = ((p1 >> bit) & 1) << 1 | ((p0 >> bit) & 1);
      row.push(palette[v]);
    }
    rows.push(row);
  }
  return rows;
}

// ── 主程序: 导出 16 个 CHR bank ──
const outDir = 'output/chr-png';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// NES 默认调色板 (灰度: 黑/深灰/浅灰/白)
const GRAY_PALETTE = [[0,0,0], [85,85,85], [170,170,170], [255,255,255]];

for (let bank = 0; bank < 16; bank++) {
  const bankId = bank.toString().padStart(2, '0');
  const chr = loadChrBank(bank);
  if (chr.length < 8192) {
    console.log(`bank ${bankId}: 数据不足 ${chr.length}B, 跳过`);
    continue;
  }

  // 每 pattern table 256 tile, 排成 16×16 网格
  const COLS = 16, ROWS = 16;
  const TW = 8, TH = 8, GAP = 1;
  const W = COLS * TW + (COLS + 1) * GAP;
  const H = ROWS * TH + (ROWS + 1) * GAP;

  for (let pt = 0; pt < 2; pt++) {
    const pixels = [];
    for (let y = 0; y < H; y++) {
      pixels.push([]);
      for (let x = 0; x < W; x++) pixels[y].push([255, 255, 255]); // 白底
    }

    for (let t = 0; t < 256; t++) {
      const tc = t % COLS, tr = Math.floor(t / COLS);
      const tile = renderTile(chr, pt * 256 + t, GRAY_PALETTE);
      const ox = GAP + tc * (TW + GAP);
      const oy = GAP + tr * (TH + GAP);
      for (let y = 0; y < 8; y++)
        for (let x = 0; x < 8; x++)
          pixels[oy + y][ox + x] = tile[y][x];
    }

    const outFile = path.join(outDir, `chr-bank-${bankId}-pt${pt}.png`);
    writePng(outFile, W, H, pixels);
  }
  console.log(`bank ${bankId}: 导出 pt0 + pt1 (${chr.length}B)`);
}

console.log(`\n完成: ${outDir}/chr-bank-NN-pt[0|1].png (16 bank × 2 pattern table = 32 张 PNG)`);
