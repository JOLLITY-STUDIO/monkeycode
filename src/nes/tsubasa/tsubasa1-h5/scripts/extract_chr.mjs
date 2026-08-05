/**
 * CHR→PNG 导出工具
 * 从 CHR_ROM.chr 中提取所有 tile 数据并生成 PNG 图集
 * 
 * 输出:
 *   src/assets/chr/bank_00.png ~ bank_1F.png (32个4KB Bank)
 *   每个PNG: 16×16 tiles = 128×128 像素
 * 
 * 用法: node scripts/extract_chr.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const CHR_FILE = join(PROJECT_ROOT, '_tmp_disasm_out', 'bzk_output', 'CHR_ROM.chr');
const OUTPUT_DIR = join(PROJECT_ROOT, 'src', 'assets', 'chr');

// NES 2C02 调色板 (用于预览 — 实际游戏中调色板是动态加载的)
const NES_PALETTE = [
  0xFF7C7C7C, 0xFF0000FC, 0xFF0000BC, 0xFF4428BC, 0xFF940084, 0xFFA80020, 0xFFA81000,
  0xFF881400, 0xFF503000, 0xFF007800, 0xFF006800, 0xFF005800, 0xFF004058, 0xFF000000,
  0xFF000000, 0xFF000000,
  0xFFBCBCBC, 0xFF0078F8, 0xFF0058F8, 0xFF6844FC, 0xFFD800CC, 0xFFE40058, 0xFFF83800,
  0xFFE45C10, 0xFFAC7C00, 0xFF00B800, 0xFF00A800, 0xFF00A844, 0xFF008888, 0xFF000000,
  0xFF000000, 0xFF000000,
  0xFFF8F8F8, 0xFF3CBCFC, 0xFF6888FC, 0xFF9878F8, 0xFFF878F8, 0xFFF85898, 0xFFF87858,
  0xFFFEA044, 0xFFF8B800, 0xFFB8F818, 0xFF58D854, 0xFF58F898, 0xFF00E8D8, 0xFF787878,
  0xFF000000, 0xFF000000,
  0xFFFCFCFC, 0xFFA4E4FC, 0xFFB8B8F8, 0xFFD8B8F8, 0xFFF8B8F8, 0xFFF8A4C0, 0xFFF0D0B0,
  0xFFFCE0A8, 0xFFF8D878, 0xFFD8F878, 0xFFB8F8B8, 0xFFB8F8D8, 0xFF00FCFC, 0xFFF8D8F8,
  0xFF000000, 0xFF000000,
];

/**
 * 简单PNG编码器 (最小实现，无zlib依赖)
 * 生成未压缩的RGBA PNG
 */
function encodePng(width, height, pixels) {
  // 每行加filter byte
  const rowLen = width * 4 + 1;
  const rawData = new Uint8Array(rowLen * height);
  
  for (let y = 0; y < height; y++) {
    rawData[y * rowLen] = 0; // filter: None
    for (let x = 0; x < width; x++) {
      const srcOff = (y * width + x) * 4;
      const dstOff = y * rowLen + 1 + x * 4;
      rawData[dstOff]     = pixels[srcOff];     // R
      rawData[dstOff + 1] = pixels[srcOff + 1]; // G
      rawData[dstOff + 2] = pixels[srcOff + 2]; // B
      rawData[dstOff + 3] = pixels[srcOff + 3]; // A
    }
  }

  // Deflate compress (simple store — uncompressed)
  // 在真实项目中应该使用 zlib，这里用简单的 store 方式
  const deflateData = deflateStore(rawData);
  
  // PNG 签名
  const signature = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
  
  // IHDR chunk
  const ihdrData = new Uint8Array(13);
  const dv = new DataView(ihdrData.buffer);
  dv.setUint32(0, width, false);
  dv.setUint32(4, height, false);
  ihdrData[8] = 8;  // bit depth
  ihdrData[9] = 6;  // color type: RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdr = createChunk('IHDR', ihdrData);
  
  // IDAT chunk
  const idat = createChunk('IDAT', deflateData);
  
  // IEND chunk
  const iend = createChunk('IEND', new Uint8Array(0));
  
  // 组装
  const chunks = [signature, ihdr, idat, iend];
  const totalLen = chunks.reduce((s, c) => s + c.length, 0);
  const result = new Uint8Array(totalLen);
  let offset = 0;
  for (const c of chunks) {
    result.set(c, offset);
    offset += c.length;
  }
  
  return result;
}

