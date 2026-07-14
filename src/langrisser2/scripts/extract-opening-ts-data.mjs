/**
 * 提取开场动画两帧数据到 OpeningAnimationData.ts
 *
 * 数据结构:
 * - OPENING_CRAM: 共用调色板 (来自标题画面 CRAM)
 * - OPENING_FRAME_1: { tiles, nametable } 第一帧
 * - OPENING_FRAME_2: { tiles, nametable } 第二帧
 *
 * 渲染参数:
 * - Plane A 基址: 0xA000 (R2=0x28)
 * - 显示模式: H40 × V28 (320×224)
 * - 调色板: 0 和 1
 * - 全部低优先级
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VRAM1_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-openNING-ANIATION-2.ram');
const VRAM2_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-openNING-ANIATION-SOMETIMES.ram');
const CRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');

const vram1 = fs.readFileSync(VRAM1_PATH);
const vram2 = fs.readFileSync(VRAM2_PATH);
const cram = fs.readFileSync(CRAM_PATH);

const PLANE_A_BASE = 0xA000;

// ============================================================
// 提取一帧使用的 tile 数据
// ============================================================
function extractFrameData(vram) {
  // 1. 找出 nametable 使用的所有 tile 索引
  const usedTiles = new Set();
  for (let i = 0; i < 2048; i++) {
    const addr = PLANE_A_BASE + i * 2;
    const lo = vram[addr];
    const hi = vram[addr + 1];
    const word = (hi << 8) | lo;
    const tileIndex = word & 0x07FF;
    if (tileIndex !== 0) usedTiles.add(tileIndex);
  }

  // 2. 也包括 sprite 使用的 tile
  const SPRITE_BASE = 0xF000;
  for (let i = 0; i < 80; i++) {
    const base = SPRITE_BASE + i * 8;
    const tileAttr = (vram[base + 2] << 8) | vram[base + 3];
    const tileIdx = tileAttr & 0x07FF;
    if (tileIdx !== 0) usedTiles.add(tileIdx);
  }

  // 3. 提取这些 tile 的 pattern 数据
  // 为简化, 提取 0 到 maxTile 的所有 tile (包括空 tile)
  const maxTile = Math.max(...usedTiles);
  const tileCount = maxTile + 1;
  const tileData = new Uint8Array(tileCount * 32);
  for (let t = 0; t <= maxTile; t++) {
    const srcBase = t * 32;
    const dstBase = t * 32;
    for (let i = 0; i < 32; i++) {
      tileData[dstBase + i] = vram[srcBase + i];
    }
  }

  // 4. 提取 nametable (4KB)
  const nametable = new Uint8Array(4096);
  for (let i = 0; i < 4096; i++) {
    nametable[i] = vram[PLANE_A_BASE + i];
  }

  // 5. 提取 sprite 表 (256B, 但实际用 80 个 sprite × 8B = 640B)
  const spriteTable = new Uint8Array(640);
  for (let i = 0; i < 640; i++) {
    spriteTable[i] = vram[SPRITE_BASE + i];
  }

  return {
    tileCount,
    maxTileIndex: maxTile,
    usedTilesCount: usedTiles.size,
    tileData,
    nametable,
    spriteTable,
  };
}

// ============================================================
// 提取两帧
// ============================================================
console.log('=== 提取开场动画数据 ===\n');

const frame1 = extractFrameData(vram1);
console.log(`第一帧:`);
console.log(`  tile 总数: ${frame1.tileCount} (使用 ${frame1.usedTilesCount} 个, 最大索引 ${frame1.maxTileIndex})`);
console.log(`  tile 数据大小: ${frame1.tileData.length} 字节`);
console.log(`  nametable 大小: ${frame1.nametable.length} 字节`);
console.log(`  sprite 表大小: ${frame1.spriteTable.length} 字节`);

const frame2 = extractFrameData(vram2);
console.log(`\n第二帧:`);
console.log(`  tile 总数: ${frame2.tileCount} (使用 ${frame2.usedTilesCount} 个, 最大索引 ${frame2.maxTileIndex})`);
console.log(`  tile 数据大小: ${frame2.tileData.length} 字节`);
console.log(`  nametable 大小: ${frame2.nametable.length} 字节`);
console.log(`  sprite 表大小: ${frame2.spriteTable.length} 字节`);

// ============================================================
// 提取 CRAM (128B)
// ============================================================
const cramData = new Uint8Array(128);
for (let i = 0; i < 128; i++) {
  cramData[i] = cram[i];
}
console.log(`\nCRAM 大小: ${cramData.length} 字节`);

// ============================================================
// 生成 TS 文件
// ============================================================
const outputDir = path.join(__dirname, '../game/data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'OpeningAnimationData.ts');

function formatUint8Array(arr, perLine = 32) {
  const lines = [];
  for (let i = 0; i < arr.length; i += perLine) {
    const slice = Array.from(arr.slice(i, i + perLine));
    lines.push('  ' + slice.map(b => b.toString().padStart(3)).join(','));
  }
  return lines.join(',\n');
}

const content = `/**
 * 开场动画数据 - 从 VRAM/CRAM dump 提取
 *
 * 来源:
 * - VRAM 帧1: Langrisser II (Japan)_VRAM-openNING-ANIATION-2.ram
 * - VRAM 帧2: Langrisser II (Japan)_VRAM-openNING-ANIATION-SOMETIMES.ram
 * - CRAM: Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram (开场动画 CRAM dump 全零, 复用标题画面)
 *
 * 渲染参数:
 * - Plane A nametable 基址: 0xA000 (R2=0x28)
 * - 显示模式: H40 × V28 (320×224)
 * - 调色板: 0 和 1
 * - 全部低优先级
 *
 * 动画机制:
 * - 全屏帧动画: 每帧重新加载 tile pattern + nametable
 * - 不是简单滚动或局部动画
 * - 两帧之间 93% tile 数据不同, 66% nametable 不同
 */

