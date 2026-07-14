/**
 * 将渲染结果输出为 ASCII art
 * 并验证 CRAM 调色板数据
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

// 解压资源
const ptr3 = readLong(0x0B0000 + 3 * 4);
const ptr8 = readLong(0x0B0000 + 8 * 4);
const res3 = decompressLZSS(ptr3);
const res8 = decompressLZSS(ptr8);

// 构建 VRAM
const vramRender = new Uint8Array(0x10000);
vramRender.set(vram.subarray(0, 0x6000), 0);
vramRender.set(vram.subarray(0xC000, 0x10000), 0xC000);
vramRender.set(res3.data, 0x2000);
vramRender.set(res8.data, 0x4000);

// 验证 CRAM 地址
console.log('=== 验证 CRAM 调色板地址 ===');
const paletteAddrs = [0xA4582, 0xA4562, 0xA4542, 0xA45A2];
for (let p = 0; p < 4; p++) {
  console.log(`\nPalette ${p} (ROM 0x${paletteAddrs[p].toString(16)}):`);
  for (let c = 0; c < 16; c++) {
    const addr = paletteAddrs[p] + c * 2;
    const word = readWord(addr);
    // Genesis CRAM: ----BBB-GGG-RRR-
    const b = (word >> 9) & 0x7;
    const g = (word >> 5) & 0x7;
    const r = (word >> 1) & 0x7;
    const r255 = r * 36, g255 = g * 36, b255 = b * 36;
    console.log(`  [${c.toString(16).padStart(2,'0')}] 0x${word.toString(16).padStart(4,'0')} → rgb(${r255},${g255},${b255})`);
  }
}

// 读取 CRAM 调色板
const cramPalettes = [];
for (let p = 0; p < 4; p++) {
  const palette = [];
  for (let c = 0; c < 16; c++) {
    const addr = paletteAddrs[p] + c * 2;
    const word = readWord(addr);
    const b = (word >> 9) & 0x7;
    const g = (word >> 5) & 0x7;
    const r = (word >> 1) & 0x7;
    palette.push({ r: r * 36, g: g * 36, b: b * 36 });
  }
  cramPalettes.push(palette);
}

// 渲染配置
const SCREEN_W = 320;
const SCREEN_H = 224;
const PLANE_W = 40;
const PLANE_H = 28;

function decodeTile(tileData, tileIndex) {
  const pixels = [];
  const baseAddr = tileIndex * 32;
  if (baseAddr + 32 > tileData.length) return new Array(64).fill(0);
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const rowBase = baseAddr + y * 4;
      const bit = 7 - x;
      const p0 = (tileData[rowBase + 0] >> bit) & 1;
      const p1 = (tileData[rowBase + 1] >> bit) & 1;
      const p2 = (tileData[rowBase + 2] >> bit) & 1;
      const p3 = (tileData[rowBase + 3] >> bit) & 1;
      pixels.push((p3 << 3) | (p2 << 2) | (p1 << 1) | p0);
    }
  }
  return pixels;
}

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

// 渲染到像素缓冲区
const pixelBuffer = new Uint32Array(SCREEN_W * SCREEN_H);

// 背景色
const bgColor = cramPalettes[0][0];
let bgPacked = (255 << 24) | (bgColor.b << 16) | (bgColor.g << 8) | bgColor.r;
pixelBuffer.fill(bgPacked);

function renderPlane(nametableBase, priority) {
  for (let row = 0; row < PLANE_H; row++) {
    for (let col = 0; col < PLANE_W; col++) {
      const ntAddr = nametableBase + (row * PLANE_W + col) * 2;
      const entry = parseNameTableEntry(ntAddr);
      if (entry.priority !== priority) continue;
      const tileIndex = entry.tileIndex;
      if (tileIndex === 0) continue;

      const palette = cramPalettes[entry.palette];
      const tilePixels = decodeTile(vramRender, tileIndex);

      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          let srcX = x, srcY = y;
          if (entry.hflip) srcX = 7 - x;
          if (entry.vflip) srcY = 7 - y;
          const colorIndex = tilePixels[srcY * 8 + srcX];
          if (colorIndex === 0) continue;
          const color = palette[colorIndex];
          const px = col * 8 + x;
          const py = row * 8 + y;
          if (px < SCREEN_W && py < SCREEN_H) {
            pixelBuffer[py * SCREEN_W + px] = (255 << 24) | (color.b << 16) | (color.g << 8) | color.r;
          }
        }
      }
    }
  }
}

// 渲染
renderPlane(0xE000, 0);
renderPlane(0xC000, 0);
renderPlane(0xE000, 1);
renderPlane(0xC000, 1);

// 输出 ASCII art (降采样到 80×28)
console.log('\n=== 渲染结果 ASCII art (80×28) ===');
const ASCII_CHARS = ' .:-=+*#%@';
const asciiW = 80;
const asciiH = 28;
for (let y = 0; y < asciiH; y++) {
  let line = '';
  for (let x = 0; x < asciiW; x++) {
    const px = Math.floor(x * SCREEN_W / asciiW);
    const py = Math.floor(y * SCREEN_H / asciiH);
    const pixel = pixelBuffer[py * SCREEN_W + px];
    const r = pixel & 0xff;
    const g = (pixel >> 8) & 0xff;
    const b = (pixel >> 16) & 0xff;
    const brightness = (r + g + b) / 3;
    const charIdx = Math.floor(brightness / 256 * ASCII_CHARS.length);
    line += ASCII_CHARS[Math.min(charIdx, ASCII_CHARS.length - 1)];
  }
  console.log(line);
}

// 统计非背景像素
let nonBgPixels = 0;
for (let i = 0; i < pixelBuffer.length; i++) {
  if (pixelBuffer[i] !== bgPacked) nonBgPixels++;
}
console.log(`\n非背景像素: ${nonBgPixels}/${pixelBuffer.length} (${(nonBgPixels/pixelBuffer.length*100).toFixed(1)}%)`);

// 保存为 PNG
const canvas = createCanvas(SCREEN_W, SCREEN_H);
const ctx = canvas.getContext('2d');
const imageData = ctx.createImageData(SCREEN_W, SCREEN_H);
for (let i = 0; i < pixelBuffer.length; i++) {
  imageData.data[i * 4 + 0] = pixelBuffer[i] & 0xff;       // R
  imageData.data[i * 4 + 1] = (pixelBuffer[i] >> 8) & 0xff;  // G
  imageData.data[i * 4 + 2] = (pixelBuffer[i] >> 16) & 0xff; // B
  imageData.data[i * 4 + 3] = 255;                           // A
}
ctx.putImageData(imageData, 0, 0);
const outputPath = path.join(__dirname, '../20260713/output/title-rom-render.png');
fs.writeFileSync(outputPath, canvas.toBuffer('image/png'));
console.log(`保存: ${outputPath}`);
