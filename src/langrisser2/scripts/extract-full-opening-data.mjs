/**
 * 提取开场动画数据 (优化版)
 * - 仅提取每个 VRAM frame 实际使用的 tile + 偏移映射
 * - 共用标题画面 CRAM (CRAM-TITILE-SCEEN.ram)
 * - ROM 资源: 仅提取 Entry 0/1/2 (字体 + 小资源)
 * - Base64 编码大数组减少文件大小
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../20260713');

const VRAM_PATHS = [
  path.join(DATA_DIR, 'Langrisser II (Japan)_VRAM-openNING-ANIATION-2.ram'),
  path.join(DATA_DIR, 'Langrisser II (Japan)_VRAM-openNING-ANIATION-SOMETIMES.ram'),
  path.join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram'),
];

const CRAM_PATH = path.join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const ROM_PATH = path.join(DATA_DIR, 'Langrisser II (Japan)_68K-gens-rom-dump.bin');

const PLANE_A_BASE = 0xA000;
const SPRITE_BASE  = 0xF000;

// ============================================================
// 加载文件
// ============================================================
const vramData = VRAM_PATHS.map(p => {
  if (fs.existsSync(p)) return { path: p, data: fs.readFileSync(p) };
  return null;
}).filter(Boolean);

const cramRaw = fs.existsSync(CRAM_PATH) ? fs.readFileSync(CRAM_PATH) : null;
let rom = null;
try { rom = fs.readFileSync(ROM_PATH); } catch (e) {}

console.log(`VRAM: ${vramData.length} frames, CRAM: ${cramRaw ? 'OK' : 'MISSING'}, ROM: ${rom ? 'OK' : 'MISSING'}`);

// ============================================================
// 字节序说明 (2026-07-15 修复):
//
// VRAM dump (.ram) 是 Genesis 大端序: 高字节在低地址。
//   pattern name word: vram[addr]   = bits 15-8 (flags + tile[10:8])
//                      vram[addr+1] = bits 7-0  (tile[7:0])
//   sprite tile attr:  vram[base+4] = bits 15-8, vram[base+5] = bits 7-0
//   sprite X/Y: packed bytes (not words), 逐字节一致
//
// TS VDP (vdp.ts) 小端序存储: writeVRAMWord 写 lo byte 到 addr, hi byte 到 addr+1
//   渲染器 (plane.ts/sprite.ts) 读: lo=vram[addr], hi=vram[addr+1], word=(hi<<8)|lo
//
// 所以提取时需要: 大端序 dump → 解析真实 tile 索引 → 重映射 → 小端序输出
// ============================================================
function extractFrameCompact(vram) {
  const usedTiles = new Set();

  // --- 第一步: 收集实际使用的 tile (大端序解析) ---

  // Plane A nametable (2048 entries, 2 bytes each at PLANE_A_BASE)
  for (let i = 0; i < 2048; i++) {
    const addr = PLANE_A_BASE + i * 2;
    // 大端序读取: high byte at addr, low byte at addr+1
    const word = (vram[addr] << 8) | vram[addr + 1];
    usedTiles.add(word & 0x07FF);
  }

  // Sprite table (80 entries, 8 bytes each at SPRITE_BASE)
  for (let i = 0; i < 80; i++) {
    const base = SPRITE_BASE + i * 8;
    // sprite tile attr at bytes 4-5, 大端序: high at +4, low at +5
    const attrWord = (vram[base + 4] << 8) | vram[base + 5];
    usedTiles.add(attrWord & 0x07FF);
  }

  // --- 第二步: 构建 tile 重映射 oldTileIdx → newTileIdx ---
  const sortedTiles = [...usedTiles].sort((a, b) => a - b);
  const tileMap = {};
  sortedTiles.forEach((oldIdx, newIdx) => { tileMap[oldIdx] = newIdx; });

  // --- 第三步: 提取 tile 图样 (每 tile 32 字节, 无字节序问题) ---
  const tileCount = sortedTiles.length;
  const tileData = new Uint8Array(tileCount * 32);
  for (let t = 0; t < tileCount; t++) {
    const srcOff = sortedTiles[t] * 32;
    for (let j = 0; j < 32; j++) {
      tileData[t * 32 + j] = vram[srcOff + j];
    }
  }

  // --- 第四步: 重映射 nametable → 小端序输出 (TS VDP 格式) ---
  const nametable = new Uint8Array(4096);
  for (let i = 0; i < 2048; i++) {
    const addr = PLANE_A_BASE + i * 2;
    // 大端序读取:
    //   byte at addr   = [p][c1][c0][v][h][t10][t9][t8] (flags + tile[10:8])
    //   byte at addr+1 = [t7][t6][t5][t4][t3][t2][t1][t0] (tile[7:0])
    const word = (vram[addr] << 8) | vram[addr + 1];
    const oldTileIdx = word & 0x07FF;
    const flags = word & 0xF800;             // priority + palette + vflip + hflip
    const newTileIdx = tileMap[oldTileIdx] ?? 0;
    const newWord = flags | (newTileIdx & 0x07FF);
    // 小端序输出: lo byte at nametable[i*2], hi byte at nametable[i*2+1]
    nametable[i * 2]     = newWord & 0xFF;
    nametable[i * 2 + 1] = (newWord >> 8) & 0xFF;
  }

  // --- 第五步: 重映射 sprite 表 → 小端序输出 ---
  const spriteTable = new Uint8Array(640);
  for (let i = 0; i < 80; i++) {
    const src = SPRITE_BASE + i * 8;
    const dst = i * 8;

    // X 坐标 (大端序 bytes 6-7 → 小端序)
    const xWord = (vram[src + 6] << 8) | vram[src + 7];
    spriteTable[dst + 6] = xWord & 0xFF;
    spriteTable[dst + 7] = (xWord >> 8) & 0xFF;

    // Tile attr (大端序 bytes 4-5 → 小端序, 同时重映射 tile index)
    const attrWord = (vram[src + 4] << 8) | vram[src + 5];
    const oldTileIdx = attrWord & 0x07FF;
    const flags = attrWord & 0xF800;
    const newTileIdx = tileMap[oldTileIdx] ?? 0;
    const newAttr = flags | (newTileIdx & 0x07FF);
    spriteTable[dst + 4] = newAttr & 0xFF;
    spriteTable[dst + 5] = (newAttr >> 8) & 0xFF;

    // Y 坐标 (packed bytes 0-1, 不需要字节序转换 — 不是 16-bit word)
    // Genesis sprite Y: byte0 = Y[7:0], byte1 bit0 = Y[8]
    // TS renderer 解析: yLo=vram[addr+0], yHi=vram[addr+1]
    // 如果 dump 字节顺序 = Genesis VDP 内部顺序, 逐字节一致
    spriteTable[dst + 0] = vram[src + 0];
    spriteTable[dst + 1] = vram[src + 1];

    // Size + link (bytes 2-3): 单字节字段, 无需转换
    spriteTable[dst + 2] = vram[src + 2];
    spriteTable[dst + 3] = vram[src + 3];
  }

  return {
    tileCount,
    tileData,
    nametable,
    spriteTable,
    tileMap: sortedTiles,
  };
}

console.log('\n=== 提取帧 (紧凑模式) ===');
const frames = vramData.map((v, i) => {
  const f = extractFrameCompact(v.data);
  const kb = (f.tileData.length + f.nametable.length + f.spriteTable.length) / 1024;
  console.log(`  帧 ${i}: ${f.tileCount} tiles (remapped), total=${kb.toFixed(1)}KB`);
  return f;
});

// ============================================================
// CRAM
// ============================================================
const cram = new Uint8Array(128);
if (cramRaw) {
  for (let i = 0; i < 128 && i < cramRaw.length; i++) cram[i] = cramRaw[i];
}
let cramNonZero = 0;
for (let i = 0; i < 128; i++) if (cram[i] !== 0) cramNonZero++;
console.log(`CRAM: ${cramNonZero} non-zero bytes`);

// ============================================================
// ROM LZSS 资源 (仅 Entry 0,1,2)
// ============================================================
const ROM_RESOURCES = {};

if (rom) {
  function rb(o) { return rom[o] & 0xff; }
  function rw(o) { return ((rom[o] & 0xff) << 8) | (rom[o + 1] & 0xff); }
  function rl(o) { return ((rom[o] & 0xff) << 24) | ((rom[o + 1] & 0xff) << 16) | ((rom[o + 2] & 0xff) << 8) | (rom[o + 3] & 0xff); }

  function decompressLZSS(romAddr) {
    const size = rw(romAddr + 1);
    const window = new Uint8Array(0x1000).fill(0x20);
    let windowPos = 0x0FEE, remaining = size;
    const output = new Uint8Array(size);
    let outPos = 0, inPos = romAddr + 3;
    while (remaining > 0) {
      const flagByte = rb(inPos++);
      for (let bit = 0; bit < 8 && remaining > 0; bit++) {
        if ((flagByte >> bit) & 1) {
          const b = rb(inPos++);
          window[windowPos] = b;
          output[outPos++] = b;
          windowPos = (windowPos + 1) & 0xFFF;
          remaining--;
        } else {
          const b1 = rb(inPos++);
          const b2 = rb(inPos++);
          let off = (b1 | ((b2 & 0xF0) << 4)) & 0xFFF;
          const len = (b2 & 0x0F) + 2;
          for (let j = 0; j < len && remaining > 0; j++) {
            const b = window[off];
            window[windowPos] = b;
            output[outPos++] = b;
            off = (off + 1) & 0xFFF;
            windowPos = (windowPos + 1) & 0xFFF;
            remaining--;
          }
        }
      }
    }
    return output;
  }

  console.log('\n=== 提取 ROM 资源 Entry 0-2 ===');
  for (const entryIdx of [0, 1, 2, 3, 4, 5]) {
    const ptr = rl(0x0B0000 + entryIdx * 4);
    if (ptr === 0 || ptr >= rom.length || ptr < 0x1000) continue;
    const typeCode = rb(ptr);
    const decompSize = rw(ptr + 1);
    if (typeCode === 3 && decompSize > 0 && decompSize <= 65536) {
      try {
        const data = decompressLZSS(ptr);
        const resId = 0x8000 + entryIdx;
        const base64 = Buffer.from(data).toString('base64');
        ROM_RESOURCES[resId] = { size: data.length, base64, tiles: data.length / 32 };
        console.log(`  Entry ${entryIdx} (0x${resId.toString(16)}): ${data.length}B, ${data.length / 32} tiles`);
      } catch (e) {
        console.log(`  Entry ${entryIdx}: fail - ${e.message}`);
      }
    }
  }
}

// ============================================================
// Base64 编码帧数据
// ============================================================
function toBase64(arr) {
  return Buffer.from(arr).toString('base64');
}

const frameB64 = frames.map(f => ({
  tileCount: f.tileCount,
  tilesB64: toBase64(f.tileData),
  nametableB64: toBase64(f.nametable),
  spritesB64: toBase64(f.spriteTable),
}));

// ============================================================
// 生成 TS 文件
// ============================================================
const outputDir = path.join(__dirname, '../game/data');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const cramHex = Array.from(cram.slice(0, 128)).map(b => '0x' + b.toString(16).padStart(2, '0')).join(', ');

let romResCode = '';
if (Object.keys(ROM_RESOURCES).length > 0) {
  romResCode = '\n// ROM 资源数据 (LZSS 解压)\n' +
    'export const OPENING_ROM_RESOURCES: Record<number, { size: number; base64: string; tiles: number }> = {\n' +
    Object.entries(ROM_RESOURCES).map(([id, r]) => {
      return `  ${id}: { size: ${r.size}, tiles: ${r.tiles}, base64: '${r.base64}' },`;
    }).join('\n') + '\n};\n';
}

let frameCode = frames.map((f, i) => {
  const b64 = frameB64[i];
  const label = ['ANIATION-2', 'SOMETIMES', 'TITILE-SCEEN'][i] || `FRAME-${i}`;
  return [
    `// 帧 ${i}: ${label}`,
    `static FRAME_${i}_TILES_B64 = '${b64.tilesB64}'; // ${f.tileCount} tiles, ${f.tileData.length}B`,
    `static FRAME_${i}_NT_B64    = '${b64.nametableB64}'; // ${f.nametable.length}B`,
    `static FRAME_${i}_SPR_B64   = '${b64.spritesB64}'; // ${f.spriteTable.length}B`,
    '',
  ].join('\n');
}).join('\n');

const tsContent = `/**
 * 开场动画数据 — ROM 搬運版 (优化)
 *
 * 数据来源:
 *   - VRAM x3: ANIATION-2, SOMETIMES, TITILE-SCEEN
 *   - CRAM: TITILE-SCEEN.ram (共用标题画面调色板)
 *   - ROM Entry 0-5: LZSS tile 数据 (字体等)
 *
 * ROM 任务链参考: 0xC92C→0xC93A→0xC9A0→0xCC4E→0xD4AE
 * VDP 配置: R2=0x28(A@0xA000), R5=0x78(Sprite@0xF000), R12=0x81(H40)
 */

