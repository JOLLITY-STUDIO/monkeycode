import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ArrayBufferRomReader, loadResource } from '../game/hw/resource.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROM_PATH = path.join(__dirname, '..', '20260713', 'Langrisser II (Japan)_68K-gens-rom-dump.bin');
const OUTPUT_DIR = path.join(__dirname, '..', '20260713', 'output');

function saveBMP(pixels, width, height, filename) {
  const rowSize = Math.ceil((width * 3) / 4) * 4;
  const pixelDataSize = rowSize * height;
  const fileSize = 54 + pixelDataSize;
  const buffer = Buffer.alloc(fileSize);

  buffer.write('BM', 0);
  buffer.writeUInt32LE(fileSize, 2);
  buffer.writeUInt16LE(0, 6);
  buffer.writeUInt16LE(0, 8);
  buffer.writeUInt32LE(54, 10);
  buffer.writeUInt32LE(40, 14);
  buffer.writeInt32LE(width, 18);
  buffer.writeInt32LE(height, 22);
  buffer.writeUInt16LE(1, 26);
  buffer.writeUInt16LE(24, 28);
  buffer.writeUInt32LE(0, 30);
  buffer.writeUInt32LE(pixelDataSize, 34);
  buffer.writeInt32LE(2835, 38);
  buffer.writeInt32LE(2835, 42);
  buffer.writeUInt32LE(0, 46);
  buffer.writeUInt32LE(0, 50);

  for (let y = 0; y < height; y++) {
    const srcY = height - 1 - y;
    for (let x = 0; x < width; x++) {
      const srcIdx = (srcY * width + x) * 4;
      const dstIdx = 54 + y * rowSize + x * 3;
      buffer[dstIdx] = pixels[srcIdx + 2];
      buffer[dstIdx + 1] = pixels[srcIdx + 1];
      buffer[dstIdx + 2] = pixels[srcIdx];
    }
  }

  writeFileSync(path.join(OUTPUT_DIR, filename), buffer);
  console.log(`Saved: ${filename} (${width}x${height})`);
}

function decodeTile(vram, tileAddr, output, outputOffset = 0) {
  const base = tileAddr & 0xFFFF;
  for (let y = 0; y < 8; y++) {
    const rowBase = base + y * 4;
    const p0 = vram[rowBase];
    const p1 = vram[rowBase + 1];
    const p2 = vram[rowBase + 2];
    const p3 = vram[rowBase + 3];
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      const pixel =
        ((p0 >> bit) & 1) |
        (((p1 >> bit) & 1) << 1) |
        (((p2 >> bit) & 1) << 2) |
        (((p3 >> bit) & 1) << 3);
      output[outputOffset + y * 8 + x] = pixel;
    }
  }
}

function renderTileSheet(data, numTiles, palette, filename) {
  const cols = 16;
  const rows = Math.ceil(numTiles / cols);
  const width = cols * 8;
  const height = rows * 8;
  const pixels = new Uint8ClampedArray(width * height * 4);

  const tilePixels = new Uint8Array(64);

  for (let t = 0; t < numTiles; t++) {
    const tileAddr = t * 32;
    decodeTile(data, tileAddr, tilePixels, 0);

    const col = t % cols;
    const row = Math.floor(t / cols);
    const baseX = col * 8;
    const baseY = row * 8;

    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const pv = tilePixels[y * 8 + x];
        const px = baseX + x;
        const py = baseY + y;
        const outIdx = (py * width + px) * 4;

        if (pv === 0) {
          pixels[outIdx + 3] = 0;
        } else {
          const color = palette[pv] || { r: 255, g: 0, b: 255 };
          pixels[outIdx] = color.r;
          pixels[outIdx + 1] = color.g;
          pixels[outIdx + 2] = color.b;
          pixels[outIdx + 3] = 255;
        }
      }
    }
  }

  saveBMP(pixels, width, height, filename);
}

function main() {
  console.log('=== 资源 0x8001 解压与渲染验证 ===\n');

  const romData = readFileSync(ROM_PATH);
  const rom = new ArrayBufferRomReader(new Uint8Array(romData));

  const resourceId = 0x8001;
  console.log(`加载资源 ID: 0x${resourceId.toString(16).toUpperCase()}`);

  try {
    const result = loadResource(rom, resourceId);
    console.log(`解压完成!`);
    console.log(`  类型: ${result.type}`);
    console.log(`  大小: ${result.size} 字节`);
    console.log(`  DMA: ${result.dmaEnabled}`);

    const numTiles = Math.floor(result.size / 32);
    console.log(`  Tile 数量: ${numTiles}`);

    const grayPalette = [];
    for (let i = 0; i < 16; i++) {
      const v = Math.floor(i * 255 / 15);
      grayPalette[i] = { r: v, g: v, b: v };
    }

    renderTileSheet(result.data, Math.min(numTiles, 256), grayPalette, 'resource-0x8001-tiles.bmp');

    const hexDump = result.data.subarray(0, Math.min(128, result.size));
    console.log(`\n数据前 128 字节:`);
    for (let i = 0; i < hexDump.length; i++) {
      if (i % 16 === 0) process.stdout.write(`\n  ${i.toString().padStart(4, '0')}: `);
      process.stdout.write(`${hexDump[i].toString(16).padStart(2, '0')} `);
    }
    console.log('\n');

  } catch (e) {
    console.error('错误:', e.message);
    console.error(e.stack);
  }
}

main();
