/**
 * 渲染 LZSS 资源为 tile 图片
 * 用来识别资源内容
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ArrayBufferRomReader, decompressLZSS } from '../dist/game/hw/resource.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url).replace(/^\//, ''));
const root = path.resolve(__dirname, '..');

const romPath = path.resolve(root, '20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const romData = new Uint8Array(fs.readFileSync(romPath));
const rom = new ArrayBufferRomReader(romData);

const RES_TABLE = 0x000B0000;

function getResourcePtr(index) {
  return rom.readLong(RES_TABLE + index * 4);
}

// 4bpp tile 解码
function decodeTile(data, offset) {
  const pixels = new Uint8Array(8 * 8);
  for (let y = 0; y < 8; y++) {
    const rowOff = offset + y * 4;
    const plane0 = data[rowOff];
    const plane1 = data[rowOff + 1];
    const plane2 = data[rowOff + 2];
    const plane3 = data[rowOff + 3];
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      const p0 = (plane0 >> bit) & 1;
      const p1 = (plane1 >> bit) & 1;
      const p2 = (plane2 >> bit) & 1;
      const p3 = (plane3 >> bit) & 1;
      pixels[y * 8 + x] = p0 | (p1 << 1) | (p2 << 2) | (p3 << 3);
    }
  }
  return pixels;
}

// 渲染 tile 为 PNG (灰度)
function renderTilesToPNG(tileData, tilesPerRow = 16) {
  const numTiles = Math.floor(tileData.length / 32);
  const rows = Math.ceil(numTiles / tilesPerRow);
  const w = tilesPerRow * 8;
  const h = rows * 8;

  // 简单的灰度调色板
  const palette = [];
  for (let i = 0; i < 16; i++) {
    const gray = Math.floor(i * 255 / 15);
    palette.push([gray, gray, gray]);
  }

  // 创建 PNG
  const pngData = Buffer.alloc(8 + 25 + 12 + (h * (1 + w * 3) + 12) * 1 + 12); // 简化...

  // 实际上，直接写 PPM 格式更简单 (灰度)
  let ppm = `P6\n${w} ${h}\n255\n`;
  const pixelData = Buffer.alloc(w * h * 3);

  for (let t = 0; t < numTiles; t++) {
    const tileX = (t % tilesPerRow) * 8;
    const tileY = Math.floor(t / tilesPerRow) * 8;
    const pixels = decodeTile(tileData, t * 32);

    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const px = tileX + x;
        const py = tileY + y;
        const colorIdx = pixels[y * 8 + x];
        const [r, g, b] = palette[colorIdx];
        const off = (py * w + px) * 3;
        pixelData[off] = r;
        pixelData[off + 1] = g;
        pixelData[off + 2] = b;
      }
    }
  }

  return { ppm: ppm + pixelData.toString('binary'), width: w, height: h, numTiles };
}

console.log('=== 资源渲染测试 ===\n');

// 渲染前 10 个 LZSS 资源
for (let i = 0; i < 10; i++) {
  const ptr = getResourcePtr(i);
  const type = rom.readByte(ptr);

  console.log(`资源 ${i} (ID=0x${(0x8000 + i * 2).toString(16).padStart(4, '0')}):`);
  console.log(`  ROM 偏移: 0x${ptr.toString(16).padStart(8, '0')}`);
  console.log(`  类型: ${type}`);

  if (type === 3) {
    try {
      const result = decompressLZSS(rom, ptr);
      console.log(`  解压后大小: ${result.size} 字节`);
      console.log(`  Tile 数量: ${Math.floor(result.size / 32)}`);

      const render = renderTilesToPNG(result.data, 16);
      const outPath = path.resolve(root, `resource-${i}-tiles.ppm`);
      fs.writeFileSync(outPath, render.ppm, 'binary');
      console.log(`  图片已保存: resource-${i}-tiles.ppm (${render.width}x${render.height})`);
    } catch (e) {
      console.log(`  解压失败: ${e.message}`);
    }
  } else {
    console.log(`  (不是 LZSS 类型，跳过)`);
  }
  console.log('');
}

console.log('=== 完成 ===');
