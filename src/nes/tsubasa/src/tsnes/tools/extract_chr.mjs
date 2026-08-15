/**
 * extract_chr.mjs — 从 NES ROM 提取 CHR 精灵数据
 *
 * 解析 CHR-ROM (2bpp 8×8 tiles)，输出:
 *   1. tsubasa1-h5/src/data/ChrTiles.ts — Base64 编码的原始 CHR + NES 调色板
 *   2. tsubasa1-h5/public/sprites/ 下输出 PNG 精灵表预览
 *
 * 用法: node tools/extract_chr.mjs [rom路径]
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { gzipSync, deflateSync } from 'zlib';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..');

const args = process.argv.slice(2);
const ROM_PATH = args[0] || resolve(PROJECT_ROOT, 'src/legacy/romdata/Captain Tsubasa (Japan).nes');
const SPRITES_DIR = resolve(PROJECT_ROOT, 'tsubasa1-h5', 'public', 'sprites');

// ═══════════════════════════════════════════════════
// NES 2C02 PPU 标准 64 色调色板 (RGB)
// ═══════════════════════════════════════════════════
const NES_PALETTE = [
  [0x75,0x75,0x75],[0x27,0x1B,0x8F],[0x00,0x00,0xAB],[0x47,0x00,0x9F],
  [0x8F,0x00,0x77],[0xAB,0x00,0x13],[0xA7,0x00,0x00],[0x7F,0x0B,0x00],
  [0x43,0x2F,0x00],[0x00,0x47,0x00],[0x00,0x51,0x00],[0x00,0x3F,0x17],
  [0x1B,0x3F,0x5F],[0x00,0x00,0x00],[0x00,0x00,0x00],[0x00,0x00,0x00],
  [0xBC,0xBC,0xBC],[0x00,0x73,0xEF],[0x23,0x3B,0xEF],[0x83,0x00,0xF3],
  [0xBF,0x00,0xBF],[0xE7,0x00,0x5B],[0xDB,0x2B,0x00],[0xCB,0x4F,0x0F],
  [0x8B,0x73,0x00],[0x00,0x97,0x00],[0x00,0xAB,0x00],[0x00,0x93,0x3B],
  [0x00,0x83,0x8B],[0x00,0x00,0x00],[0x00,0x00,0x00],[0x00,0x00,0x00],
  [0xFF,0xFF,0xFF],[0x3F,0xBF,0xFF],[0x5F,0x97,0xFF],[0xA7,0x8B,0xFD],
  [0xF7,0x7B,0xFF],[0xFF,0x77,0xB7],[0xFF,0x77,0x63],[0xFF,0x9B,0x3B],
  [0xF3,0xBF,0x3F],[0x83,0xD3,0x13],[0x4F,0xDF,0x4B],[0x58,0xF8,0x98],
  [0x00,0xEB,0xDB],[0x00,0x00,0x00],[0x00,0x00,0x00],[0x00,0x00,0x00],
  [0xFF,0xFF,0xFF],[0xAB,0xE7,0xFF],[0xC7,0xD7,0xFF],[0xD7,0xCB,0xFF],
  [0xFF,0xC7,0xFF],[0xFF,0xC7,0xDB],[0xFF,0xBF,0xB3],[0xFF,0xDB,0xAB],
  [0xFF,0xE7,0xA3],[0xE3,0xFF,0xA3],[0xAB,0xF3,0xBF],[0xB3,0xFF,0xCF],
  [0x9F,0xFF,0xF3],[0x00,0x00,0x00],[0x00,0x00,0x00],[0x00,0x00,0x00],
];

// ═══════════════════════════════════════════════════
// CHR 解码
// ═══════════════════════════════════════════════════

/** 解码单个 8×8 CHR tile */
function decodeTile(chrData, tileIdx) {
  const base = tileIdx * 16;
  const pixels = new Uint8Array(64); // 0-3 color index per pixel
  for (let row = 0; row < 8; row++) {
    const lo = chrData[base + row];
    const hi = chrData[base + row + 8];
    for (let col = 0; col < 8; col++) {
      const bit = 7 - col;
      const color = ((hi >> bit) & 1) << 1 | ((lo >> bit) & 1);
      pixels[row * 8 + col] = color;
    }
  }
  return pixels;
}

