/**
 * Visualize each 8KB bank from rom.nes as grayscale PNG images
 * 128x64 pixels, each byte = 1 pixel intensity
 * 
 * Usage: node _viz_banks.mjs
 * Output: _viz_banks/ folder with PNG files
 */

import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { deflateSync } from 'zlib';

const ROM_PATH = './rom.nes';
const OUT_DIR = './_viz_banks';

// ========== Minimal PNG encoder (no dependencies) ==========

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

function encodePNG(width, height, pixels) {
  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 0;  // color type: grayscale
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  // IDAT: raw pixels with filter byte 0 for each row
  const rawRows = [];
  for (let y = 0; y < height; y++) {
    rawRows.push(0); // filter: None
    for (let x = 0; x < width; x++) {
      rawRows.push(pixels[y * width + x]);
    }
  }
  
  const idatData = deflateSync(Buffer.from(rawRows));

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrChunk = pngChunk('IHDR', ihdr);
  const idatChunk = pngChunk('IDAT', idatData);
  const iendChunk = pngChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// ========== Main ==========

function extractBanks() {
  const rom = readFileSync(ROM_PATH);
  
  // Parse iNES header
  const prgCount = rom[4];   // 16KB PRG banks
  const chrCount = rom[5];   // 8KB CHR banks
  
  console.log(`PRG: ${prgCount} × 16KB = ${prgCount * 2} × 8KB banks`);
  console.log(`CHR: ${chrCount} × 8KB banks`);
  
  const prgOffset = 16; // after 16-byte header
  const chrOffset = prgOffset + prgCount * 16384;
  
  const banks = [];
  
  // PRG banks (split each 16KB into two 8KB banks)
  for (let i = 0; i < prgCount * 2; i++) {
    const offset = prgOffset + i * 8192;
    const data = rom.slice(offset, offset + 8192);
    banks.push({
      name: `prg_bank_${String(i).padStart(2, '0')}`,
      data: data,
      cpu: i % 2 === 0 ? '$8000-$9FFF' : '$A000-$BFFF',
    });
  }
  
  // CHR banks
  for (let i = 0; i < chrCount; i++) {
    const offset = chrOffset + i * 8192;
    const data = rom.slice(offset, offset + 8192);
    banks.push({
      name: `chr_bank_${String(i).padStart(2, '0')}`,
      data: data,
      cpu: `CHR ${i}`,
    });
  }
  
  return banks;
}

function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  
  const banks = extractBanks();
  const W = 128;
  const H = 64;
  
  // Also create a combined overview image
  const totalBanks = banks.length;
  const overviewW = W;
  const overviewH = H * totalBanks;
  const overviewPixels = new Uint8Array(overviewW * overviewH);
  
  for (let b = 0; b < banks.length; b++) {
    const { name, data, cpu } = banks[b];
    
    // Generate individual PNG
    const pixels = new Uint8Array(W * H);
    for (let i = 0; i < 8192 && i < W * H; i++) {
      pixels[i] = data[i];
      overviewPixels[b * H * W + i] = data[i];
    }
    
    const pngBuf = encodePNG(W, H, pixels);
    const fname = `${name}.png`;
    writeFileSync(join(OUT_DIR, fname), pngBuf);
    console.log(`  ${fname} (${cpu})`);
  }
  
  // Generate combined overview
  const overviewPng = encodePNG(overviewW, overviewH, overviewPixels);
  writeFileSync(join(OUT_DIR, '_overview_all.png'), overviewPng);
  console.log(`  _overview_all.png (all ${totalBanks} banks stacked)`);
  
  // Generate HTML viewer
  let html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>Bank Visualizer</title>
<style>
  body { background:#111; color:#ccc; font:14px monospace; padding:10px; }
  .bank { display:inline-block; margin:4px; text-align:center; vertical-align:top; }
  .bank img { width:256px; height:128px; image-rendering:pixelated; border:1px solid #333; }
  .bank .label { font-size:11px; margin-top:2px; }
  .bank .cpu { font-size:10px; color:#888; }
</style></head><body>
<h2>PRG + CHR Banks (128×64 px, each byte = 1 pixel)</h2>
<div>`;

  for (const { name, cpu } of banks) {
    html += `<div class="bank">
  <img src="${name}.png" title="${cpu}">
  <div class="label">${name}</div>
  <div class="cpu">${cpu}</div>
</div>
`;
  }
  
  html += `</div></body></html>`;
  writeFileSync(join(OUT_DIR, 'index.html'), html);
  
  console.log(`\nDone! Open _viz_banks/index.html in browser.`);
}

main();
