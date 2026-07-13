/**
 * Langrisser II - 精灵图完整提取系统
 * 
 * 从 ROM dump 中提取所有角色/佣兵/武器/特效的精灵 tile 数据，
 * 解码 Genesis 4bpp 格式，拼凑成完整精灵图，并导出 PNG + JSON。
 * 
 * 关键 ROM 地址:
 *   0x080CBC - 精灵定义表 (0xC0 = 192 字节/条目)
 *   0x080328 - 场景精灵脚本指针表
 *   0x080674 - 场景精灵脚本指针表2
 *   0x0B0000 - 资源指针表 (tile 图形数据)
 * 
 * 精灵 tile 4bpp 格式 (32 字节/tile):
 *   8 行 x 4 字节/行, 每字节 8 像素
 *   4 个位平面交错: byte0=plane0, byte1=plane1, byte2=plane2, byte3=plane3
 */

const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// ============================================================
// ROM 读取
// ============================================================
let rom;
function readROM(addr) { return rom[addr & 0xFFFFF] & 0xFF; }
function readWord(addr) { return ((rom[addr] & 0xFF) << 8) | (rom[addr + 1] & 0xFF); }
function readLong(addr) { return ((rom[addr] & 0xFF) << 24) | ((rom[addr + 1] & 0xFF) << 16) | ((rom[addr + 2] & 0xFF) << 8) | (rom[addr + 3] & 0xFF); }

// ============================================================
// Genesis 4bpp tile 解码
// ============================================================
function decodeTile(tileData, offset) {
  const pixels = new Uint8Array(64); // 8x8
  for (let y = 0; y < 8; y++) {
    const rowBase = offset + y * 4;
    const p0 = tileData[rowBase];
    const p1 = tileData[rowBase + 1];
    const p2 = tileData[rowBase + 2];
    const p3 = tileData[rowBase + 3];
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      pixels[y * 8 + x] = ((p0 >> bit) & 1) | ((p1 >> bit) & 1) << 1 | ((p2 >> bit) & 1) << 2 | ((p3 >> bit) & 1) << 3;
    }
  }
  return pixels;
}

// ============================================================
// LZSS 解压器 (Type 3 资源)
// ============================================================
function decompressLZSS(romAddr) {
  // 跳过类型码(1) + 大小(2)
  const decompSize = readWord(romAddr + 1);
  const srcStart = romAddr + 3;
  
  const window = new Uint8Array(0x1000).fill(0x20);
  let winPos = 0x0FEE;
  const output = new Uint8Array(decompSize);
  let outPos = 0;
  let srcPos = srcStart;
  let remaining = decompSize;
  
  while (remaining > 0) {
    const flag = readROM(srcPos++);
    for (let bit = 0; bit < 8 && remaining > 0; bit++) {
      if ((flag >> bit) & 1) {
        const b = readROM(srcPos++);
        window[winPos] = b;
        output[outPos++] = b;
        winPos = (winPos + 1) & 0xFFF;
        remaining--;
      } else {
        const b1 = readROM(srcPos++);
        const b2 = readROM(srcPos++);
        let matchOff = (b1 | ((b2 & 0xF0) << 4)) & 0xFFF;
        const matchLen = (b2 & 0x0F) + 2;
        for (let i = 0; i < matchLen && remaining > 0; i++) {
          const b = window[matchOff];
          window[winPos] = b;
          output[outPos++] = b;
          matchOff = (matchOff + 1) & 0xFFF;
          winPos = (winPos + 1) & 0xFFF;
          remaining--;
        }
      }
    }
  }
  return output;
}

