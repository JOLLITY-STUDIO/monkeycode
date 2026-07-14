const fs = require('fs');
const path = require('path');

const VRAM_PATH = path.join(__dirname, '..', '20260713', 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const CRAM_PATH = path.join(__dirname, '..', '20260713', 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const OUTPUT_DIR = path.join(__dirname, '..', '20260713', 'output');

function cramToRGB(cramValue) {
  const r = (cramValue & 0x07) * 36;
  const g = ((cramValue >> 3) & 0x07) * 36;
  const b = ((cramValue >> 6) & 0x07) * 36;
  return { r, g, b };
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

function decodeTileFlipped(vram, tileAddr, hFlip, vFlip, output, outputOffset = 0) {
  decodeTile(vram, tileAddr, output, outputOffset);
  if (hFlip) {
    for (let y = 0; y < 8; y++) {
      const rowStart = outputOffset + y * 8;
      for (let x = 0; x < 4; x++) {
        const tmp = output[rowStart + x];
        output[rowStart + x] = output[rowStart + 7 - x];
        output[rowStart + 7 - x] = tmp;
      }
    }
  }
  if (vFlip) {
    for (let y = 0; y < 4; y++) {
      const row1 = outputOffset + y * 8;
      const row2 = outputOffset + (7 - y) * 8;
      for (let x = 0; x < 8; x++) {
        const tmp = output[row1 + x];
        output[row1 + x] = output[row2 + x];
        output[row2 + x] = tmp;
      }
    }
  }
}

function parseNameTableEntry(vram, addr) {
  const lo = vram[addr & 0xFFFF];
  const hi = vram[(addr + 1) & 0xFFFF];
  const word = (hi << 8) | lo;
  return {
    tileIndex: word & 0x07FF,
    hFlip: !!(word & 0x1000),
    vFlip: !!(word & 0x0800),
    palette: (word >> 13) & 0x03,
    priority: (word >> 15) & 0x01,
  };
}

function readCRAM(cram, index) {
  const off = (index & 0x3F) * 2;
  return (cram[off + 1] << 8) | cram[off];
}

function renderPlane(vram, cram, planeBase, width, height, priorityFilter = -1) {
  const pixels = new Uint8ClampedArray(width * height * 4);
  const planeWidthTiles = 64;
  const tilePixels = new Uint8Array(64);

  for (let py = 0; py < height; py++) {
    const tileY = Math.floor(py / 8);
    const pixelY = py % 8;
    for (let px = 0; px < width; px++) {
      const tileX = Math.floor(px / 8);
      const pixelX = px % 8;

      const entryAddr = planeBase + (tileY * planeWidthTiles + tileX) * 2;
      const entry = parseNameTableEntry(vram, entryAddr);

      if (priorityFilter !== -1 && entry.priority !== priorityFilter) continue;

      const tAddr = entry.tileIndex * 32;
      decodeTileFlipped(vram, tAddr, entry.hFlip, entry.vFlip, tilePixels, 0);

      const pixelValue = tilePixels[pixelY * 8 + pixelX];
      if (pixelValue === 0) continue;

      const colorIdx = entry.palette * 16 + pixelValue;
      const cramValue = readCRAM(cram, colorIdx);
      const { r, g, b } = cramToRGB(cramValue);

      const outIdx = (py * width + px) * 4;
      pixels[outIdx] = r;
      pixels[outIdx + 1] = g;
      pixels[outIdx + 2] = b;
      pixels[outIdx + 3] = 255;
    }
  }
  return pixels;
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

function main() {
  console.log('=== 标题画面 VRAM/CRAM dump 渲染验证 ===\n');

  const vram = fs.readFileSync(VRAM_PATH);
  const cramRaw = fs.readFileSync(CRAM_PATH);

  console.log(`VRAM dump: ${vram.length} bytes`);
  console.log(`CRAM dump: ${cramRaw.length} bytes`);

  const cram = new Uint8Array(128);
  const cramCopyLen = Math.min(cramRaw.length, 128);
  for (let i = 0; i < cramCopyLen; i++) {
    cram[i] = cramRaw[i];
  }

  console.log(`\nCRAM 内容 (前 32 色, little-endian):`);
  for (let i = 0; i < 32; i++) {
    const cv = readCRAM(cram, i);
    const rgb = cramToRGB(cv);
    if (i % 8 === 0) process.stdout.write(`\n  [${i.toString().padStart(2,'0')}]: `);
    process.stdout.write(`0x${cv.toString(16).padStart(4,'0')}(${rgb.r},${rgb.g},${rgb.b}) `);
  }
  console.log('\n');

  const width = 320;
  const height = 224;

  const bgColorIdx = 4;
  const bgCram = readCRAM(cram, bgColorIdx);
  const bgRGB = cramToRGB(bgCram);
  console.log(`背景色 CRAM[${bgColorIdx}]: 0x${bgCram.toString(16).padStart(4,'0')} → rgb(${bgRGB.r},${bgRGB.g},${bgRGB.b})`);

  const planeABase = 0xC000;
  const planeBBase = 0xE000;

  console.log(`Plane A base: 0x${planeABase.toString(16).toUpperCase()}`);
  console.log(`Plane B base: 0x${planeBBase.toString(16).toUpperCase()}`);

  function createBackground() {
    const pixels = new Uint8ClampedArray(width * height * 4);
    for (let i = 0; i < width * height; i++) {
      const idx = i * 4;
      pixels[idx] = bgRGB.r;
      pixels[idx + 1] = bgRGB.g;
      pixels[idx + 2] = bgRGB.b;
      pixels[idx + 3] = 255;
    }
    return pixels;
  }

  function overlayPixels(base, overlay) {
    for (let i = 0; i < width * height; i++) {
      const idx = i * 4;
      if (overlay[idx + 3] > 0) {
        base[idx] = overlay[idx];
        base[idx + 1] = overlay[idx + 1];
        base[idx + 2] = overlay[idx + 2];
        base[idx + 3] = 255;
      }
    }
  }

  console.log('\n--- 分层渲染 ---');

  const planeALow = renderPlane(vram, cram, planeABase, width, height, 0);
  saveBMP(planeALow, width, height, 'verify-planeA-low.bmp');

  const planeAHigh = renderPlane(vram, cram, planeABase, width, height, 1);
  saveBMP(planeAHigh, width, height, 'verify-planeA-high.bmp');

  const planeBLow = renderPlane(vram, cram, planeBBase, width, height, 0);
  saveBMP(planeBLow, width, height, 'verify-planeB-low.bmp');

  const planeBHigh = renderPlane(vram, cram, planeBBase, width, height, 1);
  saveBMP(planeBHigh, width, height, 'verify-planeB-high.bmp');

  console.log('\n--- 组合渲染 ---');

  const finalPixels = createBackground();
  overlayPixels(finalPixels, planeBLow);
  overlayPixels(finalPixels, planeALow);
  overlayPixels(finalPixels, planeBHigh);
  overlayPixels(finalPixels, planeAHigh);
  saveBMP(finalPixels, width, height, 'verify-title-final.bmp');

  function countEntries(planeBase, name) {
    let total = 0;
    let highPri = 0;
    let lowPri = 0;
    let nonZero = 0;
    const palCount = [0, 0, 0, 0];

    for (let y = 0; y < 28; y++) {
      for (let x = 0; x < 40; x++) {
        const addr = planeBase + (y * 64 + x) * 2;
        const entry = parseNameTableEntry(vram, addr);
        total++;
        if (entry.priority === 1) highPri++;
        else lowPri++;
        if (entry.tileIndex !== 0) nonZero++;
        palCount[entry.palette]++;
      }
    }

    console.log(`\n${name} (40x28 可视区域):`);
    console.log(`  总条目: ${total}`);
    console.log(`  高优先级: ${highPri}`);
    console.log(`  低优先级: ${lowPri}`);
    console.log(`  非空 tile: ${nonZero}`);
    console.log(`  调色板分布: pal0=${palCount[0]}, pal1=${palCount[1]}, pal2=${palCount[2]}, pal3=${palCount[3]}`);
  }

  countEntries(planeABase, 'Plane A');
  countEntries(planeBBase, 'Plane B');

  console.log('\n完成!');
}

main();
