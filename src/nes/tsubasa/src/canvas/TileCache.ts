/**
 * ============================================================================
 * TileCache — CHR 瓦片缓存，避免每帧逐像素解码 bitplane
 *
 * NES tile = 8×8 px, 2-bit depth (4 colors).
 * CHR RAM 用 2 planes × 8 bytes = 16 bytes 表示一个 tile。
 *
 * 缓存策略:
 *   - 原始解码 (pixelRaw): tileId → Uint8Array[64] (0-3 color index)
 *   - 调色板渲染 (pixelArgb): (tileId, paletteIdx) → Uint32Array[64] (ARGB)
 *   - CHR RAM 写入时标记受影响的 tile 为脏
 *
 * 总计最多 512 tiles × 8 palettes = 4096 个缓存条目
 * 每个条目 64 pixels × 4 bytes = 256 bytes
 * 全部缓存 = ~1MB，按需生成
 * ============================================================================
 */

import { NES_PALETTE } from '../types';

/** 每个 tile = 8×8 = 64 像素 */
const TILE_PX = 8;
const TILE_PIXELS = TILE_PX * TILE_PX; // 64

/** CHR RAM = 8KB = 512 tiles (两个 pattern table) */
const TOTAL_TILES = 512;

/** 调色板 0-7 (4 背景 + 4 精灵) */
const PALETTE_COUNT = 8;

export interface ArgbTile {
  /** ARGB Uint32Array, 64 elements, row-major (y*8 + x) */
  pixels: Uint32Array;
  dirty: boolean;
}

export interface TileCache {
  /** 获取带调色板渲染的 tile 像素 (自动缓存) */
  getTile(tileId: number, paletteIdx: number, palette: Uint8Array): Uint32Array;

  /**
   * 标记 CHR RAM 地址对应的 tile 为脏
   * tileId = chrAddr >> 4 (每 16 bytes 一个 tile)
   */
  markDirty(chrAddr: number): void;

  /** 全部失效 (全屏刷新 / reset 时调用) */
  invalidateAll(): void;

  /** 调色板变化时使所有 ARGB 缓存失效 (保留原始 tile 解码) */
  markPaletteDirty(): void;

  /** 获取缓存统计 */
  getStats(): Readonly<{ hits: number; misses: number; invalidations: number }>;
}

// ============================================================================

export function createTileCache(chrRam: Uint8Array): TileCache {
  // ---- 缓存 ----
  // tileRaw[tileId] = Uint8Array[64] 原始 color index (0-3)
  const tileRaw: (Uint8Array | null)[] = new Array(TOTAL_TILES).fill(null);
  const tileRawDirty: boolean[] = new Array(TOTAL_TILES).fill(true);

  // tileArgb[tileId * PALETTE_COUNT + paletteIdx] = Uint32Array[64]
  const cacheSize = TOTAL_TILES * PALETTE_COUNT;
  const tileArgb: (Uint32Array | null)[] = new Array(cacheSize).fill(null);
  const tileArgbDirty: boolean[] = new Array(cacheSize).fill(true);

  let stats = { hits: 0, misses: 0, invalidations: 0 };

  // ---- 内部函数 ----

  function decodeRaw(tileId: number): Uint8Array {
    const pixels = new Uint8Array(TILE_PIXELS);
    const base = tileId * 16;
    for (let y = 0; y < 8; y++) {
      const lo = chrRam[base + y];
      const hi = chrRam[base + y + 8];
      const rowOff = y * 8;
      for (let x = 0; x < 8; x++) {
        const bit = 7 - x;
        pixels[rowOff + x] = ((lo >> bit) & 1) | (((hi >> bit) & 1) << 1);
      }
    }
    return pixels;
  }

  function renderArgb(raw: Uint8Array, palette: Uint8Array, palIdx: number): Uint32Array {
    const buf = new Uint32Array(TILE_PIXELS);
    const basePal = palIdx * 4;
    const bgColor = NES_PALETTE[palette[0] & 0x3F] | 0xFF000000;

    for (let i = 0; i < TILE_PIXELS; i++) {
      const ci = raw[i];
      buf[i] = ci === 0
        ? bgColor
        : NES_PALETTE[palette[basePal + ci] & 0x3F] | 0xFF000000;
    }
    return buf;
  }

  // ---- Public API ----

  function getTile(tileId: number, paletteIdx: number, palette: Uint8Array): Uint32Array {
    const cacheIdx = tileId * PALETTE_COUNT + (paletteIdx & 7);

    // 检查缓存
    if (!tileArgbDirty[cacheIdx] && tileArgb[cacheIdx]) {
      stats.hits++;
      return tileArgb[cacheIdx]!;
    }

    stats.misses++;

    // 获取/更新原始解码
    if (tileRawDirty[tileId] || !tileRaw[tileId]) {
      tileRaw[tileId] = decodeRaw(tileId);
      tileRawDirty[tileId] = false;
    }

    // 渲染带调色板的 tile
    const argb = renderArgb(tileRaw[tileId]!, palette, paletteIdx);
    tileArgb[cacheIdx] = argb;
    tileArgbDirty[cacheIdx] = false;
    return argb;
  }

  function markDirty(chrAddr: number): void {
    const tileId = chrAddr >> 4; // / 16
    if (tileId >= TOTAL_TILES) return;

    tileRawDirty[tileId] = true;

    // 该 tile 的所有调色板变体都失效
    const base = tileId * PALETTE_COUNT;
    for (let p = 0; p < PALETTE_COUNT; p++) {
      tileArgbDirty[base + p] = true;
    }

    stats.invalidations++;
  }

  function invalidateAll(): void {
    tileRaw.fill(null);
    tileRawDirty.fill(true);
    tileArgb.fill(null);
    tileArgbDirty.fill(true);
  }

  function markPaletteDirty(): void {
    // 调色板变化只影响 ARGB 渲染缓存，原始 tile 解码不变
    tileArgb.fill(null);
    tileArgbDirty.fill(true);
    stats.invalidations += tileArgb.length;
  }

  function getStats() {
    return stats as Readonly<typeof stats>;
  }

  return { getTile, markDirty, invalidateAll, markPaletteDirty, getStats };
}
