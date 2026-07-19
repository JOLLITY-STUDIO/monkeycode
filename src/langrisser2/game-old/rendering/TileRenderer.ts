/**
 * TileRenderer.ts — Canvas 2D VDP tile 渲染器
 *
 * 加载 Genesis 4bpp tile 数据到 VRAM，解码后渲染到 Canvas
 * 用于 BattleScene 的地图绘制 (替换之前的色块渲染)
 */

import { decodeTile, TILE_BYTES } from '../hw/vdp/tile';
import { cramToRGB } from '../hw/vdp/vdp';

// ============================================================================
// Types
// ============================================================================

export interface TileAtlas {
  /** Canvas with all tiles in a grid */
  canvas: HTMLCanvasElement;
  /** Number of tiles per row in the atlas */
  tilesPerRow: number;
  /** Total tiles in the atlas */
  tileCount: number;
  /** Tile size (always 8) */
  tileSize: number;
}

// ============================================================================
// Default terrain palette (colors 0-15)
// These approximate the standard Langrisser II terrain palette
// ============================================================================
const DEFAULT_TERRAIN_PALETTE: [number, number, number][] = [
  [0,   0,   0  ],   // 0: transparent/black
  [34,  136, 34 ],   // 1: green (grass base)
  [68,  170, 68 ],   // 2: light green
  [0,   85,  0  ],   // 3: dark green
  [136, 102, 34 ],   // 4: brown (mountain base)
  [170, 136, 51 ],   // 5: light brown
  [102, 68,  0  ],   // 6: dark brown
  [51,  102, 170],   // 7: blue (water base)
  [68,  136, 204],   // 8: light blue
  [0,   51,  119],   // 9: dark blue
  [170, 170, 170],   // 10: gray (stone)
  [204, 204, 204],   // 11: light gray
  [102, 102, 102],   // 12: dark gray
  [170, 170, 136],   // 13: tan (sand)
  [204, 204, 170],   // 14: light tan
  [136, 136, 102],   // 15: dark tan
];

// ============================================================================
// Tile atlas building
// ============================================================================

/**
 * Load raw 4bpp tile data (Genesis format) into a VRAM buffer and decode tiles.
 *
 * @param tileData Raw tile data in Genesis 4bpp format (32 bytes per tile)
 * @param palette RGB palette array (16 colors)
 * @param tileCount Number of tiles to decode (default: file size / 32)
 * @returns TileAtlas for rendering
 */
export function buildTileAtlas(
  tileData: Uint8Array,
  palette: [number, number, number][] = DEFAULT_TERRAIN_PALETTE,
  tileCount?: number,
): TileAtlas {
  const count = tileCount ?? Math.floor(tileData.length / TILE_BYTES);
  const tilesPerRow = Math.ceil(Math.sqrt(count));
  const tileSize = 8; // Genesis tiles are 8x8
  const imgSize = tilesPerRow * tileSize;

  const canvas = document.createElement('canvas');
  canvas.width = imgSize;
  canvas.height = imgSize;
  const ctx = canvas.getContext('2d')!;

  // VRAM buffer for tile decoding
  const vram = new Uint8Array(0x10000);
  vram.set(tileData.slice(0, count * TILE_BYTES));

  // Decode each tile and paint to canvas
  const pixelBuf = new Uint8Array(64); // 8x8 = 64 pixels
  const imgData = ctx.createImageData(imgSize, imgSize);

  for (let t = 0; t < count; t++) {
    decodeTile(vram, t * TILE_BYTES, pixelBuf, 0);

    const atlasX = (t % tilesPerRow) * tileSize;
    const atlasY = Math.floor(t / tilesPerRow) * tileSize;

    for (let py = 0; py < tileSize; py++) {
      for (let px = 0; px < tileSize; px++) {
        const colorIdx = pixelBuf[py * tileSize + px] & 0x0F;
        const [r, g, b] = palette[colorIdx] || [0, 0, 0];
        const imgOff = ((atlasY + py) * imgSize + (atlasX + px)) * 4;
        imgData.data[imgOff] = r;
        imgData.data[imgOff + 1] = g;
        imgData.data[imgOff + 2] = b;
        imgData.data[imgOff + 3] = 255; // alpha
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);

  return { canvas, tilesPerRow, tileCount: count, tileSize };
}

// ============================================================================
// Map rendering
// ============================================================================

export interface MapRenderOptions {
  /** Canvas to render to */
  ctx: CanvasRenderingContext2D;
  /** Tile atlas */
  atlas: TileAtlas;
  /** Nametable (MAP_TILES from stage data) — Genesis VDP format entries */
  nametable: number[];
  /** Map width in tiles */
  mapWidth: number;
  /** Map height in tiles */
  mapHeight: number;
  /** Top-left tile of visible area */
  scrollX: number;
  scrollY: number;
  /** Visible area size in tiles */
  viewW: number;
  viewH: number;
  /** Pixel size of each rendered tile (zoom) */
  displayTileSize?: number;
}

/**
 * Render a section of the map using a tile atlas.
 *
 * Each nametable entry is a Genesis VDP nametable word:
 *   bit15: Priority
 *   bit14: Palette select
 *   bit13: Vertical flip
 *   bit12: Horizontal flip
 *   bit11-0: Tile index (0-2047)
 */
export function renderMap(options: MapRenderOptions): void {
  const { ctx, atlas, nametable, mapWidth, mapHeight, scrollX, scrollY, viewW, viewH } = options;
  const ts = options.displayTileSize ?? atlas.tileSize;

  for (let vy = 0; vy < viewH; vy++) {
    for (let vx = 0; vx < viewW; vx++) {
      const mx = scrollX + vx;
      const my = scrollY + vy;
      if (mx < 0 || my < 0 || mx >= mapWidth || my >= mapHeight) continue;

      const entry = nametable[my * mapWidth + mx] ?? 0;
      const tileIdx = entry & 0x7FF;        // bits 11-0: tile index
      const hFlip = !!(entry & 0x800);       // bit12
      const vFlip = !!(entry & 0x1000);      // bit13
      // Skip priority and palette for now (bit14-15)

      if (tileIdx >= atlas.tileCount) continue;

      // Source tile position in atlas
      const sx = (tileIdx % atlas.tilesPerRow) * atlas.tileSize;
      const sy = Math.floor(tileIdx / atlas.tilesPerRow) * atlas.tileSize;

      // Destination on canvas
      const dx = vx * ts;
      const dy = vy * ts;

      // Draw with optional flip
      ctx.save();
      ctx.translate(dx + (hFlip ? ts : 0), dy + (vFlip ? ts : 0));
      ctx.scale(hFlip ? -1 : 1, vFlip ? -1 : 1);
      ctx.drawImage(atlas.canvas, sx, sy, atlas.tileSize, atlas.tileSize, 0, 0, ts, ts);
      ctx.restore();
    }
  }
}

// ============================================================================
// CRAM palette extraction
// ============================================================================

/**
 * Extract an RGB palette from VDP CRAM data.
 * @param cram CRAM byte array (128 bytes = 64 colors × 2 bytes)
 * @param startColor Starting color index (0-63)
 * @param count Number of colors to extract (up to 16)
 */
export function extractPalette(
  cram: Uint8Array,
  startColor: number = 0,
  count: number = 16,
): [number, number, number][] {
  const palette: [number, number, number][] = [];
  for (let i = 0; i < count; i++) {
    const off = ((startColor + i) * 2) & 0x7F;
    const val = (cram[off + 1] << 8) | cram[off];
    const { r, g, b } = cramToRGB(val);
    palette.push([r, g, b]);
  }
  return palette;
}