/** 把 tile 像素绘制到 ImageData 的指定位置 */
function blitTile(imageData, tilePixels, palette, tx, ty, reverseX = false, reverseY = false) {
  const { data, width } = imageData;
  for (let py = 0; py < 8; py++) {
    for (let px = 0; px < 8; px++) {
      const ci = tilePixels[py * 8 + px];
      const col = ci === 0 ? [0, 0, 0, 0] : palette[ci]; // color 0 = transparent
      const dx = reverseX ? (tx + 7 - px) : (tx + px);
      const dy = reverseY ? (ty + 7 - py) : (ty + py);
      const idx = (dy * width + dx) * 4;
      data[idx] = col[0];
      data[idx + 1] = col[1];
      data[idx + 2] = col[2];
      data[idx + 3] = col[3] ?? 255;
    }
  }
}

/** 将 ImageData 编码为最小 PNG (使用 zlib deflate) */
function encodePNG(imageData) {
  const { data: rawData, width, height } = imageData;

  // 构建原始像素行 (每行前加 filter 0x00)
  const rawRows = [];
  for (let y = 0; y < height; y++) {
    const row = new Uint8Array(1 + width * 4);
    row[0] = 0; // filter: None
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * 4;
      row[1 + x * 4] = rawData[srcIdx];     // R
      row[1 + x * 4 + 1] = rawData[srcIdx + 1]; // G
      row[1 + x * 4 + 2] = rawData[srcIdx + 2]; // B
      row[1 + x * 4 + 3] = rawData[srcIdx + 3]; // A
    }
    rawRows.push(row);
  }

  // 连接所有行
  const totalLen = rawRows.reduce((s, r) => s + r.length, 0);
  const raw = new Uint8Array(totalLen);
  let off = 0;
  for (const r of rawRows) {
    raw.set(r, off);
    off += r.length;
  }

  // deflate
  const compressed = deflateSync(raw);

  // ─── PNG 编码 ───
  const signature = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);

  function chunk(type, data) {
    const len = data.length;
    const buf = new Uint8Array(4 + 4 + len + 4);
    buf[0] = (len >>> 24) & 0xFF;
    buf[1] = (len >>> 16) & 0xFF;
    buf[2] = (len >>> 8) & 0xFF;
    buf[3] = len & 0xFF;
    buf.set(Uint8Array.from([...type].map(c => c.charCodeAt(0))), 4);
    buf.set(data, 8);

    // CRC32 (simplified)
    const crcData = new Uint8Array(4 + len);
    crcData.set(Uint8Array.from([...type].map(c => c.charCodeAt(0))), 0);
    crcData.set(data, 4);
    const crc = crc32(crcData);
    const crcOff = 8 + len;
    buf[crcOff] = (crc >>> 24) & 0xFF;
    buf[crcOff + 1] = (crc >>> 16) & 0xFF;
    buf[crcOff + 2] = (crc >>> 8) & 0xFF;
    buf[crcOff + 3] = crc & 0xFF;

    return buf;
  }

  // IHDR
  const ihdr = new Uint8Array(13);
  ihdr[0] = (width >>> 24) & 0xFF;
  ihdr[1] = (width >>> 16) & 0xFF;
  ihdr[2] = (width >>> 8) & 0xFF;
  ihdr[3] = width & 0xFF;
  ihdr[4] = (height >>> 24) & 0xFF;
  ihdr[5] = (height >>> 16) & 0xFF;
  ihdr[6] = (height >>> 8) & 0xFF;
  ihdr[7] = height & 0xFF;
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // color type: RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  // 拼接 PNG
  const parts = [signature, chunk('IHDR', ihdr), chunk('IDAT', compressed), chunk('IEND', new Uint8Array(0))];
  const totalSize = parts.reduce((s, p) => s + p.length, 0);
  const png = new Uint8Array(totalSize);
  let pos = 0;
  for (const p of parts) {
    png.set(p, pos);
    pos += p.length;
  }

  return png;
}

/** CRC32 用于 PNG */
const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    t[n] = c;
  }
  return t;
})();