// ============================================================
// Type 2 位平面压缩解压
// ============================================================
function decompressType2(romAddr) {
  const b1 = readROM(romAddr + 1);
  const compressed = (b1 & 0x80) !== 0;
  const planes = b1 & 0x7F;
  
  if (!compressed) {
    const size = readWord(romAddr + 2);
    return rom.subarray(romAddr + 4, romAddr + 4 + size * planes * 8);
  }
  
  // 查找表 (16 nibbles from 8 bytes)
  const lookup = new Uint8Array(16);
  for (let i = 0; i < 8; i++) {
    const b = readROM(romAddr + 2 + i);
    lookup[i * 2] = (b >> 4) & 0xF;
    lookup[i * 2 + 1] = b & 0xF;
  }
  
  const size = readWord(romAddr + 10);
  let planeCount = planes;
  if (planeCount !== 2) planeCount ^= 5;
  
  const ctrlStart = romAddr + 12;
  const pixelStart = ctrlStart + size;
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
      const ctrlByte = readROM(ctrlPos++);
      for (let bit = 7; bit >= 0; bit--) {
        if ((ctrlByte >> bit) & 1) {
          for (let p = 0; p < planes; p++) workBuf[workPos++] = readROM(pixelPos++);
        } else {
          for (let p = 0; p < planes; p++) workBuf[workPos++] = 0;
        }
      }
    }
    
    // 位平面重组
    const tileOut = new Uint8Array(32);
    let outWordPos = 0;
    const numPlanes = Math.min(planeCount, 4);
    
    for (let outer = 0; outer < 4; outer++) {
      const planeShorts = [];
      for (let p = 0; p < numPlanes; p++) {
        const bo = (outer + p * 4) * 2;
        planeShorts.push((workBuf[bo] << 8) | workBuf[bo + 1]);
      }
      for (let inner = 0; inner < 4; inner++) {
        let pixels = 0;
        for (let pix = 0; pix < 4; pix++) {
          const bit0 = numPlanes > 0 ? (planeShorts[0] & 0x8000 ? 1 : 0) : 0;
          const bit1 = numPlanes > 1 ? (planeShorts[1] & 0x8000 ? 1 : 0) : 0;
          const bit2 = numPlanes > 2 ? (planeShorts[2] & 0x8000 ? 1 : 0) : 0;
          const bit3 = numPlanes > 3 ? (planeShorts[3] & 0x8000 ? 1 : 0) : 0;
          const idx = (bit3 << 3) | (bit1 << 2) | (bit2 << 1) | bit0;
          pixels = (pixels << 4) | lookup[idx];
          for (let p = 0; p < numPlanes; p++) planeShorts[p] = (planeShorts[p] << 1) & 0xFFFF;
        }
        tileOut[outWordPos * 2] = (pixels >> 8) & 0xFF;
        tileOut[outWordPos * 2 + 1] = pixels & 0xFF;
        outWordPos++;
      }
    }
    output.set(tileOut, tile * 32);
  }
  return output;
}

// ============================================================
// Nibble RLE 解压 (Type 1)
// ============================================================
function decompressNibbleRLE(romAddr) {
  const totalBytes = readWord(romAddr + 1);
  const srcStart = romAddr + 3;
  const output = new Uint8Array(totalBytes);
  
  let d5 = 0, bVar3 = false, bVar7 = 0x7F, sVar6 = 3, outPos = 0, outputBytes = 0;
  let puVar12 = srcStart;
  
  function packNibble(n) {
    d5 = ((d5 << 4) | (n & 0xF)) & 0xFFFF;
    sVar6--;
    if (sVar6 === -1) {
      sVar6 = 3;
      output[outPos++] = (d5 >> 8) & 0xFF;
      output[outPos++] = d5 & 0xFF;
      outputBytes += 2;
    }
  }
  
  while (outputBytes < totalBytes) {
    const bVar2 = !bVar3;
    let bVar9, puVar11;
    if (bVar2) {
      bVar9 = (readROM(puVar12) >> 4) & 0xF;
      puVar11 = puVar12;
    } else {
      puVar11 = puVar12 + 1;
      bVar9 = readROM(puVar12) & 0xF;
    }
    puVar12 = puVar11;
    
    if (bVar9 === bVar7) {
      let uVar8;
      if (bVar3) {
        uVar8 = (readROM(puVar11) >> 4) & 0xF;
      } else {
        puVar12 = puVar11 + 1;
        uVar8 = readROM(puVar11) & 0xF;
      }
      do {
        packNibble(bVar7);
        uVar8 = (uVar8 - 1) & 0xFFFF;
      } while (uVar8 !== 0xFFFF && outputBytes < totalBytes);
    } else {
      packNibble(bVar9);
      bVar3 = bVar2;
      bVar7 = bVar9;
    }
  }
  return output;
}