function createChunk(type, data) {
  const len = data.length;
  const chunk = new Uint8Array(12 + len);
  const dv = new DataView(chunk.buffer);
  dv.setUint32(0, len, false);
  chunk[4] = type.charCodeAt(0);
  chunk[5] = type.charCodeAt(1);
  chunk[6] = type.charCodeAt(2);
  chunk[7] = type.charCodeAt(3);
  chunk.set(data, 8);
  
  // CRC32
  const crcData = chunk.slice(4, 8 + len);
  const crc = crc32(crcData);
  dv.setUint32(8 + len, crc, false);
  
  return chunk;
}

// CRC32 表
const crcTable = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let j = 0; j < 8; j++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[i] = c;
}

function crc32(data) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < data.length; i++) {
    crc = crcTable[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

/**
 * 简单的 Deflate "store" (无压缩) 实现
 * 符合 RFC 1951 的 stored block 格式
 */
function deflateStore(data) {
  const len = data.length;
  const numBlocks = Math.ceil(len / 65535);
  
  // 预估输出大小
  const outSize = len + numBlocks * 5 + 2; // 每个block 5字节头 + 2字节zlib头
  const out = new Uint8Array(outSize);
  let offset = 0;
  
  // zlib header (CMF + FLG)
  out[offset++] = 0x78; // CMF: deflate, 32K window
  out[offset++] = 0x01; // FLG: no dict, level 0
  
  for (let b = 0; b < numBlocks; b++) {
    const blockStart = b * 65535;
    const blockLen = Math.min(65535, len - blockStart);
    const isLast = (b === numBlocks - 1);
    
    // Block header
    out[offset++] = isLast ? 0x01 : 0x00; // BFINAL=1(isLast), BTYPE=00(no compression)
    out[offset++] = blockLen & 0xFF;
    out[offset++] = (blockLen >> 8) & 0xFF;
    out[offset++] = (~blockLen) & 0xFF;
    out[offset++] = ((~blockLen) >> 8) & 0xFF;
    
    // Data
    for (let i = 0; i < blockLen; i++) {
      out[offset++] = data[blockStart + i];
    }
  }
  
  // Adler-32
  const adler = adler32(data);
  out[offset++] = (adler >> 24) & 0xFF;
  out[offset++] = (adler >> 16) & 0xFF;
  out[offset++] = (adler >> 8) & 0xFF;
  out[offset++] = adler & 0xFF;
  
  return out.slice(0, offset);
}

function adler32(data) {
  let s1 = 1, s2 = 0;
  for (let i = 0; i < data.length; i++) {
    s1 = (s1 + data[i]) % 65521;
    s2 = (s2 + s1) % 65521;
  }
  return (s2 << 16) | s1;
}

/**
 * 解码 NES CHR tile (8×8, 2-bit色深)
 * @param {Uint8Array} chrBank - 4096字节的CHR数据
 * @param {number} tileIndex - tile索引 (0-255)
 * @param {number[]} palette - 4色调色板 (4个RGBA值)
 * @param {Uint8Array} pixels - 输出像素缓冲区
 * @param {number} outOffset - 输出偏移
 * @param {number} rowStride - 行步长 (像素)
 */
function decodeTile(chrBank, tileIndex, palette, pixels, outOffset, rowStride) {
  const base = tileIndex * 16;
  
  for (let row = 0; row < 8; row++) {
    const plane0 = chrBank[base + row];
    const plane1 = chrBank[base + row + 8];
    
    for (let col = 0; col < 8; col++) {
      const bit = 7 - col;
      const colorIdx = ((plane1 >> bit) & 1) << 1 | ((plane0 >> bit) & 1);
      const color = palette[colorIdx];
      
      const px = outOffset + (row * rowStride + col) * 4;
      pixels[px]     = (color >> 16) & 0xFF; // R
      pixels[px + 1] = (color >> 8) & 0xFF;  // G
      pixels[px + 2] = color & 0xFF;          // B
      pixels[px + 3] = (colorIdx === 0) ? 0 : 255; // A
    }
  }
}

/**
 * 生成CHR Bank预览图集
 * 16×16 tiles 排列 = 128×128 像素
 */
function generateBankPng(chrData, bankId) {
  const TILES_PER_ROW = 16;
  const TILE_SIZE = 8;
  const imgWidth = TILES_PER_ROW * TILE_SIZE;  // 128
  const imgHeight = TILES_PER_ROW * TILE_SIZE; // 128
  const totalTiles = 256; // 每个4KB bank = 256 tiles
  
  const pixels = new Uint8Array(imgWidth * imgHeight * 4);
  
  // 使用灰度调色板预览 (4色)
  const palette = [
    0x00000000, // 透明
    0xFF555555, // 暗灰
    0xFFAAAAAA, // 亮灰
    0xFFFFFFFF, // 白
  ];
  
  for (let t = 0; t < totalTiles; t++) {
    const tileCol = t % TILES_PER_ROW;
    const tileRow = Math.floor(t / TILES_PER_ROW);
    const outOffset = (tileRow * TILE_SIZE * imgWidth + tileCol * TILE_SIZE) * 4;
    decodeTile(chrData, t, palette, pixels, outOffset, imgWidth);
  }
  
  return encodePng(imgWidth, imgHeight, pixels);
}

/**
 * 主函数
 */
function main() {
  console.log('[extract_chr] 读取 CHR ROM...');
  const chrRom = readFileSync(CHR_FILE);
  console.log(`[extract_chr] CHR ROM 大小: ${chrRom.length} 字节 (${chrRom.length / 1024}KB)`);
  
  // 确保输出目录存在
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  const banksPerChr = chrRom.length / 4096; // 每个4KB bank
  console.log(`[extract_chr] 共 ${banksPerChr} 个 CHR Bank (每Bank 4KB)`);
  
  for (let b = 0; b < banksPerChr; b++) {
    const start = b * 4096;
    const end = start + 4096;
    const bankData = chrRom.slice(start, end);
    
    const pngData = generateBankPng(bankData, b);
    const bankHex = b.toString(16).toUpperCase().padStart(2, '0');
    const filename = join(OUTPUT_DIR, `bank_${bankHex}.png`);
    writeFileSync(filename, pngData);
    
    console.log(`[extract_chr] 输出: bank_${bankHex}.png (${pngData.length} 字节)`);
  }
  
  // 也输出原始CHR数据为base64/二进制格式供TS使用
  console.log('[extract_chr] 导出CHR原始数据...');
  const tsOutput = [];
  tsOutput.push('// 自动生成 — CHR Bank 原始数据');
  tsOutput.push('// 每个Bank 4096字节 = 256 tiles × 16B');
  tsOutput.push('');
  tsOutput.push('export const CHR_BANKS: Uint8Array[] = [];');
  tsOutput.push('');
  tsOutput.push('export function initChrBanks(): void {');
  
  for (let b = 0; b < banksPerChr; b++) {
    const start = b * 4096;
    const end = start + 4096;
    const bankData = chrRom.slice(start, end);
    const hex = Array.from(bankData).map(v => '0x' + v.toString(16).toUpperCase().padStart(2, '0')).join(', ');
    tsOutput.push(`  // Bank ${b} (0x${b.toString(16).toUpperCase().padStart(2, '0')})`);
    tsOutput.push(`  CHR_BANKS[${b}] = new Uint8Array([${hex}]);`);
  }
  
  tsOutput.push('}');
  
  const tsFile = join(OUTPUT_DIR, 'chr_data.ts');
  writeFileSync(tsFile, tsOutput.join('\n'), 'utf-8');
  console.log(`[extract_chr] TS数据文件: chr_data.ts`);
  
  // 生成 bulk 文件 (所有bank打包)
  const bulkJson = [];
  for (let b = 0; b < banksPerChr; b++) {
    const start = b * 4096;
    const end = start + 4096;
    const bankData = chrRom.slice(start, end);
    bulkJson.push({
      bankId: b,
      size: bankData.length,
      base64: Buffer.from(bankData).toString('base64'),
    });
  }
  
  const bulkFile = join(OUTPUT_DIR, 'chr_bulk.json');
  writeFileSync(bulkFile, JSON.stringify(bulkJson, null, 2), 'utf-8');
  console.log(`[extract_chr] JSON打包: chr_bulk.json`);
  
  console.log(`[extract_chr] ✅ 完成! 输出目录: ${OUTPUT_DIR}`);
}

main();
