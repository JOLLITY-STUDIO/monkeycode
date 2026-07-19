/**
 * Canvas 渲染器 - 把 PPU 状态渲染到 Canvas
 *
 * 模拟 NES PPU 的渲染流程:
 *   1. 从 TileCache 获取预渲染 tile pixels + 动态调色板
 *   2. 根据 nametable 拼出背景 (应用 attribute table 调色板)
 *   3. 叠加 sprite (OAM, 支持 flip)
 */
import { PpuState, OAM_SIZE, SPRITE_COUNT, NES_PALETTE } from '../types';
import { TileCache } from './TileCache';

const SCREEN_W = 256;
const SCREEN_H = 240;

/** PPU 渲染到帧缓冲 */
export function renderPpuFrame(
  ppu: PpuState,
  tileCache: TileCache,
  canvas: any,
): void {
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.createImageData(SCREEN_W, SCREEN_H);
  const buf = new Uint32Array(imageData.data.buffer);

  // 1. 渲染背景 (nametable + attribute)
  renderBackground(ppu, tileCache, buf);

  // 2. 渲染精灵 (sprites, back-to-front)
  renderSprites(ppu, tileCache, buf);

  ctx.putImageData(imageData, 0, 0);
}

// ============================================================================
// 背景渲染: nametable + attribute table
// ============================================================================

function renderBackground(
  ppu: PpuState,
  tc: TileCache,
  buf: Uint32Array,
): void {
  if (!(ppu.mask & 0x08)) return; // background disabled

  const ntId = ppu.ctrl & 0x03;
  const ntOffset = ntId << 10;
  const basePattern = (ppu.ctrl & 0x10) ? 256 : 0; // 0 or 256 tile offset

  for (let tileY = 0; tileY < 30; tileY++) {
    for (let tileX = 0; tileX < 32; tileX++) {
      const ntIndex = tileY * 32 + tileX;
      const tileId = basePattern + ppu.vram[ntIndex];

      // Attribute table: 每 2×2 tile 块共享一个 palette
      const attrX = tileX >> 2;
      const attrY = tileY >> 2;
      const attrIndex = 0x03C0 + attrY * 8 + attrX;
      const attrByte = ppu.vram[attrIndex];
      const quadrant = ((tileY & 0x02) << 1) | (tileX & 0x02);
      const palIdx = (attrByte >> quadrant) & 0x03;

      // 从缓存获取预渲染 tile
      const tilePx = tc.getTile(tileId, palIdx, ppu.palette);

      // 拷贝 8×8 像素到帧缓冲
      const dstX = tileX * 8;
      const dstY = tileY * 8;
      blit8x8(tilePx, buf, SCREEN_W, dstX, dstY);
    }
  }
}

// ============================================================================
// 精灵渲染: OAM (64 sprites)
// ============================================================================

function renderSprites(
  ppu: PpuState,
  tc: TileCache,
  buf: Uint32Array,
): void {
  if (!(ppu.mask & 0x10)) return; // sprites disabled

  const spriteHeight = (ppu.ctrl & 0x20) ? 16 : 8;
  const basePattern = (ppu.ctrl & 0x08) ? 256 : 0;

  // back-to-front: 低索引高优先级
  for (let i = SPRITE_COUNT - 1; i >= 0; i--) {
    const off = i * 4;
    const y = ppu.oam[off];
    const rawTileId = ppu.oam[off + 1];
    const attr = ppu.oam[off + 2];
    const x = ppu.oam[off + 3];

    if (y >= 0xEF) continue; // off-screen

    const palIdx = (attr & 0x03) + 4; // sprites use palettes 4-7
    const flipH = (attr & 0x40) !== 0;
    const flipV = (attr & 0x80) !== 0;
    const behindBg = (attr & 0x20) !== 0; // TODO: BG priority

    // 8×16 sprite 模式: 用 2 个连续的 tile
    const tiles = spriteHeight === 16
      ? [basePattern + (rawTileId & 0xFE), basePattern + (rawTileId & 0xFE) + 1]
      : [basePattern + rawTileId];

    for (let ty = 0; ty < tiles.length; ty++) {
      const tileId = flipV
        ? tiles[tiles.length - 1 - ty]
        : tiles[ty];

      const tilePx = tc.getTile(tileId, palIdx, ppu.palette);

      const dstX = x;
      const dstY = y + ty * 8;

      blit8x8Flipped(tilePx, buf, SCREEN_W, dstX, dstY, flipH, flipV);
    }
  }
}

// ============================================================================
// 像素拷贝工具
// ============================================================================

/** 拷贝 8×8 tile 像素到帧缓冲 (无翻转) */
function blit8x8(
  src: Uint32Array,
  dst: Uint32Array,
  stride: number,
  dstX: number,
  dstY: number,
): void {
  for (let py = 0; py < 8; py++) {
    const scrY = dstY + py;
    if (scrY < 0 || scrY >= SCREEN_H) continue;
    const rowOff = scrY * stride;
    const srcOff = py * 8;
    for (let px = 0; px < 8; px++) {
      const scrX = dstX + px;
      if (scrX >= 0 && scrX < SCREEN_W) {
        dst[rowOff + scrX] = src[srcOff + px];
      }
    }
  }
}

/** 拷贝 8×8 tile 像素到帧缓冲 (支持水平/垂直翻转) */
function blit8x8Flipped(
  src: Uint32Array,
  dst: Uint32Array,
  stride: number,
  dstX: number,
  dstY: number,
  flipH: boolean,
  flipV: boolean,
): void {
  for (let py = 0; py < 8; py++) {
    const scrY = dstY + (flipV ? (7 - py) : py);
    if (scrY < 0 || scrY >= SCREEN_H) continue;
    const rowOff = scrY * stride;
    const srcOff = (flipV ? (7 - py) : py) * 8;
    for (let px = 0; px < 8; px++) {
      const scrX = dstX + px;
      if (scrX < 0 || scrX >= SCREEN_W) continue;
      const si = flipH ? (7 - px) : px;
      dst[rowOff + scrX] = src[srcOff + si];
    }
  }
}
