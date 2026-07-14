/**
 * Genesis VDP Sprite (精灵) 渲染 — 优化版
 *
 * 使用 tile 缓存，按行渲染而非逐像素
 */

import { VDP, cramToRGB } from './vdp.js';

export const MAX_SPRITES = 80;
export const SPRITE_ATTR_SIZE = 8;

const SIZE_TABLE: Record<number, number> = {
  0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8,
  8: 9, 9: 10, 10: 11, 11: 12, 12: 13, 13: 14, 14: 15, 15: 16,
};

export interface SpriteAttr {
  index: number;
  y: number;
  x: number;
  widthTiles: number;
  heightTiles: number;
  tileStart: number;
  hFlip: boolean;
  vFlip: boolean;
  palette: number;
  priority: number;
  link: number;
  visible: boolean;
}

// ============================================================
// Tile 解码 (与 plane.ts 共享逻辑)
// ============================================================

function decodeTileRows(vram: Uint8Array, tileIndex: number): Uint8Array[] {
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

const _spriteTileCache = new Map<number, Uint8Array[]>();

function getSpriteTileRows(vram: Uint8Array, tileIndex: number): Uint8Array[] {
  if (tileIndex === 0) return [];
  let cached = _spriteTileCache.get(tileIndex);
  if (!cached) {
    cached = decodeTileRows(vram, tileIndex);
    _spriteTileCache.set(tileIndex, cached);
  }
  return cached;
}

export function invalidateSpriteTileCache(): void {
  _spriteTileCache.clear();
}

// ============================================================
// 精灵解析
// ============================================================

export function parseSprites(vdp: VDP): SpriteAttr[] {
  const vram = vdp.vram;
  const base = vdp.spriteTableAddr;
  const result: SpriteAttr[] = [];

  let link = 0;
  let count = 0;

  while (link !== 0xFF && count < MAX_SPRITES) {
    const addr = base + link * SPRITE_ATTR_SIZE;

    const yLo = vram[addr];
    const yHi = vram[addr + 1];
    const y = ((yHi << 8) | yLo) & 0x3FF;

    const sizeByte = vram[addr + 2];
    const nextLink = vram[addr + 3];
    const wTiles = SIZE_TABLE[(sizeByte >> 4) & 0x0F] || 1;
    const hTiles = SIZE_TABLE[sizeByte & 0x0F] || 1;

    const tileLo = vram[addr + 4];
    const tileHi = vram[addr + 5];
    const tileAttr = (tileHi << 8) | tileLo;

    const xLo = vram[addr + 6];
    const xHi = vram[addr + 7];
    const x = ((xHi << 8) | xLo) & 0x3FF;

    result.push({
      index: link,
      y,
      x,
      widthTiles: wTiles,
      heightTiles: hTiles,
      tileStart: tileAttr & 0x07FF,
      hFlip: !!(tileAttr & 0x1000),
      vFlip: !!(tileAttr & 0x0800),
      palette: (tileAttr >> 13) & 0x03,
      priority: (tileAttr >> 15) & 0x01,
      link: nextLink,
      visible: y !== 0,
    });

    link = nextLink;
    count++;
  }

  return result;
}

// ============================================================
// 精灵渲染 (优化版)
// ============================================================

export function renderSprites(
  vdp: VDP,
  output: Uint8Array,
  outWidth: number,
  outHeight: number,
  priorityFilter: number = -1,
): void {
  const sprites = parseSprites(vdp);
  const vram = vdp.vram;

  for (const spr of sprites) {
    if (!spr.visible) continue;
    if (priorityFilter !== -1 && spr.priority !== priorityFilter) continue;

    const sprW = spr.widthTiles * 8;
    const sprH = spr.heightTiles * 8;
    const palBase = spr.palette * 16;

    // 裁剪到屏幕
    const sx0 = Math.max(0, spr.x);
    const sy0 = Math.max(0, spr.y);
    const sx1 = Math.min(outWidth, spr.x + sprW);
    const sy1 = Math.min(outHeight, spr.y + sprH);
    if (sx0 >= sx1 || sy0 >= sy1) continue;

    for (let py = sy0; py < sy1; py++) {
      let localY = py - spr.y;
      if (spr.vFlip) localY = sprH - 1 - localY;
      const tileY = (localY / 8) | 0;
      const pixelY = localY % 8;

      for (let px = sx0; px < sx1; px++) {
        let localX = px - spr.x;
        if (spr.hFlip) localX = sprW - 1 - localX;
        const tileX = (localX / 8) | 0;
        const pixelX = localX % 8;

        const tileIdx = spr.tileStart + tileY * spr.widthTiles + tileX;
        const tileRows = getSpriteTileRows(vram, tileIdx);
        if (tileRows.length === 0) continue;

        const pixelValue = tileRows[pixelY][pixelX];
        if (pixelValue === 0) continue;

        const colorIdx = palBase + pixelValue;
        const cramValue = vdp.readCRAM(colorIdx);
        const { r, g, b } = cramToRGB(cramValue);

        const outIdx = (py * outWidth + px) * 4;
        output[outIdx] = r;
        output[outIdx + 1] = g;
        output[outIdx + 2] = b;
        output[outIdx + 3] = 255;
      }
    }
  }
}
