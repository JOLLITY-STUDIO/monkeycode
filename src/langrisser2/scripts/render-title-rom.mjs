/**
 * 用 ROM 原始数据渲染标题画面
 * - Tile data: Entry 3 (→VRAM 0x2000) + Entry 8 (→VRAM 0x4000) LZSS 解压
 * - Nametable: VRAM dump 0xC000 (Plane A) + 0xE000 (Plane B)
 * - CRAM: ROM 0xA4542-0xA45C2 (4 个调色板)
 *
 * 输出: title-rom-render.png
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const VRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');

const rom = fs.readFileSync(ROM_PATH);
const vram = fs.readFileSync(VRAM_PATH);

function readByte(o) { return rom[o] & 0xff; }
function readWord(o) { return ((rom[o] & 0xff) << 8) | (rom[o+1] & 0xff); }
function readLong(o) { return ((rom[o]&0xff)<<24)|((rom[o+1]&0xff)<<16)|((rom[o+2]&0xff)<<8)|(rom[o+3]&0xff); }

// LZSS 解压
function decompressLZSS(resourceAddr) {
  const decompressedSize = readWord(resourceAddr + 1);
  const compressedDataStart = resourceAddr + 3;
  const window = new Uint8Array(0x1000).fill(0x20);
  let windowPos = 0x0fee;
  let remaining = decompressedSize;
  const output = new Uint8Array(decompressedSize);
  let outputPos = 0;
  let compressedPos = compressedDataStart;

  while (remaining > 0) {
    const flagByte = readByte(compressedPos++);
    for (let bit = 0; bit < 8 && remaining > 0; bit++) {
      const isLiteral = (flagByte >> bit) & 1;
      if (isLiteral) {
        const byte = readByte(compressedPos++);
        window[windowPos] = byte;
        output[outputPos++] = byte;
        windowPos = (windowPos + 1) & 0xfff;
        remaining--;
      } else {
        const b1 = readByte(compressedPos++);
        const b2 = readByte(compressedPos++);
        let matchOffset = (b1 | ((b2 & 0xf0) << 4)) & 0xfff;
        const matchLength = (b2 & 0x0f) + 2;
        for (let i = 0; i < matchLength && remaining > 0; i++) {
          const byte = window[matchOffset];
          window[windowPos] = byte;
          output[outputPos++] = byte;
          matchOffset = (matchOffset + 1) & 0xfff;
          windowPos = (windowPos + 1) & 0xfff;
          remaining--;
        }
      }
    }
  }
  return { data: output, size: decompressedSize };
}

// 解压 Entry 3 (→VRAM 0x2000, tile 256-511) 和 Entry 8 (→VRAM 0x4000, tile 512-767)
const ptr3 = readLong(0x0B0000 + 3 * 4);
const ptr8 = readLong(0x0B0000 + 8 * 4);
const res3 = decompressLZSS(ptr3);
const res8 = decompressLZSS(ptr8);

console.log(`Entry 3: ${res3.size}B → VRAM 0x2000 (tile 256-511)`);
console.log(`Entry 8: ${res8.size}B → VRAM 0x4000 (tile 512-767)`);

// 构建 VRAM tile data (64KB)
// 0x0000-0x1FFF: 从 VRAM dump 复制 (tile 0-255, 字体等)
// 0x2000-0x3FFF: Entry 3 解压数据 (tile 256-511)
// 0x4000-0x5FFF: Entry 8 解压数据 (tile 512-767)
// 0xC000-0xDFFF: Plane A nametable (从 VRAM dump)
// 0xE000-0xFFFF: Plane B nametable (从 VRAM dump)
const vramRender = new Uint8Array(0x10000);
// 复制 VRAM dump 的 tile 0-255 和 nametable
vramRender.set(vram.subarray(0, 0x6000), 0); // tile 0-767 区域
vramRender.set(vram.subarray(0xC000, 0x10000), 0xC000); // nametable
// 用 ROM 解压数据覆盖 tile 256-511 和 512-767
vramRender.set(res3.data, 0x2000);
vramRender.set(res8.data, 0x4000);

// 读取 CRAM 调色板 (ROM 大端)
// Palette 0: ROM 0xA4582
// Palette 1: ROM 0xA4562
// Palette 2: ROM 0xA4542
// Palette 3: ROM 0xA45A2
const cramPalettes = [];
const paletteAddrs = [0xA4582, 0xA4562, 0xA4542, 0xA45A2];
for (let p = 0; p < 4; p++) {
  const palette = [];
  for (let c = 0; c < 16; c++) {
    const addr = paletteAddrs[p] + c * 2;
    const word = readWord(addr); // 大端
    // CRAM 格式: bit15=0, bit14-12=Blue, bit11-9=Green, bit8-6=Red (3-bit each)
    // 但 ROM 中可能是 BGR 格式: 0BBB0GGG0RRR
    const b = (word >> 9) & 0x7;
    const g = (word >> 5) & 0x7; // 注意: 可能需要调整
    const r = (word >> 1) & 0x7;
    // 实际 Genesis CRAM 格式: 0000 BBB0 GGG0 RRR0 (每色 3-bit, 低位补 0)
    // 但 ROM 中可能是 0BGR 0BGR 格式
    // 让我尝试另一种解码
    palette.push({ raw: word, r, g, b });
  }
  cramPalettes.push(palette);
}

// 调试: 显示调色板
console.log('\n=== CRAM 调色板 ===');
for (let p = 0; p < 4; p++) {
  console.log(`Palette ${p}:`);
  for (let c = 0; c < 16; c++) {
    const col = cramPalettes[p][c];
    console.log(`  [${c.toString(16)}] raw=0x${col.raw.toString(16).padStart(4,'0')} r=${col.r} g=${col.g} b=${col.b}`);
  }
}

// 渲染配置
const SCREEN_W = 320;
const SCREEN_H = 224;
const TILE_SIZE = 8;
const PLANE_W = 40; // H40 模式
const PLANE_H = 28; // V28 模式

// 解码 tile (4bpp, row-major)
function decodeTile(tileData, tileIndex, palette) {
  const pixels = [];
  const baseAddr = tileIndex * 32;
  if (baseAddr + 32 > tileData.length) return pixels;

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const rowBase = baseAddr + y * 4;
      // 4bpp: 4 个位平面, 每行 4 字节
      // bit 7 = 最左像素
      const bit = 7 - x;
      const plane0 = (tileData[rowBase + 0] >> bit) & 1;
      const plane1 = (tileData[rowBase + 1] >> bit) & 1;
      const plane2 = (tileData[rowBase + 2] >> bit) & 1;
      const plane3 = (tileData[rowBase + 3] >> bit) & 1;
      const colorIndex = (plane3 << 3) | (plane2 << 2) | (plane1 << 1) | plane0;
      pixels.push(colorIndex);
    }
  }
  return pixels;
}

// 解析 nametable entry (小端)
function parseNameTableEntry(addr) {
  const low = vramRender[addr];
  const high = vramRender[addr + 1];
  const entry = (high << 8) | low;
  return {
    priority: (entry >> 15) & 1,
    palette: (entry >> 13) & 3,
    hflip: (entry >> 12) & 1,
    vflip: (entry >> 11) & 1,
    tileIndex: entry & 0x7ff,
  };
}

// 创建画布
const canvas = createCanvas(SCREEN_W, SCREEN_H);
const ctx = canvas.getContext('2d');

// 背景色 = CRAM[0] (通常 palette 0 color 0)
const bgColor = cramPalettes[0][0];
const bgR = bgColor.r * 36;
const bgG = bgColor.g * 36;
const bgB = bgColor.b * 36;
ctx.fillStyle = `rgb(${bgR}, ${bgG}, ${bgB})`;
ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);

// 先渲染 Plane B (低优先级), 再渲染 Plane A
function renderPlane(nametableBase, priority) {
  for (let row = 0; row < PLANE_H; row++) {
    for (let col = 0; col < PLANE_W; col++) {
      const ntAddr = nametableBase + (row * PLANE_W + col) * 2;
      const entry = parseNameTableEntry(ntAddr);

      // 只渲染指定优先级的 tile
      if (entry.priority !== priority) continue;

      const tileIndex = entry.tileIndex;
      if (tileIndex === 0) continue; // 空 tile

      const palette = cramPalettes[entry.palette];
      const tilePixels = decodeTile(vramRender, tileIndex, palette);

      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          let srcX = x, srcY = y;
          if (entry.hflip) srcX = 7 - x;
          if (entry.vflip) srcY = 7 - y;

          const colorIndex = tilePixels[srcY * 8 + srcX];
          if (colorIndex === 0) continue; // 透明

          const color = palette[colorIndex];
          const r = color.r * 36;
          const g = color.g * 36;
          const b = color.b * 36;

          const px = col * 8 + x;
          const py = row * 8 + y;
          if (px < SCREEN_W && py < SCREEN_H) {
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(px, py, 1, 1);
          }
        }
      }
    }
  }
}

// 渲染顺序: Plane B 低优先级 → Plane A 低优先级 → Plane B 高优先级 → Plane A 高优先级
console.log('\n渲染中...');
renderPlane(0xE000, 0); // Plane B 低优先级
renderPlane(0xC000, 0); // Plane A 低优先级
renderPlane(0xE000, 1); // Plane B 高优先级
renderPlane(0xC000, 1); // Plane A 高优先级

// 保存
const outputPath = path.join(__dirname, '../20260713/output/title-rom-render.png');
fs.writeFileSync(outputPath, canvas.toBuffer('image/png'));
console.log(`保存: ${outputPath}`);

// 统计 nametable tile index 分布
console.log('\n=== Plane A nametable tile index 分布 ===');
const tileCountsA = {};
for (let row = 0; row < PLANE_H; row++) {
  for (let col = 0; col < PLANE_W; col++) {
    const ntAddr = 0xC000 + (row * PLANE_W + col) * 2;
    const entry = parseNameTableEntry(ntAddr);
    if (entry.tileIndex > 0) {
      const range = Math.floor(entry.tileIndex / 256) * 256;
      tileCountsA[range] = (tileCountsA[range] || 0) + 1;
    }
  }
}
for (const [range, count] of Object.entries(tileCountsA)) {
  console.log(`  tile ${range}-${Number(range)+255}: ${count} entries`);
}

console.log('\n=== Plane B nametable tile index 分布 ===');
const tileCountsB = {};
for (let row = 0; row < PLANE_H; row++) {
  for (let col = 0; col < PLANE_W; col++) {
    const ntAddr = 0xE000 + (row * PLANE_W + col) * 2;
    const entry = parseNameTableEntry(ntAddr);
    if (entry.tileIndex > 0) {
      const range = Math.floor(entry.tileIndex / 256) * 256;
      tileCountsB[range] = (tileCountsB[range] || 0) + 1;
    }
  }
}
for (const [range, count] of Object.entries(tileCountsB)) {
  console.log(`  tile ${range}-${Number(range)+255}: ${count} entries`);
}
