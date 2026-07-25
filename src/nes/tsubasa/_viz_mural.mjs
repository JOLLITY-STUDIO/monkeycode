/**
 * Full mural: all 32 PRG banks as one giant image
 * Each bank: 256×128 (each byte = 2×2 pixel block, scaled up)
 * Layout: 4 columns × 8 rows = 1024×1024 total
 * 
 * Usage: node _viz_mural.mjs
 */

import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { deflateSync } from 'zlib';

const ROM_PATH = './rom.nes';
const OUT_DIR = './_viz_segments';

// ========== PNG encoder (grayscale) ==========

function crc32(buf) {
  let c;
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c;
  }
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ -1) >>> 0;
}

function pngChunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii');
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crcInput = Buffer.concat([typeBytes, data]);
  const crcVal = Buffer.alloc(4);
  crcVal.writeUInt32BE(crc32(crcInput), 0);
  return Buffer.concat([len, typeBytes, data, crcVal]);
}

function makePNG_Grayscale(width, height, pixels) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 0;  // color type: grayscale
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  const rawRows = [];
  for (let y = 0; y < height; y++) {
    rawRows.push(0);
    for (let x = 0; x < width; x++) {
      rawRows.push(pixels[y * width + x] || 0);
    }
  }
  const idatData = deflateSync(Buffer.from(rawRows));
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([sig, pngChunk('IHDR', ihdr), pngChunk('IDAT', idatData), pngChunk('IEND', Buffer.alloc(0))]);
}

function byteToRGB(b) {
  const h = (b / 256) * 270;
  const s = 0.85;
  const l = 0.25 + (b / 256) * 0.55;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r, g, bv;
  if (h < 60)      { r = c; g = x; bv = 0; }
  else if (h < 120) { r = x; g = c; bv = 0; }
  else if (h < 180) { r = 0; g = c; bv = x; }
  else if (h < 240) { r = 0; g = x; bv = c; }
  else              { r = x; g = 0; bv = c; }
  return [ Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((bv + m) * 255) ];
}

function makePNG_Rainbow(width, height, pixels) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2; // RGB
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const rawRows = [];
  for (let y = 0; y < height; y++) {
    rawRows.push(0);
    for (let x = 0; x < width; x++) {
      const [r, g, bv] = byteToRGB(pixels[y * width + x] || 0);
      rawRows.push(r, g, bv);
    }
  }
  const idatData = deflateSync(Buffer.from(rawRows));
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([sig, pngChunk('IHDR', ihdr), pngChunk('IDAT', idatData), pngChunk('IEND', Buffer.alloc(0))]);
}

// ========== Individual bank images (scaled up) ==========

function extractPRGBanks() {
  const rom = readFileSync(ROM_PATH);
  const prgCount = rom[4];
  const prgOffset = 16;
  const banks = [];
  for (let i = 0; i < prgCount * 2; i++) {
    const offset = prgOffset + i * 8192;
    const data = rom.slice(offset, offset + 8192);
    banks.push(data);
  }
  return banks;
}

function scaleUp(pixels, srcW, srcH, scale) {
  const dstW = srcW * scale;
  const dstH = srcH * scale;
  const dst = new Uint8Array(dstW * dstH);
  for (let y = 0; y < srcH; y++) {
    for (let x = 0; x < srcW; x++) {
      const v = pixels[y * srcW + x];
      for (let dy = 0; dy < scale; dy++) {
        for (let dx = 0; dx < scale; dx++) {
          dst[(y * scale + dy) * dstW + (x * scale + dx)] = v;
        }
      }
    }
  }
  return { pixels: dst, w: dstW, h: dstH };
}

