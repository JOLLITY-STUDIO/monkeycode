
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const VRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const CRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const OUTPUT_DIR = path.join(__dirname, '../20260713/output/resources');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const rom = fs.readFileSync(ROM_PATH);
const vram = fs.readFileSync(VRAM_PATH);
const cram = fs.readFileSync(CRAM_PATH);

console.log(`ROM: ${rom.length} bytes (${(rom.length/1024/1024).toFixed(2)} MB)`);
console.log(`VRAM: ${vram.length} bytes`);
console.log(`CRAM: ${cram.length} bytes`);

// ROM读取辅助函数
function readByte(offset) { return rom[offset] & 0xff; }
function readWord(offset) { return ((rom[offset] & 0xff) << 8) | (rom[offset + 1] & 0xff); }
function readLong(offset) {
  return ((rom[offset] & 0xff) << 24) | ((rom[offset + 1] & 0xff) << 16) |
         ((rom[offset + 2] & 0xff) << 8) | (rom[offset + 3] & 0xff);
}

// 资源指针表查找
const RESOURCE_POINTER_TABLE_BASE = 0x000b0000;

function resolveResourcePointer(resourceId, originalD0) {
  const shiftCount = (originalD0 & 0xffff) % 64;
  const index = (resourceId & 0x7fff) >> shiftCount;
  const entryAddr = RESOURCE_POINTER_TABLE_BASE + index * 4;
  return readLong(entryAddr);
}

// Type 3: LZSS 解压
function decompressLZSS(resourceAddr) {
  const headerAddr = resourceAddr + 1;
  const decompressedSize = readWord(headerAddr);
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
  return { data: output, size: decompressedSize, type: 3 };
}

