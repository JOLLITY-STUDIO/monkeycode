
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const VRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');

const rom = fs.readFileSync(ROM_PATH);
const vram = fs.readFileSync(VRAM_PATH);

function readByte(o) { return rom[o] & 0xff; }
function readWord(o) { return ((rom[o] & 0xff) << 8) | (rom[o+1] & 0xff); }
function readLong(o) { return ((rom[o]&0xff)<<24)|((rom[o+1]&0xff)<<16)|((rom[o+2]&0xff)<<8)|(rom[o+3]&0xff); }

// Type 2 解压
function decompressType2(resourceAddr) {
  const b1 = readByte(resourceAddr + 1);
  const compressed = (b1 & 0x80) !== 0;
  const planes = b1 & 0x7f;
  
  if (!compressed) {
    const size = readWord(resourceAddr + 2);
    const outputSize = size * planes * 8;
    const output = new Uint8Array(outputSize);
    for (let i = 0; i < outputSize; i++) {
      output[i] = readByte(resourceAddr + 4 + i);
    }
    return { data: output, size: outputSize, planes, compressed };
  }
  
  const lookupTable = new Uint8Array(16);
  for (let i = 0; i < 8; i++) {
    const b = readByte(resourceAddr + 2 + i);
    lookupTable[i*2] = (b >> 4) & 0x0f;
    lookupTable[i*2+1] = b & 0x0f;
  }
  
  const size = readWord(resourceAddr + 10);
  const ctrlStart = resourceAddr + 12;
  const pixelStart = ctrlStart + size;
  
  let planeCount = planes;
  if (planeCount !== 2) planeCount ^= 5;
  
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
        tileOutput[outWordPos*2] = (pixels >> 8) & 0xff;
        tileOutput[outWordPos*2+1] = pixels & 0xff;
        outWordPos++;
      }
    }
    
    output.set(tileOutput, tile * 32);
  }
  
  return { data: output, size: outputSize, planes, compressed };
}

// 构建 VRAM tile 哈希表 (用于快速查找)
const vramTileSet = new Set();
const vramTileCount = Math.floor(vram.length / 32);

function tileToKey(data, offset) {
  let key = '';
  for (let i = 0; i < 32; i++) {
    key += String.fromCharCode(data[offset + i]);
  }
  return key;
}

for (let i = 0; i < vramTileCount; i++) {
  vramTileSet.add(tileToKey(vram, i * 32));
}

console.log(`VRAM 共 ${vramTileCount} 个 tile, 唯一 tile 数: ${vramTileSet.size}\n`);

// 扫描所有 Type 2 资源
const RESOURCE_TABLE = 0x000b0000;
console.log('=== 所有 Type 2 资源的 VRAM 匹配率 ===\n');

const results = [];
for (let i = 0; i < 256; i++) {
  const ptr = readLong(RESOURCE_TABLE + i * 4);
  if (ptr === 0 || ptr >= rom.length) continue;
  
  const type = readByte(ptr);
  if (type !== 2) continue;
  
  try {
    const res = decompressType2(ptr);
    const numTiles = Math.floor(res.size / 32);
    
    let matched = 0;
    for (let t = 0; t < numTiles; t++) {
      if (vramTileSet.has(tileToKey(res.data, t * 32))) {
        matched++;
      }
    }
    
    results.push({
      entry: i,
      addr: ptr,
      planes: res.planes,
      compressed: res.compressed,
      numTiles,
      matched,
      ratio: matched / numTiles,
    });
  } catch (e) {
    // 跳过失败的
  }
}

// 按匹配数排序
results.sort((a, b) => b.matched - a.matched);

console.log(`Entry | planes | 压缩 | tiles | 匹配 | 匹配率`);
console.log(`------|--------|------|-------|------|--------`);
for (const r of results.slice(0, 30)) {
  console.log(`${r.entry.toString().padStart(5)} | ${r.planes.toString().padStart(6)} | ${r.compressed ? ' 是 ' : ' 否 '} | ${r.numTiles.toString().padStart(5)} | ${r.matched.toString().padStart(4)} | ${(r.ratio*100).toFixed(1)}%`);
}

// 看看 Entry 229 匹配的 tile 在 VRAM 中的分布
console.log('\n=== Entry 229 匹配详情 ===');
const ptr229 = readLong(RESOURCE_TABLE + 229 * 4);
const res229 = decompressType2(ptr229);

const matchedTiles = [];
const vramTileMap = new Map();

// 构建VRAM tile反向映射
for (let i = 0; i < vramTileCount; i++) {
  const key = tileToKey(vram, i * 32);
  if (!vramTileMap.has(key)) {
    vramTileMap.set(key, []);
  }
  vramTileMap.get(key).push(i);
}

for (let t = 0; t < Math.floor(res229.size/32); t++) {
  const key = tileToKey(res229.data, t * 32);
  if (vramTileMap.has(key)) {
    matchedTiles.push({ resTile: t, vramTiles: vramTileMap.get(key) });
  }
}

console.log(`匹配的 resource tiles: ${matchedTiles.length}`);
console.log('前20个匹配:');
for (const m of matchedTiles.slice(0, 20)) {
  console.log(`  res tile ${m.resTile} → VRAM tiles: ${m.vramTiles.slice(0,5).map(t => '0x'+t.toString(16)).join(', ')}${m.vramTiles.length > 5 ? `... (${m.vramTiles.length}个)` : ''}`);
}