// ============================================================
// 资源加载
// ============================================================
const RESOURCE_TABLE_BASE = 0x0B0000;

function resolveResourcePointer(resourceId, originalD0) {
  const shiftCount = (originalD0 & 0xFFFF) % 64;
  const index = (resourceId & 0x7FFF) >> shiftCount;
  return readLong(RESOURCE_TABLE_BASE + index * 4);
}

function loadResource(resourceId) {
  const romAddr = resolveResourcePointer(resourceId, resourceId | 0x8000);
  const typeCode = readROM(romAddr);
  
  let data;
  if (typeCode === 1) {
    data = decompressNibbleRLE(romAddr);
  } else if (typeCode === 2) {
    data = decompressType2(romAddr);
  } else if (typeCode === 3) {
    data = decompressLZSS(romAddr);
  } else {
    return null;
  }
  return data;
}

// ============================================================
// 调色板 (CRAM 格式)
// ============================================================
function parseCRAM(cramData) {
  const palette = [];
  for (let i = 0; i < Math.min(16, cramData.length / 2); i++) {
    const word = cramData[i * 2] | (cramData[i * 2 + 1] << 8);
    const r = ((word >> 1) & 0xF) * 17;
    const g = ((word >> 5) & 0xF) * 17;
    const b = ((word >> 9) & 0xF) * 17;
    palette.push([r, g, b]);
  }
  return palette;
}

// 默认精灵调色板 (来自标题画面 CRAM)
const DEFAULT_PALETTES = [
  // Palette 0: 标题/logo
  [[0,0,0],[36,36,109],[182,182,219],[0,0,36],[146,0,0],[219,146,0],[255,219,0],[73,0,146],[146,36,182],[0,0,0],[0,146,73],[255,146,0],[36,36,146],[0,0,0],[182,182,182],[0,0,0]],
  // Palette 1: UI/背景
  [[0,0,0],[255,255,255],[182,182,182],[109,109,109],[36,36,36],[0,255,0],[0,219,0],[0,182,0],[0,146,0],[0,109,0],[0,73,0],[0,36,0],[73,73,73],[146,146,146],[219,219,219],[36,0,0]],
  // Palette 2: 角色精灵
  [[0,0,0],[36,36,36],[73,73,73],[109,109,109],[36,0,0],[146,0,0],[219,0,0],[255,0,0],[0,146,0],[0,109,0],[0,36,0],[255,182,255],[182,146,182],[219,219,219],[255,255,255],[109,0,0]],
  // Palette 3: 天空/水面
  [[0,0,0],[73,73,109],[0,36,73],[0,73,146],[73,109,182],[109,146,219],[146,182,255],[219,255,255],[255,0,109],[255,0,109],[255,0,109],[255,0,109],[255,0,109],[255,0,109],[182,182,182],[36,36,36]],
];

// ============================================================
// 精灵表解析 (ROM 0x080CBC)
// ============================================================
const SPRITE_TABLE = 0x080CBC;
const SPRITE_ENTRY_SIZE = 0xC0; // 192 bytes

/**
 * 精灵表条目格式推测 (0xC0 = 192 bytes):
 *   byte[0]:      flags/type
 *   byte[1]:      宽度 (tiles)
 *   byte[2]:      高度 (tiles)  
 *   byte[3]:      调色板索引
 *   byte[4-5]:    总 tile 数
 *   byte[6-...]:  tile 布局数据 (可变)
 * 
 * 实际需要从 ASM 确认格式，这里先用探索性方法
 */
function parseSpriteEntry(romAddr, index) {
  const data = new Uint8Array(SPRITE_ENTRY_SIZE);
  for (let i = 0; i < SPRITE_ENTRY_SIZE; i++) {
    data[i] = readROM(romAddr + i);
  }
  
  // 尝试解析
  const flags = data[0];
  const widthTiles = data[1] || 4;
  const heightTiles = data[2] || 4;
  const paletteIdx = data[3] & 0x03;
  const tileCount = (data[4] << 8) | data[5] || (widthTiles * heightTiles);
  
  return {
    index,
    flags,
    widthTiles,
    heightTiles,
    paletteIdx,
    tileCount,
    data,
    width: widthTiles * 8,
    height: heightTiles * 8,
  };
}

