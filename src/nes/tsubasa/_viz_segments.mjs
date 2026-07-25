/**
 * Export each build_xxx() data segment from bank .ts files as PNG images.
 * Grayscale: each byte = 1 pixel intensity, auto square-ish layout.
 * 
 * Usage: node _viz_segments.mjs
 * Output: _viz_segments/ folder with PNG files
 */

import { readFileSync, mkdirSync, writeFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import { deflateSync } from 'zlib';

const SRC_DIR = './src/tsnes/tsubasa-code/prg_banks';
const OUT_DIR = './_viz_segments';

// ========== PNG encoder ==========

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

function byteToRGB(b) {
  // Map byte value to a rainbow HSL color: 0=blue, 64=green, 128=yellow, 192=red, 255=white
  const h = (b / 256) * 270; // hue 0-270 (blue→red, skip purple)
  const s = 0.85;
  const l = 0.25 + (b / 256) * 0.55; // darker for small values, brighter for large
  
  // HSL to RGB
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

function encodePNG(width, height, pixels) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 2;  // color type: RGB
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  const rawRows = [];
  for (let y = 0; y < height; y++) {
    rawRows.push(0); // filter: None
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const b = pixels[idx] || 0;
      const [r, g, bv] = byteToRGB(b);
      rawRows.push(r, g, bv);
    }
  }
  const idatData = deflateSync(Buffer.from(rawRows));
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([sig, pngChunk('IHDR', ihdr), pngChunk('IDAT', idatData), pngChunk('IEND', Buffer.alloc(0))]);
}

// ========== Find best image dimensions ==========

function findDims(n) {
  // Aim for roughly W:H ratio between 1:1 and 4:1, width >= height
  // For small segments, use fixed width; for larger, find near-square divisor
  
  // Target a width between 16 and 64 pixels
  let w;
  if (n <= 16) { w = n; }
  else if (n <= 64) { w = Math.ceil(Math.sqrt(n)); }
  else if (n <= 256) { w = 32; }
  else if (n <= 1024) { w = 32; }
  else {
    // Try to find a divisor that's 64-128 range for clean layout
    w = Math.ceil(Math.sqrt(n));
    // Try to find an exact divisor near sqrt
    for (let tryW = w; tryW <= w * 2 && tryW <= 256; tryW++) {
      if (n % tryW === 0) { w = tryW; break; }
    }
  }
  const h = Math.ceil(n / w);
  return { w, h };
}

// ========== Parse TS files ==========

function parseSegments(filePath) {
  const src = readFileSync(filePath, 'utf-8');
  const segments = [];
  
  // Match: function buildXXX(): readonly number[] { return [ ... ]; }
  // (covers both build_8000_desc and builddispatch style names)
  const fnRegex = /function\s+(build\w+)\s*\(\s*\)\s*:\s*readonly\s+number\[\]\s*\{[\s\S]*?return\s*\[([\s\S]*?)\]\s*;?\s*\}/g;
  
  let match;
  while ((match = fnRegex.exec(src)) !== null) {
    const fnName = match[1];
    const body = match[2];
    
    // Extract all 0xNN values
    const bytes = [];
    const hexRegex = /0x([0-9A-Fa-f]{2})/g;
    let hexMatch;
    while ((hexMatch = hexRegex.exec(body)) !== null) {
      bytes.push(parseInt(hexMatch[1], 16));
    }
    
    if (bytes.length > 0) {
      segments.push({ name: fnName, bytes, size: bytes.length });
    }
  }
  
  return segments;
}

// ========== Main ==========

function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  
  const files = readdirSync(SRC_DIR).filter(f => f.endsWith('.ts')).sort();
  const allSegments = [];
  
  for (const file of files) {
    const filePath = join(SRC_DIR, file);
    const bankName = basename(file, '.ts');
    const segments = parseSegments(filePath);
    
    if (segments.length === 0) continue;
    
    for (const seg of segments) {
      const { name, bytes, size } = seg;
      const { w, h } = findDims(size);
      const total = w * h;
      const pixels = new Uint8Array(total);
      for (let i = 0; i < bytes.length; i++) pixels[i] = bytes[i];
      
      const pngName = `${bankName}__${name}.png`;
      const pngData = encodePNG(w, h, pixels);
      writeFileSync(join(OUT_DIR, pngName), pngData);
      
      console.log(`  ${pngName}  ${size}B → ${w}×${h}`);
      allSegments.push({ bankName, segName: name, w, h, size });
    }
  }
  
  // Generate HTML viewer
  let html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>Segment Visualizer</title>
<style>
  body { background:#111; color:#ccc; font:13px monospace; padding:10px; }
  h3 { color:#f80; margin:20px 0 8px; border-bottom:1px solid #333; padding-bottom:4px; }
  .legend { margin-bottom:16px; font-size:12px; color:#888; }
  .legend span { display:inline-block; width:12px; height:12px; margin:0 2px 0 8px; vertical-align:middle; }
  .seg { display:inline-block; margin:4px; text-align:center; vertical-align:top; border:1px solid #333; padding:3px; background:#1a1a1a; }
  .seg img { image-rendering:pixelated; border:1px solid #444; }
  .seg .info { font-size:11px; margin-top:2px; max-width:130px; word-wrap:break-word; }
  .seg .size { color:#888; }
</style></head><body>
<h2>PRG Bank Segments (rainbow: blue=0x00 → green → yellow → red → white=0xFF)</h2>
<div class="legend">
  <span style="background:#2244cc"></span>0x00-3F
  <span style="background:#22aa44"></span>0x40-7F
  <span style="background:#ccaa22"></span>0x80-BF
  <span style="background:#cc4422"></span>0xC0-FE
  <span style="background:#eee"></span>0xFF (padding)
</div>
`;

  let curBank = '';
  for (const { bankName, segName, w, h, size } of allSegments) {
    if (bankName !== curBank) {
      curBank = bankName;
      html += `<h3>${curBank}</h3>`;
    }
    // Scale so smallest dimension is at least 32px
    const scale = Math.max(1, Math.ceil(32 / Math.min(w, h)));
    html += `<div class="seg">
  <img src="${bankName}__${segName}.png" width="${w*scale}" height="${h*scale}" title="${segName}">
  <div class="info">${segName}<br><span class="size">${size}B ${w}×${h}</span></div>
</div>
`;
  }
  
  html += `</body></html>`;
  writeFileSync(join(OUT_DIR, 'index.html'), html);
  
  console.log(`\nTotal: ${allSegments.length} segments in ${new Set(allSegments.map(s=>s.bankName)).size} banks`);
  console.log(`Open _viz_segments/index.html in browser.`);
}

main();