// Type 2: 位平面压缩
function decompressType2(resourceAddr) {
  const b1 = readByte(resourceAddr + 1);
  const compressed = (b1 & 0x80) !== 0;
  const planes = b1 & 0x7f;
  
  if (!compressed) {
    const size = readWord(resourceAddr + 2);
    const outputSize = size * planes * 8;
    const data = new Uint8Array(outputSize);
    for (let i = 0; i < outputSize; i++) {
      data[i] = readByte(resourceAddr + 4 + i);
    }
    return { data, size: outputSize, type: 2 };
  }
  
  // 压缩分支
  const lookupTable = new Uint8Array(16);
  for (let i = 0; i < 8; i++) {
    const b = readByte(resourceAddr + 2 + i);
    lookupTable[i * 2] = (b >> 4) & 0x0f;
    lookupTable[i * 2 + 1] = b & 0x0f;
  }
  
  const size = readWord(resourceAddr + 10);
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
      const ctrlByte = readByte(ctrlPos++);
      for (let bit = 7; bit >= 0; bit--) {
        const isData = (ctrlByte >> bit) & 1;
        if (isData) {
          for (let p = 0; p < planes; p++) {
            workBuf[workPos++] = readByte(pixelPos++);
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

// Type 1: Nibble RLE
function decompressNibbleRLE(resourceAddr) {
  const sizeAddr = resourceAddr + 1;
  const totalBytes = readWord(sizeAddr);
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
    d5 = ((d5 << 4) & 0xffff) | (nibble & 0x0f);
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
    let bVar9, puVar11;
    
    if (bVar2) {
      bVar9 = (readByte(puVar12) >> 4) & 0x0f;
      puVar11 = puVar12;
    } else {
      puVar11 = puVar12 + 1;
      bVar9 = readByte(puVar12) & 0x0f;
    }
    puVar12 = puVar11;
    
    if (bVar9 === bVar7) {
      let uVar8;
      if (bVar3) {
        uVar8 = (readByte(puVar11) >> 4) & 0x0f;
      } else {
        puVar12 = puVar11 + 1;
        uVar8 = readByte(puVar11) & 0x0f;
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

function loadResource(d0) {
  const d2 = d0;
  const dmaEnabled = (d0 & 0x8000) !== 0;
  const resourceId = d0 & 0x7fff;
  const resourceAddr = resolveResourcePointer(resourceId, d2);
  
  const typeCode = readByte(resourceAddr);
  
  let result;
  if (typeCode === 3) {
    result = decompressLZSS(resourceAddr);
  } else if (typeCode === 1) {
    result = decompressNibbleRLE(resourceAddr);
  } else if (typeCode === 2) {
    result = decompressType2(resourceAddr);
  } else {
    throw new Error(`未知资源类型: ${typeCode}`);
  }
  
  return { ...result, dmaEnabled };
}

// ============ 开始分析 ============

console.log('\n=== 测试资源 0x8001 (Entry 0) ===');
try {
  const result = loadResource(0x8001);
  console.log(`  类型: Type ${result.type}`);
  console.log(`  解压大小: ${result.size} bytes (${Math.floor(result.size/32)} tiles)`);
  console.log(`  DMA: ${result.dmaEnabled}`);
  
  const outPath = path.join(OUTPUT_DIR, 'resource-0x8001.bin');
  fs.writeFileSync(outPath, result.data);
  
  // 对比VRAM前256字节
  let matchCount = 0;
  const compareLen = Math.min(result.size, 256);
  for (let i = 0; i < compareLen; i++) {
    if (result.data[i] === vram[i]) matchCount++;
  }
  console.log(`  前${compareLen}字节匹配率: ${((matchCount/compareLen)*100).toFixed(1)}%`);
} catch (e) {
  console.log('  解压失败:', e.message);
}

console.log('\n=== 收集所有资源信息 ===');
const allResources = [];
for (let i = 0; i < 256; i++) {
  const entryAddr = RESOURCE_POINTER_TABLE_BASE + i * 4;
  const ptr = readLong(entryAddr);
  if (ptr !== 0 && ptr < rom.length) {
    const type = readByte(ptr);
    allResources.push({ index: i, address: ptr, type });
  }
}
console.log(`共 ${allResources.length} 个有效资源`);

console.log('\n=== 批量解压并搜索VRAM匹配 ===');
console.log('(可能需要一点时间...)\n');

// 解压所有资源并保存
const decompressedResources = [];
for (const info of allResources) {
  try {
    const d0 = 0x8000 | info.index;
    const result = loadResource(d0);
    decompressedResources.push({
      index: info.index,
      type: info.type,
      address: info.address,
      size: result.size,
      data: result.data,
    });
    
    // 保存到文件
    const fileName = `resource-${info.index.toString().padStart(3, '0')}-type${info.type}.bin`;
    fs.writeFileSync(path.join(OUTPUT_DIR, fileName), result.data);
  } catch (e) {
    // 跳过失败的
  }
}

console.log(`成功解压 ${decompressedResources.length} 个资源\n`);

// 按大小排序，找大的tile资源（标题画面应该比较大）
console.log('=== 按大小排序的前20个资源 ===');
const sorted = [...decompressedResources].sort((a, b) => b.size - a.size);
for (let i = 0; i < 20 && i < sorted.length; i++) {
  const r = sorted[i];
  const numTiles = Math.floor(r.size / 32);
  console.log(`  #${i+1}: Entry ${r.index.toString().padStart(3)} - Type ${r.type} - ${r.size.toString().padStart(6)}B (${numTiles.toString().padStart(4)} tiles)`);
}

// 搜索VRAM中的tile在哪些资源中出现
// 取VRAM中tile 0x100处的指纹（通常是字体或UI元素）
console.log('\n=== 搜索VRAM匹配 ===');

// 取几个关键tile指纹
const fingerprintTiles = [0, 0x10, 0x100, 0x200, 0x400];

for (const tileIdx of fingerprintTiles) {
  const tileOffset = tileIdx * 32;
  if (tileOffset + 32 > vram.length) continue;
  
  const fingerprint = vram.slice(tileOffset, tileOffset + 32);
  const hex = Array.from(fingerprint).map(b => b.toString(16).padStart(2, '0')).join(' ');
  
  console.log(`\nVRAM tile 0x${tileIdx.toString(16)} (offset 0x${tileOffset.toString(16)}):`);
  console.log(`  指纹: ${hex}`);
  
  // 搜索所有资源
  const matches = [];
  for (const res of decompressedResources) {
    if (res.size < 32) continue;
    
    for (let off = 0; off <= res.size - 32; off += 32) { // tile对齐搜索
      let match = true;
      for (let i = 0; i < 32; i++) {
        if (res.data[off + i] !== fingerprint[i]) { match = false; break; }
      }
      if (match) {
        matches.push({ entry: res.index, offset: off, tile: off / 32 });
        break; // 每个资源只报告第一个匹配
      }
    }
  }
  
  if (matches.length > 0) {
    console.log(`  找到 ${matches.length} 个匹配资源:`);
    for (const m of matches) {
      console.log(`    Entry ${m.entry} - tile 0x${m.tile.toString(16)} (offset 0x${m.offset.toString(16)})`);
    }
  } else {
    console.log('  无匹配');
  }
}

console.log('\n=== 完成 ===');
console.log(`所有资源已解压到: ${OUTPUT_DIR}`);