// ============================================================
// 常量
// ============================================================

export const OPENING_FRAME_COUNT = ${frames.length};
export const OPENING_DISPLAY_WIDTH = 320;
export const OPENING_DISPLAY_HEIGHT = 224;
export const OPENING_PLANE_A_BASE = 0xA000;
export const OPENING_SPRITE_BASE = 0xF000;

/** VDP 寄存器配置 (ROM 匹配) */
export const OPENING_VDP_CONFIG = {
  R2_PLANE_A: 0x28,
  R5_SPRITE:  0x78,
  R12_MODE:   0x81,
  R7_BGCOLOR: 0x00,
} as const;

// ============================================================
// CRAM 共用调色板 (128B, 标题画面)
// ============================================================
export const OPENING_CRAM = new Uint8Array([${cramHex}]);

// ============================================================
// 动画帧数据 (Base64 压缩)
// ============================================================

export class OpeningAnimationData {
  private static _frames: Array<{tiles: Uint8Array; nametable: Uint8Array; sprites: Uint8Array; tileCount: number}> | null = null;

${frameCode}

  static getFrame(index: number): { tiles: Uint8Array; nametable: Uint8Array; sprites: Uint8Array; tileCount: number } {
    if (!this._frames) {
      this._frames = [];
      try {
        this._frames.push({
          tileCount: ${frames[0]?.tileCount || 0},
          tiles: (() => {
            const b = Uint8Array.from(atob(this.FRAME_0_TILES_B64), c => c.charCodeAt(0));
            if (b.length === 0) { b.length = ${(frames[0]?.tileData?.length || 0)}; b.fill(0); }
            return b;
          })(),
          nametable: Uint8Array.from(atob(this.FRAME_0_NT_B64), c => c.charCodeAt(0)),
          sprites: Uint8Array.from(atob(this.FRAME_0_SPR_B64), c => c.charCodeAt(0)),
        });
      } catch(e) { this._frames.push({tileCount:0,tiles:new Uint8Array(0),nametable:new Uint8Array(0),sprites:new Uint8Array(0)}); }

      try {
        this._frames.push({
          tileCount: ${frames[1]?.tileCount || 0},
          tiles: (() => {
            const b = Uint8Array.from(atob(this.FRAME_1_TILES_B64), c => c.charCodeAt(0));
            if (b.length === 0) { b.length = ${(frames[1]?.tileData?.length || 0)}; b.fill(0); }
            return b;
          })(),
          nametable: Uint8Array.from(atob(this.FRAME_1_NT_B64), c => c.charCodeAt(0)),
          sprites: Uint8Array.from(atob(this.FRAME_1_SPR_B64), c => c.charCodeAt(0)),
        });
      } catch(e) { this._frames.push({tileCount:0,tiles:new Uint8Array(0),nametable:new Uint8Array(0),sprites:new Uint8Array(0)}); }

      try {
        this._frames.push({
          tileCount: ${frames[2]?.tileCount || 0},
          tiles: (() => {
            const b = Uint8Array.from(atob(this.FRAME_2_TILES_B64), c => c.charCodeAt(0));
            if (b.length === 0) { b.length = ${(frames[2]?.tileData?.length || 0)}; b.fill(0); }
            return b;
          })(),
          nametable: Uint8Array.from(atob(this.FRAME_2_NT_B64), c => c.charCodeAt(0)),
          sprites: Uint8Array.from(atob(this.FRAME_2_SPR_B64), c => c.charCodeAt(0)),
        });
      } catch(e) { this._frames.push({tileCount:0,tiles:new Uint8Array(0),nametable:new Uint8Array(0),sprites:new Uint8Array(0)}); }
    }
    return this._frames![index] || this._frames![0];
  }

  static get tileCount(): number {
    return Math.max(${frames.map(f => f.tileCount).join(', ')});
  }
}

export interface OpeningFrame {
  tiles: Uint8Array;
  nametable: Uint8Array;
  sprites: Uint8Array;
  tileCount: number;
}

${romResCode}

/** 解码 Base64 → Uint8Array */
export function decodeOpeningBase64(b64: string): Uint8Array {
  return Uint8Array.from(atob(b64), c => c.charCodeAt(0));
}
`;

fs.writeFileSync(path.join(outputDir, 'OpeningAnimationData.ts'), tsContent);
const fileSize = fs.statSync(path.join(outputDir, 'OpeningAnimationData.ts')).size;
console.log(`\n输出: game/data/OpeningAnimationData.ts (${(fileSize / 1024).toFixed(1)} KB)`);
console.log('=== 完成 ===');