// ============================================================
// 共用调色板 (4 组 × 16 色 × 2 字节 = 128 字节)
// ============================================================
export const OPENING_CRAM = new Uint8Array([
${formatUint8Array(cramData, 16)}
]);

// ============================================================
// 第一帧 (ANIATION-2)
// ============================================================
export const OPENING_FRAME_1_TILES = new Uint8Array([
${formatUint8Array(frame1.tileData)}
]);

export const OPENING_FRAME_1_NAMETABLE = new Uint8Array([
${formatUint8Array(frame1.nametable)}
]);

export const OPENING_FRAME_1_SPRITES = new Uint8Array([
${formatUint8Array(frame1.spriteTable, 16)}
]);

// ============================================================
// 第二帧 (SOMETIMES)
// ============================================================
export const OPENING_FRAME_2_TILES = new Uint8Array([
${formatUint8Array(frame2.tileData)}
]);

export const OPENING_FRAME_2_NAMETABLE = new Uint8Array([
${formatUint8Array(frame2.nametable)}
]);

export const OPENING_FRAME_2_SPRITES = new Uint8Array([
${formatUint8Array(frame2.spriteTable, 16)}
]);

// ============================================================
// 元数据
// ============================================================
export const OPENING_FRAME_COUNT = 2;

export const OPENING_DISPLAY_WIDTH = 320;
export const OPENING_DISPLAY_HEIGHT = 224;
export const OPENING_PLANE_A_BASE = 0xA000;

export interface OpeningFrame {
  tiles: Uint8Array;
  nametable: Uint8Array;
  sprites: Uint8Array;
}

export const OPENING_FRAMES: OpeningFrame[] = [
  {
    tiles: OPENING_FRAME_1_TILES,
    nametable: OPENING_FRAME_1_NAMETABLE,
    sprites: OPENING_FRAME_1_SPRITES,
  },
  {
    tiles: OPENING_FRAME_2_TILES,
    nametable: OPENING_FRAME_2_NAMETABLE,
    sprites: OPENING_FRAME_2_SPRITES,
  },
];
`;

fs.writeFileSync(outputPath, content);
console.log(`\n输出: ${outputPath}`);
console.log(`文件大小: ${fs.statSync(outputPath).size} 字节`);
console.log('\n=== 完成 ===');
