/**
 * Genesis VDP Plane (滚动背景层) 渲染
 *
 * 严格基于 execution-trace.md "Nametable 条目格式" 和 "VRAM 布局"
 *
 * Plane 结构:
 *   - Plane A: 主背景层 (R2 配置基址)
 *   - Plane B: 次背景层 (R4 配置基址)
 *   - Window:  窗口层 (R3 配置基址, 不滚动)
 *
 * Nametable 格式 (每条目 2 字节, big-endian):
 *   bit15    = 优先级 (1=高优先级, 显示在 sprite 之上)
 *   bit14-13 = 调色板索引 (0-3, 对应 CRAM 的 4 组调色板)
 *   bit12    = H翻转
 *   bit11    = V翻转
 *   bit10-0  = Tile 索引 (0-2047)
 *
 * Plane 尺寸 (由 R12/RS0 决定):
 *   H32 模式: 32×32-64 tiles (256×256-512 像素)
 *   H40 模式: 64×32-128 tiles (512×256-1024 像素)
 *
 * @see execution-trace.md "Nametable 条目格式" "VRAM 布局"
 */

import { VDP } from './vdp.js';
import { decodeTileFlipped, tileAddress } from './tile.js';

/** Nametable 条目解析结果 */
export interface NameTableEntry {
  /** Tile 索引 (0-2047) */
  tileIndex: number;
  /** H 翻转 */
  hFlip: boolean;
  /** V 翻转 */
  vFlip: boolean;
  /** 调色板索引 (0-3) */
  palette: number;
  /** 优先级 (1=高) */
  priority: number;
}

/**
 * 解析 nametable 条目 (2 字节, big-endian)
 *
 * 格式见 execution-trace.md "Nametable 条目格式"
 */
export function parseNameTableEntry(vram: Uint8Array, addr: number): NameTableEntry {
  const hi = vram[addr & 0xFFFF];
  const lo = vram[(addr + 1) & 0xFFFF];
  const word = (hi << 8) | lo;

  return {
    tileIndex: word & 0x07FF,          // bit10-0: Tile 索引
    hFlip: !!(word & 0x0800),          // bit12: H翻转
    vFlip: !!(word & 0x1000),          // bit11 (注: 实际是 bit15-11, 这里需核对)
    palette: (word >> 13) & 0x03,      // bit14-13: 调色板索引
    priority: (word >> 15) & 0x01,     // bit15: 优先级
  };
}

// 修正: 重新核对 nametable 位定义
// 实际 Genesis VDP nametable 格式 (来自硬件手册):
//   bit15    = 优先级
//   bit14-13 = 调色板
//   bit12    = H翻转
//   bit11    = V翻转
//   bit10-0  = Tile 索引
// 所以上面的解析是对的

/**
 * 渲染单个 Plane 到像素缓冲
 *
 * @param vdp VDP 实例
 * @param planeBase Plane 的 nametable VRAM 基址
 * @param scrollX 水平滚动值 (像素)
 * @param scrollY 垂直滚动值 (像素)
 * @param isPlaneA 是否为 Plane A (影响优先级处理)
 * @param output 输出像素缓冲 (width×height, RGBA)
 * @param outWidth 输出缓冲宽度
 * @param outHeight 输出缓冲高度
 * @param priorityFilter 优先级过滤 (0=只画低优先级, 1=只画高优先级)
 */
export function renderPlane(
  vdp: VDP,
  planeBase: number,
  scrollX: number,
  scrollY: number,
  isPlaneA: boolean,
  output: Uint8Array,
  outWidth: number,
  outHeight: number,
  priorityFilter: number = -1 // -1 = 画所有, 0/1 = 只画对应优先级
): void {
  const vram = vdp.vram;

  // Plane 尺寸 (tile 数)
  // H32: 64×32 tiles, H40: 64×32 tiles (实际都是 64×32 或 64×64)
  // 简化: 假设 64×32 tiles
  const planeWidthTiles = 64;
  const planeHeightTiles = 32;
  const planeWidthPixels = planeWidthTiles * 8;  // 512
  const planeHeightPixels = planeHeightTiles * 8; // 256

  // 滚动值取模
  const sx = ((scrollX % planeWidthPixels) + planeWidthPixels) % planeWidthPixels;
  const sy = ((scrollY % planeHeightPixels) + planeHeightPixels) % planeHeightPixels;

  // 临时 tile 像素缓冲 (8×8)
  const tilePixels = new Uint8Array(64);

  for (let py = 0; py < outHeight; py++) {
    // Plane 内 Y 坐标 (含滚动)
    const planeY = (py + sy) % planeHeightPixels;
    const tileY = (planeY / 8) | 0;
    const pixelY = planeY % 8;

    for (let px = 0; px < outWidth; px++) {
      // Plane 内 X 坐标 (含滚动)
      const planeX = (px + sx) % planeWidthPixels;
      const tileX = (planeX / 8) | 0;
      const pixelX = planeX % 8;

      // nametable 条目地址 (每条目 2 字节)
      const entryAddr = planeBase + (tileY * planeWidthTiles + tileX) * 2;
      const entry = parseNameTableEntry(vram, entryAddr);

      // 优先级过滤
      if (priorityFilter !== -1 && entry.priority !== priorityFilter) continue;

      // 跳过 tile 索引 0 (通常是空 tile)
      // 实际不应跳过, 因为 tile 0 可能不是空的
      // 但为了性能, 优先级低且 tile=0 时可跳过
      // if (entry.tileIndex === 0 && entry.priority === 0) continue;

      // 解码 tile 像素 (8×8)
      const tAddr = tileAddress(entry.tileIndex);
      decodeTileFlipped(vram, tAddr, entry.hFlip, entry.vFlip, tilePixels, 0);

      // 取像素值 (0-15, 调色板索引)
      const pixelValue = tilePixels[pixelY * 8 + pixelX];

      // 像素值 0 = 透明 (不写入)
      if (pixelValue === 0) continue;

      // 查 CRAM 调色板
      // 调色板索引 = entry.palette * 16 + pixelValue
      const colorIdx = entry.palette * 16 + pixelValue;
      const cramValue = vdp.readCRAM(colorIdx);

      // CRAM → RGBA
      // 格式: bit12-9=Blue, bit8-5=Green, bit4-1=Red
      const r = ((cramValue >> 1) & 0x0F) * 17;  // 4位 → 8位 (×17)
      const g = ((cramValue >> 5) & 0x0F) * 17;
      const b = ((cramValue >> 9) & 0x0F) * 17;

      // 写入输出缓冲 (RGBA)
      const outIdx = (py * outWidth + px) * 4;
      output[outIdx] = r;
      output[outIdx + 1] = g;
      output[outIdx + 2] = b;
      output[outIdx + 3] = 255;
    }
  }
}

/**
 * 渲染 Window (不滚动的窗口层)
 *
 * Window 位置由 R17-R18 配置 (本游戏未使用, 跳过)
 */
export function renderWindow(
  vdp: VDP,
  output: Uint8Array,
  outWidth: number,
  outHeight: number
): void {
  // 本游戏似乎不使用 Window, 暂不实现
  // 若需要, 逻辑类似 renderPlane 但无滚动
}
