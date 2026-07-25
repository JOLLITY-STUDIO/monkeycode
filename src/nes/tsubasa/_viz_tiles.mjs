/**
 * NES 2bpp tile visualizer: interpret each PRG bank's data as 8×8 tiles
 * Each bank = 8192 bytes = 512 tiles (16 bytes each)
 * Grid layout: 32 tiles × 16 rows = 256×128 pixels
 * 4 colors: black (0), dark gray (1), light gray (2), white (3)
 *
 * Usage: node _viz_tiles.mjs
 */

import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { deflateSync } from 'zlib';

const ROM_PATH = './rom.nes';
const OUT_DIR = './_viz_tiles';

// NES 2bpp palette (4 grayscale levels)
const PAL = [0, 85, 170, 255]; // black → dark gray → light gray → white

// ========== PNG encoder (grayscale) ==========

function crc32(buf) {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
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
  ihdr[8] = 8;
  ihdr[9] = 0; // grayscale
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const rawRows = [];
  for (let y = 0; y < height; y++) {
    rawRows.push(0); // filter byte
    for (let x = 0; x < width; x++) {
      rawRows.push(pixels[y * width + x] || 0);
    }
  }
  const idatData = deflateSync(Buffer.from(rawRows));
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([sig, pngChunk('IHDR', ihdr), pngChunk('IDAT', idatData), pngChunk('IEND', Buffer.alloc(0))]);
}

// ========== NES 2bpp tile decoder ==========

/**
 * Decode 16 bytes into one 8×8 tile (64 pixels).
 * NES tile format: 8 bytes plane 0 (low bit), 8 bytes plane 1 (high bit).
 * Each pixel = (byte0 & 1) | ((byte1 & 1) << 1), then shift right.
 */
function decodeTile(data, offset) {
  const pixels = new Uint8Array(64); // 8×8
  for (let row = 0; row < 8; row++) {
    let lo = data[offset + row];
    let hi = data[offset + row + 8];
    for (let col = 0; col < 8; col++) {
      const bit = 7 - col;
      pixels[row * 8 + col] = ((lo >> bit) & 1) | (((hi >> bit) & 1) << 1);
    }
  }
  return pixels;
}

// ========== Bank decoding ==========

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

/**
 * Render a bank as NES 2bpp tiles grid.
 * 32 tiles wide (256px) × 16 tiles tall (128px)
 */
function renderBankAsTiles(bankData) {
  const TILES_W = 32, TILES_H = 16;
  const W = TILES_W * 8, H = TILES_H * 8; // 256×128
  const pixels = new Uint8Array(W * H);

  for (let tileIdx = 0; tileIdx < 512; tileIdx++) {
    const tileData = decodeTile(bankData, tileIdx * 16);
    const tx = tileIdx % TILES_W;
    const ty = Math.floor(tileIdx / TILES_W);

    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        const colorIdx = tileData[py * 8 + px];
        pixels[(ty * 8 + py) * W + (tx * 8 + px)] = PAL[colorIdx];
      }
    }
  }
  return pixels;
}

// ========== Main ==========

function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const banks = extractPRGBanks();
  const NUM_BANKS = banks.length;
  const W = 256, H = 128;

  // ===== Individual bank images =====
  for (let b = 0; b < NUM_BANKS; b++) {
    const pixels = renderBankAsTiles(banks[b]);
    const png = makePNG_Grayscale(W, H, pixels);
    writeFileSync(join(OUT_DIR, `tiles_bank_${String(b).padStart(2, '0')}.png`), png);
  }
  console.log(`${NUM_BANKS} individual bank tile images (${W}×${H})`);

  // ===== Mural: 4×8 grid = 1024×1024 =====
  const COLS = 4, ROWS = 8;
  const MURAL_W = COLS * W, MURAL_H = ROWS * H;
  const mural = new Uint8Array(MURAL_W * MURAL_H);

  for (let b = 0; b < NUM_BANKS; b++) {
    const pixels = renderBankAsTiles(banks[b]);
    const col = b % COLS;
    const row = Math.floor(b / COLS);
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        mural[(row * H + y) * MURAL_W + (col * W + x)] = pixels[y * W + x];
      }
    }
  }

  writeFileSync(join(OUT_DIR, '_mural.png'), makePNG_Grayscale(MURAL_W, MURAL_H, mural));
  console.log(`Mural: ${MURAL_W}×${MURAL_H} (4×8 grid)`);

  // ===== HTML viewer =====
  let html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>NES Tile Visualizer (2bpp decode)</title>
<style>
  body { background:#111; color:#ccc; font:14px monospace; padding:10px; }
  h2 { color: #fff; }
  .bank { display:inline-block; margin:6px; text-align:center; vertical-align:top; }
  .bank img { width:256px; height:128px; image-rendering:pixelated; border:1px solid #333; }
  .bank .label { font-size:12px; margin-top:3px; color: #aaa; }
  .mural-section { margin-bottom: 30px; }
  .mural-section img { image-rendering:pixelated; border:1px solid #555; max-width:100%; }
  .note { color:#888; font-size:12px; margin:5px 0; }
</style></head><body>
<h2>NES 2bpp Tile Visualization — All 32 PRG Banks</h2>
<p class="note">Each bank's data decoded as 512 NES 8×8 tiles (16 bytes each). Grayscale: 0=black, 1=dark, 2=light, 3=white.</p>

<div class="mural-section">
<h3>Overview Mural (4×8 grid, 1024×1024)</h3>
<img src="_mural.png">
</div>

<h3>Individual Banks</h3>
<div>`;

  for (let b = 0; b < NUM_BANKS; b++) {
    html += `<div class="bank">
  <img src="tiles_bank_${String(b).padStart(2, '0')}.png">
  <div class="label">bank_${String(b).padStart(2, '0')}</div>
</div>\n`;
  }

  html += `</div></body></html>`;
  writeFileSync(join(OUT_DIR, 'index.html'), html);

  console.log(`\nDone! Open _viz_tiles/index.html`);
}

main();
