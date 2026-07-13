const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const root = path.join(__dirname, '..', '20260713');
const rom = fs.readFileSync(path.join(root, 'Langrisser II (Japan).md'));
const vram = fs.readFileSync(path.join(root, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram'));
const cram = fs.readFileSync(path.join(root, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram'));

console.log('ROM size:', rom.length);
console.log('VRAM size:', vram.length);
console.log('CRAM file size:', cram.length);
console.log('');

// ============================================================
// 1. 解析 CRAM 调色板 (前128字节 = 4组 × 16色 × 2字节)
// ============================================================
function parseCRAM(cramData) {
  const palettes = [];
  for (let p = 0; p < 4; p++) {
    const pal = [];
    for (let c = 0; c < 16; c++) {
      const off = p * 32 + c * 2;
      // CRAM file is little-endian: swap bytes to form 16-bit word
const w = (cramData[off + 1] << 8) | cramData[off];
      const r = ((w >> 1) & 0x7) * 36; // 0-7 → 0-252
      const g = ((w >> 5) & 0x7) * 36;
      const b = ((w >> 9) & 0x7) * 36;
      pal.push([r, g, b]);
    }
    palettes.push(pal);
  }
  return palettes;
}

const palettes = parseCRAM(cram.slice(0, 128));
console.log('=== CRAM 调色板 (4 groups × 16 colors) ===');
for (let p = 0; p < 4; p++) {
  const colors = palettes[p].map(c => `[${c.map(x=>x.toString().padStart(3,'0')).join(',')}]`).join(' ');
  console.log(`Palette ${p}: ${colors}`);
}
console.log('');

// ============================================================
// 2. 解码 VRAM tile 0x0040 (copyright 符号)
// ============================================================
function decodeTile4BPP(tileBytes, offset) {
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const rowBase = offset + y * 4;
    const p0 = tileBytes[rowBase];
    const p1 = tileBytes[rowBase + 1];
    const p2 = tileBytes[rowBase + 2];
    const p3 = tileBytes[rowBase + 3];
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      pixels[y * 8 + x] = ((p0 >> bit) & 1) |
                          (((p1 >> bit) & 1) << 1) |
                          (((p2 >> bit) & 1) << 2) |
                          (((p3 >> bit) & 1) << 3);
    }
  }
  return pixels;
}

function renderTile(tilePixels, palette, scale = 8) {
  const canvas = createCanvas(8 * scale, 8 * scale);
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(8 * scale, 8 * scale);
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const idx = tilePixels[y * 8 + x];
      const [r, g, b] = idx === 0 ? [0, 0, 0, 0] : palette[idx];
      for (let sy = 0; sy < scale; sy++) {
        for (let sx = 0; sx < scale; sx++) {
          const px = x * scale + sx;
          const py = y * scale + sy;
          const off = (py * 8 * scale + px) * 4;
          img.data[off] = r;
          img.data[off + 1] = g;
          img.data[off + 2] = b;
          img.data[off + 3] = idx === 0 ? 0 : 255;
        }
      }
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas;
}

// tile 0x40 = 64 * 32 = 2048 = 0x800 in VRAM
const tileIdx = 0x40;
const tileAddr = tileIdx * 32;
const tileBytes = vram.slice(tileAddr, tileAddr + 32);
const tilePixels = decodeTile4BPP(tileBytes, 0);

console.log(`=== VRAM Tile #${tileIdx.toString(16)} at address 0x${tileAddr.toString(16)} ===`);
console.log('Raw 32 bytes:', Array.from(tileBytes).map(b => b.toString(16).padStart(2,'0')).join(' '));
console.log('Pixel index grid (color 0 = transparent):');
for (let y = 0; y < 8; y++) {
  const row = [];
  for (let x = 0; x < 8; x++) {
    const v = tilePixels[y * 8 + x];
    row.push(v.toString(16));
  }
  console.log('  ' + row.join(' '));
}
console.log('');

// 保存到 output/verify
const outDir = path.join(__dirname, '..', '20260713', 'output', 'verify');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

for (let p = 0; p < 4; p++) {
  const canvas = renderTile(tilePixels, palettes[p], 16);
  const fn = path.join(outDir, `tile_0x${tileIdx.toString(16)}_pal${p}.png`);
  fs.writeFileSync(fn, canvas.toBuffer('image/png'));
  console.log(`Saved tile_0x${tileIdx.toString(16)}_pal${p}.png`);
}

// ============================================================
// 3. 在 ROM 中搜索这 32 字节 tile 数据
// ============================================================
function findBytesInROM(bytes) {
  const matches = [];
  for (let i = 0; i < rom.length - bytes.length; i++) {
    let match = true;
    for (let j = 0; j < bytes.length; j++) {
      if (rom[i + j] !== bytes[j]) { match = false; break; }
    }
    if (match) matches.push(i);
    if (matches.length >= 10) break;
  }
  return matches;
}

const tileMatches = findBytesInROM(tileBytes);
console.log('\n=== ROM 中相同 tile 数据位置 ===');
if (tileMatches.length === 0) {
  console.log('NOT FOUND - 可能 ROM 中 tile 数据被压缩或字节序不同');
} else {
  tileMatches.forEach(addr => {
    console.log(`  0x${addr.toString(16).padStart(6,'0')}`);
  });
}

// ============================================================
// 4. 在 ROM 中搜索标题画面调色板数据
// ============================================================
function findPaletteInROM(cramData, paletteIndex) {
  const matches = [];
  const palBytes = cramData.slice(paletteIndex * 32, paletteIndex * 32 + 32);
  console.log(`\nSearching Palette ${paletteIndex} bytes:`, Array.from(palBytes).map(b => b.toString(16).padStart(2,'0')).join(' '));
  
  for (let i = 0; i < rom.length - 32; i++) {
    let match = true;
    for (let j = 0; j < 32; j++) {
      if (rom[i + j] !== palBytes[j]) { match = false; break; }
    }
    if (match) matches.push(i);
  }
  return matches;
}

for (let p = 0; p < 4; p++) {
  const palMatches = findPaletteInROM(cram, p);
  console.log(`\nPalette ${p} in ROM matches: ${palMatches.length}`);
  palMatches.slice(0, 10).forEach(addr => {
    console.log(`  0x${addr.toString(16).padStart(6,'0')}`);
  });
}

// ============================================================
// 5. 搜索 ROM 中所有可能的 32 字节调色板块 (启发式)
// ============================================================
function isPaletteCandidate(data, offset) {
  for (let c = 0; c < 16; c++) {
    const w = (data[offset + c * 2] << 8) | data[offset + c * 2 + 1];
    // Genesis CRAM word: bit 0 and 15 are unused, 9-bit color
    if (w & 0x8001) return false; // invalid bits set
    // color must be reasonable: 9-bit color max 0x0EEE
    if (w > 0x0EEE) return false;
  }
  return true;
}

const paletteCandidates = [];
for (let i = 0; i < rom.length - 32; i++) {
  if (isPaletteCandidate(rom, i)) {
    paletteCandidates.push(i);
  }
}
console.log(`\n=== ROM 中 32 字节调色板候选块: ${paletteCandidates.length} 个 ===`);
paletteCandidates.slice(0, 20).forEach(addr => {
  const bytes = Array.from(rom.slice(addr, addr + 32)).map(b => b.toString(16).padStart(2,'0')).join(' ');
  console.log(`  0x${addr.toString(16).padStart(6,'0')}: ${bytes}`);
});

console.log('\nDone. Output in:', outDir);