function crc32(data) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < data.length; i++) {
    crc = CRC_TABLE[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// ═══════════════════════════════════════════════════
// 针对天使之翼游戏的特化调色板
// (从游戏通常使用的调色板推断)
// ═══════════════════════════════════════════════════
const GAME_PALETTES = [
  // 调色板 0: 球场精灵 (蓝衣/红衣球员, 球, 球网)
  [NES_PALETTE[0x0F], NES_PALETTE[0x11], NES_PALETTE[0x27], NES_PALETTE[0x0F]],
  // 调色板 1: 球场精灵 (白衣方)
  [NES_PALETTE[0x0F], NES_PALETTE[0x20], NES_PALETTE[0x30], NES_PALETTE[0x0F]],
  // 调色板 2: UI/菜单
  [NES_PALETTE[0x0F], NES_PALETTE[0x00], NES_PALETTE[0x10], NES_PALETTE[0x20]],
  // 调色板 3: 高亮/特效
  [NES_PALETTE[0x0F], NES_PALETTE[0x06], NES_PALETTE[0x16], NES_PALETTE[0x27]],
];

// ═══════════════════════════════════════════════════
// 生成精灵表预览 PNG
// ═══════════════════════════════════════════════════
function createSpriteSheet(chrBanks, startBank, count, palettes, sheetW, sheetH, tileW, tileH) {
  const imgW = sheetW * tileW;
  const imgH = sheetH * tileH;
  const imgData = new Uint8Array(imgW * imgH * 4);

  const imageData = {
    data: imgData,
    width: imgW,
    height: imgH,
  };

  let tileIdx = startBank * 256;
  for (let by = 0; by < count; by++) {
    const bank = chrBanks[by];
    for (let tile = 0; tile < 256; tile++) {
      const pixels = decodeTile(bank, tile);
      const pal = palettes[by % palettes.length];
      const col = tileIdx % sheetW;
      const row = Math.floor(tileIdx / sheetW);
      blitTile(imageData, pixels, pal, col * tileW, row * tileH);
      tileIdx++;
    }
  }

  return encodePNG({ data: imgData, width: imgW, height: imgH });
}

// ═══════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════
console.log('[CHR Extract] Reading ROM:', ROM_PATH);

const rom = readFileSync(ROM_PATH);

// iNES header
const prgSize = rom[4] * 16384; // 16KB units
const chrSize = rom[5] * 8192;  // 8KB units
const mapper = (rom[6] >> 4) | (rom[7] & 0xF0);
const mirroring = rom[6] & 1 ? 'Vertical' : 'Horizontal';

console.log(`  PRG: ${prgSize / 1024}KB, CHR: ${chrSize / 1024}KB, Mapper: ${mapper}, Mirror: ${mirroring}`);

// 提取 CHR 数据 (跳过 16 字节头 + PRG)
const chrStart = 16 + prgSize;
const chrData = rom.slice(chrStart, chrStart + chrSize);

// 分割为 bank (8KB each)
const CHR_BANK_SIZE = 8192;
const numBanks = chrSize / CHR_BANK_SIZE;
const chrBanks = [];
for (let i = 0; i < numBanks; i++) {
  chrBanks.push(chrData.slice(i * CHR_BANK_SIZE, (i + 1) * CHR_BANK_SIZE));
}

console.log(`  CHR banks: ${numBanks}, each ${CHR_BANK_SIZE} bytes (${256} tiles)`);

// ─── 为每个 bank 生成 PNG 精灵表 ───
mkdirSync(SPRITES_DIR, { recursive: true });

const TILES_PER_ROW = 16; // 16×16 grid = 256 tiles per bank
const TILE_SIZE = 8;

// 生成合并的精灵表 (所有 16 banks)
for (let b = 0; b < numBanks; b++) {
  const png = createSpriteSheet(
    [chrBanks[b]], 0, 1,
    GAME_PALETTES.slice(b % GAME_PALETTES.length, (b % GAME_PALETTES.length) + 1),
    TILES_PER_ROW, TILES_PER_ROW, TILE_SIZE, TILE_SIZE
  );
  const path = resolve(SPRITES_DIR, `chr_bank_${String(b).padStart(2, '0')}.png`);
  writeFileSync(path, png);
  console.log(`  ✓ ${path} (${png.length} bytes)`);
}

// 生成合并的大精灵表 (前 8 个 bank 在一起，用于常见精灵)
const megaPng = createSpriteSheet(
  chrBanks.slice(0, 8), 0, 8,
  [GAME_PALETTES[0], GAME_PALETTES[1], GAME_PALETTES[2], GAME_PALETTES[3],
   GAME_PALETTES[0], GAME_PALETTES[1], GAME_PALETTES[2], GAME_PALETTES[3]],
  TILES_PER_ROW, TILES_PER_ROW * 8, TILE_SIZE, TILE_SIZE
);
const megaPath = resolve(SPRITES_DIR, 'chr_mega.png');
writeFileSync(megaPath, megaPng);
console.log(`  ✓ ${megaPath} (${megaPath.length} bytes)`);

// ─── 输出 Base64 编码的原始 CHR 数据到 TypeScript 文件 ───
const chrBase64 = chrData.toString('base64');
const chrtilesPath = resolve(PROJECT_ROOT, 'tsubasa1-h5', 'src', 'data', 'ChrTiles.ts');

const tsContent = `/**
 * ChrTiles.ts — NES CHR-ROM tile 数据 (自动生成)
 * 原始 ROM: Captain Tsubasa (Japan).nes
 * Bank 数: ${numBanks} × 8KB = ${chrSize / 1024}KB
 *
 * 每个 tile: 16 字节 (8 字节 plane 0 + 8 字节 plane 1)
 * 2bpp 格式: (plane1 << 1) | plane0 = color index 0-3
 */

/** NES 2C02 PPU 标准 64 色调色板 (每项 [R, G, B]) */
export const NES_PALETTE: [number, number, number][] = ${JSON.stringify(NES_PALETTE, null, 2)};

/** 游戏常用子调色板 (索引指向 NES_PALETTE) */
export const GAME_SUB_PALETTES: number[][] = ${JSON.stringify(GAME_PALETTES.map(p => p.map(c => {
  // 找到颜色在 NES_PALETTE 中的索引
  for (let i = 0; i < 64; i++) {
    if (NES_PALETTE[i][0] === c[0] && NES_PALETTE[i][1] === c[1] && NES_PALETTE[i][2] === c[2]) return i;
  }
  return 0;
})))};

/** ROM CHR 数据总量: ${chrSize / 1024}KB, ${numBanks} banks × 256 tiles */
export const CHR_BANK_COUNT = ${numBanks};
export const CHR_BANK_SIZE = ${CHR_BANK_SIZE};
export const TILES_PER_BANK = 256;
export const TILE_SIZE = 16; // 每 tile 16 字节

/** CHR-ROM 原始 Base64 数据 (解码得到 128KB Uint8Array) */
export const CHR_DATA_BASE64 = ${JSON.stringify(chrBase64)};
`;

writeFileSync(chrtilesPath, tsContent);
console.log(`  ✓ ${chrtilesPath}`);

// ─── 生成 sprite 清单 ───
const manifest = {
  rom: ROM_PATH,
  chrSize,
  numBanks,
  tileSize: { w: 8, h: 8 },
  tilesPerBank: 256,
  banks: [],
};

for (let b = 0; b < numBanks; b++) {
  const bank = chrBanks[b];
  // 统计这个 bank 中非空 tile 的数量
  let nonEmptyTiles = 0;
  for (let t = 0; t < 256; t++) {
    const pixels = decodeTile(bank, t);
    for (let i = 0; i < 64; i++) {
      if (pixels[i] !== 0) { nonEmptyTiles++; break; }
    }
  }
  manifest.banks.push({
    bank: b,
    file: `chr_bank_${String(b).padStart(2, '0')}.png`,
    nonEmptyTiles,
    totalTiles: 256,
  });
}

const manifestPng = resolve(SPRITES_DIR, 'chr_bank_00.png');
if (manifestPng) {
  const manifestPath = resolve(SPRITES_DIR, 'manifest.json');
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`  ✓ ${manifestPath}`);
}

console.log('\n[Done] CHR extraction complete.');
console.log(`  Sprites: ${SPRITES_DIR}`);
console.log(`  Data:    ${chrtilesPath}`);
