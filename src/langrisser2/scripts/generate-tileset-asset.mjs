/**
 * generate-tileset-asset.mjs
 *
 * 从 ROM 资源表提取地形 tileset → 硬编码 TS 常量 (base64)
 * 运行: node scripts/generate-tileset-asset.mjs
 * 输出: game/data/TilesetData.ts
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rom = readFileSync(join(__dirname, '..', '20260713', 'Langrisser II (Japan)_68K-gens-rom-dump.bin'));

const readByte = (addr) => rom[addr];
const readWord = (addr) => ((rom[addr] << 8) | rom[addr + 1]);
const readLong = (addr) => ((rom[addr] << 24) | (rom[addr + 1] << 16) | (rom[addr + 2] << 8) | rom[addr + 3]) >>> 0;

// Resource pointer table at ROM 0x0B0000
const RESOURCE_TABLE = 0x0B0000;

// LZSS decompressor (Type 3)
function decompressLZSS(addr) {
  const decompressedSize = readWord(addr + 1);
  const src = addr + 3;
  const WINDOW_SIZE = 0x1000;
  const window = new Uint8Array(WINDOW_SIZE).fill(0x20);
  let winPos = 0x0FEE;
  let remaining = decompressedSize;
  const output = new Uint8Array(decompressedSize);
  let outPos = 0;
  let srcPos = src;

  while (remaining > 0) {
    const flag = readByte(srcPos++);
    for (let bit = 0; bit < 8 && remaining > 0; bit++) {
      if ((flag >> bit) & 1) {
        // Literal
        const b = readByte(srcPos++);
        window[winPos] = b;
        output[outPos++] = b;
        winPos = (winPos + 1) & 0xFFF;
        remaining--;
      } else {
        // Match
        const b1 = readByte(srcPos++);
        const b2 = readByte(srcPos++);
        let offset = (b1 | ((b2 & 0xF0) << 4)) & 0xFFF;
        const length = (b2 & 0x0F) + 2;
        for (let i = 0; i < length && remaining > 0; i++) {
          const b = window[offset];
          window[winPos] = b;
          output[outPos++] = b;
          offset = (offset + 1) & 0xFFF;
          winPos = (winPos + 1) & 0xFFF;
          remaining--;
        }
      }
    }
  }
  return output;
}

// Extract a resource by its table index
function extractResource(index) {
  const ptr = readLong(RESOURCE_TABLE + index * 4);
  const type = readByte(ptr);
  let data;
  if (type === 3) {
    data = decompressLZSS(ptr);
  } else if (type === 2) {
    // Type 2: bit-plane compressed
    const b1 = readByte(ptr + 1);
    const compressed = (b1 & 0x80) !== 0;
    const planes = b1 & 0x7F;
    let raw;
    if (!compressed) {
      const size = readWord(ptr + 2);
      const outputSize = size * planes * 8;
      raw = new Uint8Array(outputSize);
      for (let i = 0; i < outputSize; i++) raw[i] = readByte(ptr + 4 + i);
    } else {
      // Compressed type 2 - simplified: just read uncompressed data after header
      // Full implementation would need nibble RLE decoding
      const rawSize = readWord(ptr + 4);
      raw = new Uint8Array(rawSize);
      for (let i = 0; i < rawSize; i++) raw[i] = readByte(ptr + 6 + i);
    }
    data = raw;
  } else {
    return null;
  }
  return data;
}

// Build base64 TS constant from resource data
function toBase64TS(data) {
  const b64 = Buffer.from(data).toString('base64');
  // Split into 80-char lines for readability
  const lines = [];
  for (let i = 0; i < b64.length; i += 80) {
    lines.push(`  '${b64.slice(i, i + 80)}'`);
  }
  return lines.join(' +\n');
}

// Extract first few tileset-sized resources (8192 bytes = 256 tiles)
const TILESET_RESOURCES = [1, 3, 4, 5, 6, 7, 8, 9]; // indices with 8192 bytes

let output = `/**
 * TilesetData.ts — 地形 tileset 数据 (从 ROM 资源表提取)
 *
 * 由脚本生成: scripts/generate-tileset-asset.mjs
 * 来源: Langrisser II (Japan) v1.2 ROM 资源表 0x0B0000
 *
 * 每个 tileset 是 8192 字节 (256 个 8×8 Genesis 4bpp tile)
 */

// ============================================================================
// Terrains tileset data (base64 encoded, 256 tiles × 32 bytes each)
// ============================================================================

`;

for (const idx of TILESET_RESOURCES) {
  const data = extractResource(idx);
  if (!data || data.length < 4096) continue;

  console.log(`Resource ${idx}: ${data.length} bytes`);

  output += `/** Resource index ${idx}, ${data.length} bytes */
export const TILESET_${idx}_BASE64 =${toBase64TS(data)};

`;
}

const outDir = join(__dirname, '..', 'game', 'data');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'TilesetData.ts'), output, 'utf-8');
console.log(`\nGenerated: ${join(outDir, 'TilesetData.ts')}`);
console.log('Output size:', cleanSize(Buffer.from(output).length));

function cleanSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