// ============================================================
// 从 Type 2 资源数据提取 tile
// ============================================================
function extractTilesFromResource(resData) {
  // resData 是解压后的 4bpp tile 数据
  const tileCount = Math.floor(resData.length / 32);
  const tiles = [];
  for (let i = 0; i < tileCount; i++) {
    tiles.push(decodeTile(resData, i * 32));
  }
  return tiles;
}

// ============================================================
// 渲染精灵到 Canvas
// ============================================================
function renderSprite(tiles, widthTiles, heightTiles, palette) {
  const tileSize = 8;
  const canvas = createCanvas(widthTiles * tileSize, heightTiles * tileSize);
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(widthTiles * tileSize, heightTiles * tileSize);
  
  for (let ty = 0; ty < heightTiles; ty++) {
    for (let tx = 0; tx < widthTiles; tx++) {
      const tileIdx = ty * widthTiles + tx;
      if (tileIdx >= tiles.length) continue;
      const tile = tiles[tileIdx];
      
      for (let py = 0; py < tileSize; py++) {
        for (let px = 0; px < tileSize; px++) {
          const colorIdx = tile[py * tileSize + px];
          if (colorIdx === 0) continue; // transparent
          
          const sx = tx * tileSize + px;
          const sy = ty * tileSize + py;
          const imgIdx = (sy * widthTiles * tileSize + sx) * 4;
          const color = palette[colorIdx] || [0, 0, 0];
          imgData.data[imgIdx] = color[0];
          imgData.data[imgIdx + 1] = color[1];
          imgData.data[imgIdx + 2] = color[2];
          imgData.data[imgIdx + 3] = 255;
        }
      }
    }
  }
  
  ctx.putImageData(imgData, 0, 0);
  return canvas;
}

