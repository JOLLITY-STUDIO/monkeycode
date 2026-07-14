const fs = require('fs');
const path = require('path');

const ROM_PATH = path.join(__dirname, '..', '20260713', 'Langrisser II (Japan)_68K-gens-rom-dump.bin');
const OUTPUT_DIR = path.join(__dirname, '..', '20260713', 'output');

const RESOURCE_POINTER_TABLE_BASE = 0x000b0000;

function readByte(rom, offset) { return rom[offset] & 0xff; }
function readWord(rom, offset) { return ((rom[offset] & 0xff) << 8) | (rom[offset + 1] & 0xff); }
function readLong(rom, offset) {
  return ((rom[offset] & 0xff) << 24) | ((rom[offset + 1] & 0xff) << 16) |
         ((rom[offset + 2] & 0xff) << 8) | (rom[offset + 3] & 0xff);
}

function resolveResourcePointer(rom, resourceId, originalD0) {
  const shiftCount = (originalD0 & 0xffff) % 64;
  const index = (resourceId & 0x7fff) >> shiftCount;
  const entryAddr = RESOURCE_POINTER_TABLE_BASE + index * 4;
  return readLong(rom, entryAddr);
}

function decompressLZSS(rom, resourceAddr) {
  const headerAddr = resourceAddr + 1;
  const decompressedSize = readWord(rom, headerAddr);
  const compressedDataStart = resourceAddr + 3;

  const LZSS_WINDOW_SIZE = 0x1000;
  const LZSS_WINDOW_FILL = 0x20;
  const LZSS_INITIAL_WINDOW_POS = 0x0fee;

  const window = new Uint8Array(LZSS_WINDOW_SIZE).fill(LZSS_WINDOW_FILL);
  let windowPos = LZSS_INITIAL_WINDOW_POS;
  let remaining = decompressedSize;

  const output = new Uint8Array(decompressedSize);
  let outputPos = 0;
  let compressedPos = compressedDataStart;

  while (remaining > 0) {
    const flagByte = readByte(rom, compressedPos++);
    for (let bit = 0; bit < 8 && remaining > 0; bit++) {
      const isLiteral = (flagByte >> bit) & 1;
      if (isLiteral) {
        const byte = readByte(rom, compressedPos++);
        window[windowPos] = byte;
        output[outputPos++] = byte;
        windowPos = (windowPos + 1) & 0xfff;
        remaining--;
      } else {
        const b1 = readByte(rom, compressedPos++);
        const b2 = readByte(rom, compressedPos++);
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

  return { data: output, size: decompressedSize, type: 3 };
}

function decompressNibbleRLE(rom, resourceAddr) {
  const sizeAddr = resourceAddr + 1;
  const totalBytes = readWord(rom, sizeAddr);
  const compressedStart = sizeAddr + 2;

  let d5 = 0;
  let bVar3 = false;
  let bVar7 = 0x7f;
  let sVar6 = 3;
  let outputBytes = 0;

  const output = new Uint8Array(totalBytes);
  let outputPos = 0;
  let puVar12 = compressedStart;

  function packNibble(nibble) {
    const shifted = (d5 << 4) & 0xffff;
    d5 = (shifted | (nibble & 0x0f)) & 0xffff;
    sVar6--;
    if (sVar6 === -1) {
      sVar6 = 3;
      output[outputPos++] = (d5 >> 8) & 0xff;
      output[outputPos++] = d5 & 0xff;
      outputBytes += 2;
    }
  }

  while (outputBytes < totalBytes) {
    const bVar2 = !bVar3;
    let bVar9;
    let puVar11;

    if (bVar2) {
      bVar9 = (readByte(rom, puVar12) >> 4) & 0x0f;
      puVar11 = puVar12;
    } else {
      puVar11 = puVar12 + 1;
      bVar9 = readByte(rom, puVar12) & 0x0f;
    }
    puVar12 = puVar11;

    if (bVar9 === bVar7) {
      let uVar8;
      if (bVar3) {
        uVar8 = (readByte(rom, puVar11) >> 4) & 0x0f;
      } else {
        puVar12 = puVar11 + 1;
        uVar8 = readByte(rom, puVar11) & 0x0f;
      }
      do {
        packNibble(bVar7);
        uVar8 = (uVar8 - 1) & 0xffff;
      } while (uVar8 !== 0xffff && outputBytes < totalBytes);
    } else {
      packNibble(bVar9);
      bVar3 = bVar2;
      bVar7 = bVar9;
    }
  }

  return { data: output, size: totalBytes, type: 1 };
}

function decompressType2(rom, resourceAddr) {
  const b1 = readByte(rom, resourceAddr + 1);
  const compressed = (b1 & 0x80) !== 0;
  const planes = b1 & 0x7f;

  if (!compressed) {
    const size = readWord(rom, resourceAddr + 2);
    const outputSize = size * planes * 8;
    const data = new Uint8Array(outputSize);
    for (let i = 0; i < outputSize; i++) {
      data[i] = readByte(rom, resourceAddr + 4 + i);
    }
    return { data: data, size: outputSize, type: 2 };
  }

  const lookupTable = new Uint8Array(16);
  for (let i = 0; i < 8; i++) {
    const b = readByte(rom, resourceAddr + 2 + i);
    lookupTable[i * 2] = (b >> 4) & 0x0f;
    lookupTable[i * 2 + 1] = b & 0x0f;
  }

  const size = readWord(rom, resourceAddr + 10);
  const ctrlStart = resourceAddr + 12;
  const pixelStart = ctrlStart + size;

  let planeCount = planes;
  if (planeCount !== 2) planeCount = planeCount ^ 5;

  const outputSize = size * planes * 8;
  const bytesPerTile = planeCount * 8 * planes;
  const tileCount = Math.floor(size / planeCount);
  const output = new Uint8Array(outputSize);

  let ctrlPos = ctrlStart;
  let pixelPos = pixelStart;

  for (let tile = 0; tile < tileCount; tile++) {
    const workBuf = new Uint8Array(bytesPerTile);
    let workPos = 0;

    for (let plane = 0; plane < planeCount; plane++) {
      const ctrlByte = readByte(rom, ctrlPos++);
      for (let bit = 7; bit >= 0; bit--) {
        const isData = (ctrlByte >> bit) & 1;
        if (isData) {
          for (let p = 0; p < planes; p++) {
            workBuf[workPos++] = readByte(rom, pixelPos++);
          }
        } else {
          for (let p = 0; p < planes; p++) {
            workBuf[workPos++] = 0;
          }
        }
      }
    }

    const tileOutput = new Uint8Array(32);
    let outWordPos = 0;
    const numPlanes = Math.min(planeCount, 4);

    for (let outer = 0; outer < 4; outer++) {
      const planeShorts = [];
      for (let p = 0; p < numPlanes; p++) {
        const byteOffset = (outer + p * 4) * 2;
        const hi = workBuf[byteOffset] || 0;
        const lo = workBuf[byteOffset + 1] || 0;
        planeShorts.push((hi << 8) | lo);
      }

      for (let inner = 0; inner < 4; inner++) {
        let pixels = 0;
        for (let pix = 0; pix < 4; pix++) {
          const bit0 = numPlanes > 0 ? ((planeShorts[0] & 0x8000) ? 1 : 0) : 0;
          const bit1 = numPlanes > 1 ? ((planeShorts[1] & 0x8000) ? 1 : 0) : 0;
          const bit2 = numPlanes > 2 ? ((planeShorts[2] & 0x8000) ? 1 : 0) : 0;
          const bit3 = numPlanes > 3 ? ((planeShorts[3] & 0x8000) ? 1 : 0) : 0;
          const index = (bit3 << 3) | (bit1 << 2) | (bit2 << 1) | bit0;
          const pixel = lookupTable[index];
          pixels = (pixels << 4) | pixel;
          for (let p = 0; p < numPlanes; p++) {
            planeShorts[p] = (planeShorts[p] << 1) & 0xffff;
          }
        }
        tileOutput[outWordPos * 2] = (pixels >> 8) & 0xff;
        tileOutput[outWordPos * 2 + 1] = pixels & 0xff;
        outWordPos++;
      }
    }

    output.set(tileOutput, tile * 32);
  }

  return { data: output, size: outputSize, type: 2 };
}

function dispatchByType(rom, resourceAddr) {
  const typeCode = readByte(rom, resourceAddr);
  if (typeCode === 3) return decompressLZSS(rom, resourceAddr);
  if (typeCode === 1) return decompressNibbleRLE(rom, resourceAddr);
  if (typeCode === 2) return decompressType2(rom, resourceAddr);
  throw new Error(`Unknown resource type: ${typeCode} at 0x${resourceAddr.toString(16)}`);
}

function loadResource(rom, d0) {
  const d2 = d0;
  const dmaEnabled = (d0 & 0x8000) !== 0;
  const resourceId = d0 & 0x7fff;
  const resourceAddr = resolveResourcePointer(rom, resourceId, d2);
  const result = dispatchByType(rom, resourceAddr);
  return { data: result.data, size: result.size, dmaEnabled, type: result.type, resourceAddr };
}

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

  fs.writeFileSync(path.join(OUTPUT_DIR, filename), buffer);
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

  const romData = fs.readFileSync(ROM_PATH);
  const rom = new Uint8Array(romData);

  const resourceId = 0x8001;
  console.log(`加载资源 ID: 0x${resourceId.toString(16).toUpperCase()}`);

  try {
    const result = loadResource(rom, resourceId);
    console.log(`解压完成!`);
    console.log(`  类型: ${result.type}`);
    console.log(`  ROM地址: 0x${result.resourceAddr.toString(16).toUpperCase()}`);
    console.log(`  大小: ${result.size} 字节`);
    console.log(`  DMA: ${result.dmaEnabled}`);

    const numTiles = Math.floor(result.size / 32);
    console.log(`  Tile 数量: ${numTiles}`);

    const grayPalette = [];
    for (let i = 0; i < 16; i++) {
      const v = Math.floor(i * 255 / 15);
      grayPalette[i] = { r: v, g: v, b: v };
    }

    renderTileSheet(result.data, Math.min(numTiles, 512), grayPalette, 'resource-0x8001-tiles.bmp');

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
