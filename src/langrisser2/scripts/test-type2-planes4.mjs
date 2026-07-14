
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
  
  console.log(`Type 2: compressed=${compressed}, planes=${planes}`);
  
  if (!compressed) {
    const size = readWord(resourceAddr + 2);
    const outputSize = size * planes * 8;
    const output = new Uint8Array(outputSize);
    for (let i = 0; i < outputSize; i++) {
      output[i] = readByte(resourceAddr + 4 + i);
    }
    return { data: output, size: outputSize, type: 2, planes };
  }
  
  // 查找表
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
  
  console.log(`  size=${size}, planeCount=${planeCount}, outputSize=${outputSize}, tileCount=${tileCount}`);
  
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
    
    // 位平面重组
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
  
  return { data: output, size: outputSize, type: 2, planes };
}

// 测试 Entry 215 (planes=4)
const RESOURCE_TABLE = 0x000b0000;

console.log('=== Entry 215 (planes=4) ===');
const ptr215 = readLong(RESOURCE_TABLE + 215 * 4);
console.log(`ROM地址: 0x${ptr215.toString(16)}`);
const res215 = decompressType2(ptr215);
console.log(`解压大小: ${res215.size} bytes (${Math.floor(res215.size/32)} tiles)`);

// 保存
fs.writeFileSync(path.join(__dirname, '../20260713/output/entry-215.bin'), res215.data);

// 与 VRAM 对比
console.log('\n=== 与 VRAM 对比:');
let matchCount = 0;
const compareTiles = Math.min(Math.floor(res215.size / 32), 100);
const vramTiles = Math.floor(vram.length / 32);

// 对资源中的每个tile，检查VRAM中是否存在
let foundInVram = 0;
for (let rt = 0; rt < Math.floor(res215.size / 32); rt++) {
  const rOffset = rt * 32;
  let found = false;
  
  for (let vt = 0; vt < vramTiles; vt++) {
    const vOffset = vt * 32;
    let match = true;
    for (let b = 0; b < 32; b++) {
      if (res215.data[rOffset + b] !== vram[vOffset + b]) {
        match = false;
        break;
      }
    }
    if (match) { found = true; break; }
  }
  
  if (found) foundInVram++;
}
console.log(`资源中 ${foundInVram} / ${Math.floor(res215.size / 32)} 个tile在VRAM中找到`);

// 测试 Entry 229 (planes=4)
console.log('\n=== Entry 229 (planes=4) ===');
const ptr229 = readLong(RESOURCE_TABLE + 229 * 4);
console.log(`ROM地址: 0x${ptr229.toString(16)}`);
const res229 = decompressType2(ptr229);
console.log(`解压大小: ${res229.size} bytes (${Math.floor(res229.size/32)} tiles)`);

fs.writeFileSync(path.join(__dirname, '../20260713/output/entry-229.bin'), res229.data);

foundInVram = 0;
for (let rt = 0; rt < Math.floor(res229.size / 32); rt++) {
  const rOffset = rt * 32;
  let found = false;
  
  for (let vt = 0; vt < vramTiles; vt++) {
    const vOffset = vt * 32;
    let match = true;
    for (let b = 0; b < 32; b++) {
      if (res229.data[rOffset + b] !== vram[vOffset + b]) {
        match = false;
        break;
      }
    }
    if (match) { found = true; break; }
  }
  
  if (found) foundInVram++;
}
console.log(`资源中 ${foundInVram} / ${Math.floor(res229.size / 32)} 个tile在VRAM中找到`);

// 打印前几个tile看看
console.log('\n=== Entry 215 前3个tile:');
for (let t = 0; t < 3; t++) {
  console.log(`  Tile ${t}:`);
  for (let y = 0; y < 8; y++) {
    let line = '    ';
    for (let p = 0; p < 4; p++) {
      line += res215.data[t*32 + y*4 + p].toString(16).padStart(2, '0') + ' ';
    }
    console.log(line);
  }
}

console.log('\n=== VRAM tile 0x100-0x102:');
for (let t = 0; t < 3; t++) {
  const vt = 0x100 + t;
  console.log(`  Tile 0x${vt.toString(16)}:`);
  for (let y = 0; y < 8; y++) {
    let line = '    ';
    for (let p = 0; p < 4; p++) {
      line += vram[vt*32 + y*4 + p].toString(16).padStart(2, '0') + ' ';
    }
    console.log(line);
  }
}
