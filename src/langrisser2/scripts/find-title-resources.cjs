const fs = require('fs');
const path = require('path');

const ROM_PATH = path.join(__dirname, '..', '20260713', 'Langrisser II (Japan)_68K-gens-rom-dump.bin');
const VRAM_PATH = path.join(__dirname, '..', '20260713', 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const OUTPUT_DIR = path.join(__dirname, '..', '20260713', 'output');

const RESOURCE_POINTER_TABLE_BASE = 0x000b0000;
const MAX_RESOURCES = 200;

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

  try {
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
  } catch (e) {
    return { data: output.slice(0, outputPos), size: outputPos, type: 3, error: e.message };
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

  try {
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
  } catch (e) {
    return { data: output.slice(0, outputPos), size: outputBytes, type: 1, error: e.message };
  }

  return { data: output, size: totalBytes, type: 1 };
}

function decompressType2(rom, resourceAddr) {
  try {
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
  } catch (e) {
    return { data: new Uint8Array(0), size: 0, type: 2, error: e.message };
  }
}

function dispatchByType(rom, resourceAddr) {
  try {
    const typeCode = readByte(rom, resourceAddr);
    if (typeCode === 3) return decompressLZSS(rom, resourceAddr);
    if (typeCode === 1) return decompressNibbleRLE(rom, resourceAddr);
    if (typeCode === 2) return decompressType2(rom, resourceAddr);
    return { data: new Uint8Array(0), size: 0, type: typeCode, error: `Unknown type: ${typeCode}` };
  } catch (e) {
    return { data: new Uint8Array(0), size: 0, type: -1, error: e.message };
  }
}

function loadResource(rom, d0) {
  const d2 = d0;
  const dmaEnabled = (d0 & 0x8000) !== 0;
  const resourceId = d0 & 0x7fff;
  const resourceAddr = resolveResourcePointer(rom, resourceId, d2);
  const result = dispatchByType(rom, resourceAddr);
  return { ...result, dmaEnabled, resourceAddr, resourceId };
}

function hashTile(data, tileAddr) {
  let hash = 0;
  for (let i = 0; i < 32; i++) {
    hash = ((hash << 5) - hash + data[tileAddr + i]) | 0;
  }
  return hash;
}

function main() {
  console.log('=== 批量资源扫描：寻找标题画面 tile 资源 ===\n');

  const romData = fs.readFileSync(ROM_PATH);
  const rom = new Uint8Array(romData);
  const vram = fs.readFileSync(VRAM_PATH);

  const vramTileHashes = new Map();
  for (let i = 0; i < 2048; i++) {
    const hash = hashTile(vram, i * 32);
    if (!vramTileHashes.has(hash)) {
      vramTileHashes.set(hash, []);
    }
    vramTileHashes.get(hash).push(i);
  }
  console.log(`VRAM 中共有 ${vramTileHashes.size} 种不同的 tile (2048 个 total)\n`);

  const tileResources = [];

  for (let i = 0; i < MAX_RESOURCES; i++) {
    const resourceId = 0x8000 | i;
    try {
      const result = loadResource(rom, resourceId);
      if (result.error || result.size === 0) continue;
      if (result.size < 32) continue;

      const numTiles = Math.floor(result.size / 32);
      if (numTiles < 4) continue;

      let matchCount = 0;
      const firstTileHash = hashTile(result.data, 0);
      const firstTileInVram = vramTileHashes.has(firstTileHash);

      for (let t = 0; t < Math.min(numTiles, 50); t++) {
        const hash = hashTile(result.data, t * 32);
        if (vramTileHashes.has(hash)) matchCount++;
      }

      const matchRate = matchCount / Math.min(numTiles, 50);
      if (matchRate > 0.3 || firstTileInVram) {
        tileResources.push({
          id: i,
          resourceId: `0x${resourceId.toString(16).toUpperCase()}`,
          type: result.type,
          size: result.size,
          numTiles,
          matchRate: (matchRate * 100).toFixed(1) + '%',
          matchCount,
          resourceAddr: `0x${result.resourceAddr.toString(16).toUpperCase()}`,
          firstTileInVram,
        });
      }
    } catch (e) {
      // 跳过错误的资源
    }
  }

  console.log(`\n找到 ${tileResources.length} 个可能的 tile 资源 (匹配率 > 30% 或首tile在VRAM中):\n`);
  console.log('ID     | 类型 | 大小    | Tile数 | 匹配率  | 资源地址');
  console.log('-------|------|---------|--------|---------|----------');

  tileResources.sort((a, b) => b.matchCount - a.matchCount);

  for (const r of tileResources.slice(0, 30)) {
    console.log(
      `${r.id.toString().padStart(3)} (${r.resourceId}) | type${r.type} | ${r.size.toString().padStart(7)} | ${r.numTiles.toString().padStart(6)} | ${r.matchRate.padStart(7)} | ${r.resourceAddr}`
    );
  }

  console.log('\n完成!');
}

main();
