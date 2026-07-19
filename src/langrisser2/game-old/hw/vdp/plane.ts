/**
 * Genesis VDP Plane (滚动背景层) 渲染 — 优化版
 *
 * 基于原 plane.ts 但使用 tile 缓存大幅提升性能
 *
 * Nametable 格式 (每条目 2 字节, little-endian):
 *   bit15    = 优先级 (1=高优先级, 显示在 sprite 之上)
 *   bit14-13 = 调色板索引 (0-3)
 *   bit12    = V翻转 (Vertical flip, 垂直翻转)
 *   bit11    = H翻转 (Horizontal flip, 水平翻转)
 *   bit10-0  = Tile 索引 (0-2047)
 */

import { VDP, cramToRGB } from './vdp.js';

/** Nametable 条目 */
export interface NameTableEntry {
  tileIndex: number;
  hFlip: boolean;
  vFlip: boolean;
  palette: number;
  priority: number;
}

/** 解析 nametable 条目 */
export function parseNameTableEntry(vram: Uint8Array, addr: number): NameTableEntry {
  const lo = vram[addr & 0xFFFF];
  const hi = vram[(addr + 1) & 0xFFFF];
  const word = (hi << 8) | lo;
  return {
    tileIndex: word & 0x07FF,
    hFlip: !!(word & 0x0800),   // bit 11 = H flip (not bit 12)
    vFlip: !!(word & 0x1000),   // bit 12 = V flip (not bit 11)
    palette: (word >> 13) & 0x03,
    priority: (word >> 15) & 0x01,
  };
}

// ============================================================
// Tile 解码器 (Genesis 4bpp: 8rows × 4planes)
// ============================================================
function decodeTileRow(vram: Uint8Array, tileIndex: number): Uint8Array[] {
  const base = (tileIndex & 0x7FF) * 32;
  const rows: Uint8Array[] = [];
  for (let y = 0; y < 8; y++) {
    const rb = base + y * 4;
    const p0 = vram[rb], p1 = vram[rb + 1];
    const p2 = vram[rb + 2], p3 = vram[rb + 3];
    const row = new Uint8Array(8);
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      row[x] =
        ((p0 >> bit) & 1) |
        ((p1 >> bit) & 1) << 1 |
        ((p2 >> bit) & 1) << 2 |
        ((p3 >> bit) & 1) << 3;
    }
    rows.push(row);
  }
  return rows;
}

// ============================================================
// 全局 tile cache (按需填充)
// ============================================================
const tileRowsCache = new Map<number, Uint8Array[]>();

function getCachedTileRows(vram: Uint8Array, tileIndex: number): Uint8Array[] {
  // Genesis VDP: tile index 0 is valid — transparency is pixel value 0, not tile index
  let cached = tileRowsCache.get(tileIndex);
  if (!cached) {
    cached = decodeTileRow(vram, tileIndex);
    tileRowsCache.set(tileIndex, cached);
  }
  return cached;
}

/** 清空缓存 (VRAM 更新后调用) */
export function invalidateTileCache(): void {
  tileRowsCache.clear();
}

// ============================================================
// Plane 渲染 (优化版)
// ============================================================
export function renderPlane(
  vdp: VDP,
  planeBase: number,
  scrollX: number,
  scrollY: number,
  isPlaneA: boolean,
  output: Uint8Array,
  outWidth: number,
  outHeight: number,
  priorityFilter: number = -1,
): void {
  const vram = vdp.vram;
  const planeWidthTiles = 64;
  const planeHeightTiles = 32;
  const planeWidthPixels = planeWidthTiles * 8;
  const planeHeightPixels = planeHeightTiles * 8;

  // 滚动取模
  const sx = ((scrollX % planeWidthPixels) + planeWidthPixels) % planeWidthPixels;
  const sy = ((scrollY % planeHeightPixels) + planeHeightPixels) % planeHeightPixels;

  // 遍历所有可视 tile (而非逐个像素)
  const startTileX = Math.floor(sx / 8);
  const startTileY = Math.floor(sy / 8);
  const startPixelX = sx % 8;
  const startPixelY = sy % 8;

  const tilesPerRow = Math.ceil((outWidth + startPixelX) / 8) + 1;
  const tilesPerCol = Math.ceil((outHeight + startPixelY) / 8) + 1;

  for (let ty = 0; ty < tilesPerCol; ty++) {
    for (let tx = 0; tx < tilesPerRow; tx++) {
      const ntX = (startTileX + tx) % planeWidthTiles;
      const ntY = (startTileY + ty) % planeHeightTiles;

      // 读取 nametable 条目
      const entryAddr = planeBase + (ntY * planeWidthTiles + ntX) * 2;
      const entry = parseNameTableEntry(vram, entryAddr);

      if (priorityFilter !== -1 && entry.priority !== priorityFilter) continue;
      // Genesis VDP: tile index 0 is valid; transparency is pixel value 0
      // (former skip removed — tile 0 is a legitimate tile in opening animation)

      // 获取缓存的 tile 行
      const tileRows = getCachedTileRows(vram, entry.tileIndex);
      if (tileRows.length === 0) continue;

      const palBase = entry.palette * 16;

      // 计算此 tile 在输出中的像素范围
      const tileScreenX = tx * 8 - startPixelX;
      const tileScreenY = ty * 8 - startPixelY;

      for (let py = 0; py < 8; py++) {
        const screenY = tileScreenY + py;
        if (screenY < 0 || screenY >= outHeight) continue;

        const srcY = entry.vFlip ? (7 - py) : py;
        const row = tileRows[srcY];

        for (let px = 0; px < 8; px++) {
          const screenX = tileScreenX + px;
          if (screenX < 0 || screenX >= outWidth) continue;

          const srcX = entry.hFlip ? (7 - px) : px;
          const pixelValue = row[srcX];
          if (pixelValue === 0) continue; // 透明

          const colorIdx = palBase + pixelValue;
          const cramValue = vdp.readCRAM(colorIdx);
          const { r, g, b } = cramToRGB(cramValue);

          const outIdx = (screenY * outWidth + screenX) * 4;
          output[outIdx] = r;
          output[outIdx + 1] = g;
          output[outIdx + 2] = b;
          output[outIdx + 3] = 255;
        }
      }
    }
  }
}

/** Window 层渲染 (暂未实现) */
export function renderWindow(
  vdp: VDP,
  output: Uint8Array,
  outWidth: number,
  outHeight: number,
): void {
  // 本游戏不使用 Window 层
}