// ============================================================
// 主程序
// ============================================================
async function main() {
  // 加载 ROM
  const romPath = path.join(__dirname, '..', '20260713', 'Langrisser II (Japan).md');
  rom = fs.readFileSync(romPath);
  console.log(`ROM loaded: ${rom.length} bytes`);
  
  const outDir = path.join(__dirname, '..', '20260713', 'output', 'sprites');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  
  // ========================================
  // 1. 分析精灵表 (ROM 0x080CBC)
  // ========================================
  console.log('\n=== 精灵表分析 (0x080CBC) ===');
  const spriteTableSize = SPRITE_ENTRY_SIZE * 50; // 检查前50个条目
  console.log('First sprite entries:');
  for (let i = 0; i < 20; i++) {
    const addr = SPRITE_TABLE + i * SPRITE_ENTRY_SIZE;
    const entry = parseSpriteEntry(addr, i);
    // 只显示有数据的
    if (entry.data.slice(0, 6).some(b => b !== 0)) {
      console.log(`  #${i}: flags=0x${entry.flags.toString(16)} w=${entry.widthTiles} h=${entry.heightTiles} pal=${entry.paletteIdx} tiles=${entry.tileCount} (addr 0x${addr.toString(16)})`);
    }
  }
  
  console.log(`\nNon-zero entries in first 200:`);
  for (let i = 0; i < 200; i++) {
    const addr = SPRITE_TABLE + i * SPRITE_ENTRY_SIZE;
    const flags = readROM(addr);
    const w = readROM(addr + 1);
    const h = readROM(addr + 2);
    const pal = readROM(addr + 3);
    if (flags !== 0 || w !== 0 || h !== 0) {
      console.log(`  #${i}: flags=0x${flags.toString(16)} w=${w} h=${h} pal=${pal}`);
    }
  }
  
  // ========================================
  // 2. 加载资源并尝试渲染 tile
  // ========================================
  console.log('\n=== 资源加载测试 ===');
  
  // 尝试加载一些 Type 2 资源 (位平面压缩 tile)
  const type2Resources = [29, 38, 46, 54, 63, 65, 66];
  console.log('\nLoading Type 2 resources:');
  for (const resIdx of type2Resources) {
    const resourceId = 32768 + resIdx * 2;
    try {
      const data = loadResource(resourceId);
      if (data && data.length > 0) {
        const tileCount = Math.floor(data.length / 32);
        console.log(`  Resource #${resIdx} (0x${resourceId.toString(16)}): ${data.length} bytes = ${tileCount} tiles`);
        
        // 渲染前几个 tile
        if (tileCount > 0) {
          const tiles = extractTilesFromResource(data);
          const wTiles = Math.min(Math.ceil(Math.sqrt(tileCount)), 16);
          const hTiles = Math.ceil(tileCount / wTiles);
          
          const canvas = renderSprite(tiles, wTiles, hTiles, DEFAULT_PALETTES[2]);
          const buf = canvas.toBuffer('image/png');
          fs.writeFileSync(path.join(outDir, `resource_${resIdx}_0x${resourceId.toString(16)}.png`), buf);
          console.log(`    -> Saved resource_${resIdx}.png (${wTiles * 8}x${hTiles * 8})`);
          
          // 导出 JSON tile 数据
          const jsonData = {
            resourceIdx: resIdx,
            resourceId,
            tileCount,
            widthTiles: wTiles,
            heightTiles: hTiles,
            tiles: tiles.map(t => Array.from(t)),
          };
          fs.writeFileSync(path.join(outDir, `resource_${resIdx}_0x${resourceId.toString(16)}.json`), JSON.stringify(jsonData, null, 2));
        }
      }
    } catch (e) {
      console.log(`  Resource #${resIdx}: ERROR - ${e.message}`);
    }
  }
  
  // ========================================
  // 3. 加载 Type 3 (LZSS) 资源
  // ========================================
  const type3Resources = [0, 1, 3, 5, 7];
  console.log('\nLoading Type 3 (LZSS) resources:');
  for (const resIdx of type3Resources) {
    const resourceId = 32768 + resIdx * 2;
    try {
      const data = loadResource(resourceId);
      if (data && data.length > 0) {
        console.log(`  Resource #${resIdx} (0x${resourceId.toString(16)}): ${data.length} bytes`);
        
        // LZSS 可能是 tile 数据, 尝试解码
        const tileCount = Math.floor(data.length / 32);
        if (tileCount > 0 && tileCount <= 500) {
          const tiles = extractTilesFromResource(data);
          const wTiles = Math.min(Math.ceil(Math.sqrt(tileCount)), 16);
          const hTiles = Math.ceil(tileCount / wTiles);
          const canvas = renderSprite(tiles, wTiles, hTiles, DEFAULT_PALETTES[0]);
          const buf = canvas.toBuffer('image/png');
          fs.writeFileSync(path.join(outDir, `lzss_${resIdx}_0x${resourceId.toString(16)}.png`), buf);
          console.log(`    -> ${tileCount} tiles, saved as lzss_${resIdx}.png`);
        }
      }
    } catch (e) {
      console.log(`  Resource #${resIdx}: ERROR - ${e.message}`);
    }
  }
  
  // ========================================
  // 4. 素材分类导出
  // ========================================
  console.log('\n=== 素材分类探索 ===');
  console.log('Total resources: 200');
  console.log('Type 2 (bitplane): ~85 entries');
  console.log('Type 3 (LZSS): ~115 entries');
  
  // 写入汇总 JSON
  const summary = {
    spriteTable: '0x080CBC',
    spriteEntrySize: '0xC0 (192 bytes)',
    resourceTable: '0x0B0000',
    output: outDir,
    extracted: type2Resources.map(idx => ({
      index: idx,
      resourceId: '0x' + (32768 + idx * 2).toString(16),
      file: `resource_${idx}.png`
    })),
  };
  fs.writeFileSync(path.join(outDir, 'summary.json'), JSON.stringify(summary, null, 2));
  
  console.log(`\nDone! Output saved to: ${outDir}`);
}

main().catch(console.error);