function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const banks = extractPRGBanks();
  const NUM_BANKS = banks.length; // 32

  // ===== 1. Individual bank images (256×128, 2x scale) =====
  const SRC_W = 128, SRC_H = 64, SCALE = 2;
  const BIG_W = SRC_W * SCALE, BIG_H = SRC_H * SCALE;
  
  for (let b = 0; b < banks.length; b++) {
    const data = banks[b];
    const pixels = new Uint8Array(SRC_W * SRC_H);
    for (let i = 0; i < 8192; i++) pixels[i] = data[i];
    
    const scaled = scaleUp(pixels, SRC_W, SRC_H, SCALE);
    const grayscale = makePNG_Grayscale(BIG_W, BIG_H, scaled.pixels);
    writeFileSync(join(OUT_DIR, `mural_bank_${String(b).padStart(2,'0')}_gray.png`), grayscale);
    
    const rainbow = makePNG_Rainbow(BIG_W, BIG_H, scaled.pixels);
    writeFileSync(join(OUT_DIR, `mural_bank_${String(b).padStart(2,'0')}_rainbow.png`), rainbow);
  }
  console.log(`${NUM_BANKS} individual bank images (256×128)`);

  // ===== 2. Giant mural: 4 cols × 8 rows = 1024×1024 =====
  const COLS = 4, ROWS = 8;
  const MURAL_W = COLS * BIG_W;  // 1024
  const MURAL_H = ROWS * BIG_H;  // 1024
  const muralGray = new Uint8Array(MURAL_W * MURAL_H);
  const muralRainbow = new Uint8Array(MURAL_W * MURAL_H);

  for (let b = 0; b < banks.length; b++) {
    const data = banks[b];
    const srcPixels = new Uint8Array(SRC_W * SRC_H);
    for (let i = 0; i < 8192; i++) srcPixels[i] = data[i];
    
    const col = b % COLS;
    const row = Math.floor(b / COLS);
    
    for (let y = 0; y < SRC_H; y++) {
      for (let x = 0; x < SRC_W; x++) {
        const v = srcPixels[y * SRC_W + x];
        const baseX = col * BIG_W + x * SCALE;
        const baseY = row * BIG_H + y * SCALE;
        for (let dy = 0; dy < SCALE; dy++) {
          for (let dx = 0; dx < SCALE; dx++) {
            muralGray[(baseY + dy) * MURAL_W + (baseX + dx)] = v;
          }
        }
      }
    }
  }
  
  // Copy grayscale to rainbow (same pixel data, but rainbow encoded separately)
  for (let i = 0; i < muralGray.length; i++) muralRainbow[i] = muralGray[i];

  writeFileSync(join(OUT_DIR, '_mural_gray.png'), makePNG_Grayscale(MURAL_W, MURAL_H, muralGray));
  writeFileSync(join(OUT_DIR, '_mural_rainbow.png'), makePNG_Rainbow(MURAL_W, MURAL_H, muralRainbow));
  console.log(`Mural: ${MURAL_W}×${MURAL_H} (4×8 grid)`);

  // ===== 3. Vertical strip: 256×4096 =====
  const STRIP_W = BIG_W;  // 256
  const STRIP_H = NUM_BANKS * BIG_H; // 4096
  const stripGray = new Uint8Array(STRIP_W * STRIP_H);
  const stripRainbow = new Uint8Array(STRIP_W * STRIP_H);

  for (let b = 0; b < banks.length; b++) {
    const data = banks[b];
    const srcPixels = new Uint8Array(SRC_W * SRC_H);
    for (let i = 0; i < 8192; i++) srcPixels[i] = data[i];
    
    for (let y = 0; y < SRC_H; y++) {
      for (let x = 0; x < SRC_W; x++) {
        const v = srcPixels[y * SRC_W + x];
        const baseX = x * SCALE;
        const baseY = b * BIG_H + y * SCALE;
        for (let dy = 0; dy < SCALE; dy++) {
          for (let dx = 0; dx < SCALE; dx++) {
            stripGray[(baseY + dy) * STRIP_W + (baseX + dx)] = v;
          }
        }
      }
    }
  }
  for (let i = 0; i < stripGray.length; i++) stripRainbow[i] = stripGray[i];

  writeFileSync(join(OUT_DIR, '_strip_gray.png'), makePNG_Grayscale(STRIP_W, STRIP_H, stripGray));
  writeFileSync(join(OUT_DIR, '_strip_rainbow.png'), makePNG_Rainbow(STRIP_W, STRIP_H, stripRainbow));
  console.log(`Strip: ${STRIP_W}×${STRIP_H} (vertical stack)`);
  
  console.log(`\nDone! Files in _viz_segments/:`);
  console.log(`  _mural_gray.png     — 1024×1024 (4×8 grid, grayscale)`);
  console.log(`  _mural_rainbow.png  — 1024×1024 (4×8 grid, rainbow)`);
  console.log(`  _strip_gray.png     — 256×4096 (vertical, grayscale)`);
  console.log(`  _strip_rainbow.png  — 256×4096 (vertical, rainbow)`);
  console.log(`  mural_bank_XX_*.png — individual 256×128 per bank`);
}

main();
