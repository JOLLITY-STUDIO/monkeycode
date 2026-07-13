/**
 * 解压并渲染 LZSS 资源为 PPM 图片
 * 重点查看 Entry 0-5 和 Entry 227
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url).replace(/^\//, ''));
const root = path.resolve(__dirname, '..');

const romPath = path.resolve(root, '20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const rom = new Uint8Array(fs.readFileSync(romPath));

function r8(off) { return rom[off & 0xFFFFF]; }
function r16(off) { return (r8(off) << 8) | r8(off + 1); }
function r32(off) { return (r8(off) << 24) | (r8(off + 1) << 16) | (r8(off + 2) << 8) | r8(off + 3); }

// LZSS 解压
function decompressLZSS(addr) {
  const type = r8(addr);
  if (type !== 3) return null;
  const size = r16(addr + 1);
  const output = new Uint8Array(size);
  const window = new Uint8Array(0x1000).fill(0x20);
  let wp = 0x0FEE;
  let outPos = 0;
  let inPos = addr + 3;
  
  while (outPos < size) {
    const flag = r8(inPos++);
    for (let bit = 0; bit < 8 && outPos < size; bit++) {
      if (flag & (1 << bit)) {
        const b = r8(inPos++);
        window[wp] = b;
        output[outPos++] = b;
        wp = (wp + 1) & 0xFFF;
      } else {
        const b1 = r8(inPos++);
        const b2 = r8(inPos++);
        let off = (b1 | ((b2 & 0xF0) << 4)) & 0xFFF;
        const len = (b2 & 0x0F) + 2;
        for (let i = 0; i < len && outPos < size; i++) {
          const b = window[off];
          window[wp] = b;
          output[outPos++] = b;
          off = (off + 1) & 0xFFF;
          wp = (wp + 1) & 0xFFF;
        }
      }
    }
  }
  return output;
}

// 渲染 tile sheet 为 PPM
function renderTileSheet(data, cols, outputPath) {
  const tileSize = 32;
  const numTiles = Math.floor(data.length / tileSize);
  const rows = Math.ceil(numTiles / cols);
  const w = cols * 8;
  const h = rows * 8;
  const pixels = new Uint8Array(w * h * 3);
  
  for (let t = 0; t < numTiles; t++) {
    const tx = (t % cols) * 8;
    const ty = Math.floor(t / cols) * 8;
    const tileAddr = t * tileSize;
    
    for (let y = 0; y < 8; y++) {
      const rowBase = tileAddr + y * 4;
      const p0 = data[rowBase] || 0;
      const p1 = data[rowBase + 1] || 0;
      const p2 = data[rowBase + 2] || 0;
      const p3 = data[rowBase + 3] || 0;
      
      for (let x = 0; x < 8; x++) {
        const bit = 7 - x;
        const pixel = 
          ((p0 >> bit) & 1) |
          (((p1 >> bit) & 1) << 1) |
          (((p2 >> bit) & 1) << 2) |
          (((p3 >> bit) & 1) << 3);
        
        const px = tx + x;
        const py = ty + y;
        const idx = (py * w + px) * 3;
        const gray = pixel * 17;
        pixels[idx] = gray;
        pixels[idx + 1] = gray;
        pixels[idx + 2] = gray;
      }
    }
  }
  
  let ppm = `P6\n${w} ${h}\n255\n`;
  const buf = Buffer.concat([Buffer.from(ppm), Buffer.from(pixels)]);
  fs.writeFileSync(outputPath, buf);
  console.log(`  ${outputPath} (${w}x${h}, ${numTiles} tiles)`);
}

console.log('=== 解压并渲染 LZSS 资源 ===\n');

// 渲染前 5 个 LZSS 资源 + entry 227
const entries = [0, 1, 2, 3, 4, 5, 227];
for (const entry of entries) {
  const ptr = r32(0x000B0000 + entry * 4);
  const typeByte = r8(ptr);
  
  if (typeByte !== 3) {
    console.log(`Entry ${entry}: Type ${typeByte} (跳过, 非LZSS)`);
    continue;
  }
  
  const size = r16(ptr + 1);
  console.log(`Entry ${entry}: LZSS, ${size}B (${Math.floor(size/32)} tiles) @ 0x${ptr.toString(16)}`);
  
  const data = decompressLZSS(ptr);
  if (data) {
    const cols = 32;
    const outPath = path.resolve(root, `resource-${entry}-tiles.ppm`);
    renderTileSheet(data, cols, outPath);
    
    // 也输出前 64 字节的 hex dump
    let hex = '';
    for (let i = 0; i < Math.min(64, data.length); i++) {
      hex += data[i].toString(16).padStart(2, '0') + ' ';
      if ((i + 1) % 16 === 0) hex += '\n  ';
    }
    console.log(`  前64字节:\n  ${hex}`);
  }
  console.log('');
}

// 也看看资源调用的映射
console.log('=== 已知资源 ID → Entry 映射 ===\n');
const ids = [0x8001, 0x80e2, 0x80e3, 0x80e6, 0x80e1, 0x80df];
for (const id of ids) {
  const shift = id & 0x3F;
  const entry = (id & 0x7FFF) >> shift;
  const ptr = r32(0x000B0000 + entry * 4);
  const typeByte = r8(ptr);
  const size = r16(ptr + 1);
  console.log(`  ID 0x${id.toString(16)} → entry ${entry} → 0x${ptr.toString(16)} (T${typeByte}, ${size}B)`);
}
