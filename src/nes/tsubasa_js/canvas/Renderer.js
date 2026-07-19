/**
 * Canvas 渲染器 - 把 PPU 状态渲染到 Canvas
 */
import { OAM_SIZE, SPRITE_COUNT, NES_PALETTE } from '../types.js';

const SCREEN_W = 256;
const SCREEN_H = 240;

/** PPU 渲染到帧缓冲 */
export function renderPpuFrame(ppu, chr, canvas) {
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(SCREEN_W, SCREEN_H);
  const buf = new Uint32Array(imageData.data.buffer);

  renderBackground(ppu, chr, buf);
  renderSprites(ppu, chr, buf);

  ctx.putImageData(imageData, 0, 0);
}

/** 渲染背景 (nametable + attribute table) */
function renderBackground(ppu, chr, buf) {
  if (!(ppu.mask & 0x08)) return;

  const basePattern = (ppu.ctrl & 0x10) ? 0x1000 : 0x0000;
  const ntId = ppu.ctrl & 0x03;

  for (let tileY = 0; tileY < 30; tileY++) {
    for (let tileX = 0; tileX < 32; tileX++) {
      const ntIndex = tileY * 32 + tileX;
      const tileId = ppu.vram[ntIndex];

      const attrX = tileX >> 2;
      const attrY = tileY >> 2;
      const attrIndex = 0x03C0 + attrY * 8 + attrX;
      const attrByte = ppu.vram[attrIndex];
      const quadrant = ((tileY & 0x02) << 1) | (tileX & 0x02);
      const paletteIdx = (attrByte >> (quadrant & 0x06)) & 0x03;

      renderTile(
        buf, SCREEN_W,
        tileX * 8, tileY * 8,
        basePattern + tileId * 16,
        chr, ppu.palette, paletteIdx,
        false
      );
    }
  }
}

/** 渲染精灵 */
function renderSprites(ppu, chr, buf) {
  if (!(ppu.mask & 0x10)) return;

  const spriteHeight = (ppu.ctrl & 0x20) ? 16 : 8;
  const basePattern = (ppu.ctrl & 0x08) ? 0x1000 : 0x0000;

  for (let i = SPRITE_COUNT - 1; i >= 0; i--) {
    const oamOff = i * 4;
    const y = ppu.oam[oamOff];
    const tileId = ppu.oam[oamOff + 1];
    const attr = ppu.oam[oamOff + 2];
    const x = ppu.oam[oamOff + 3];

    if (y >= 0xEF) continue;

    const paletteIdx = (attr & 0x03) + 4;
    const flipH = (attr & 0x40) !== 0;
    const flipV = (attr & 0x80) !== 0;

    const patternAddr = spriteHeight === 16
      ? (tileId & 0x01) * 0x1000 + (tileId & 0xFE) * 16
      : basePattern + tileId * 16;

    for (let py = 0; py < spriteHeight; py++) {
      const row = flipV ? (spriteHeight - 1 - py) : py;
      const pixelRow = patternAddr + row * 16;
      const loPlane = chr[pixelRow];
      const hiPlane = chr[pixelRow + 8];

      for (let px = 0; px < 8; px++) {
        const col = flipH ? (7 - px) : px;
        const loBit = (loPlane >> (7 - col)) & 0x01;
        const hiBit = (hiPlane >> (7 - col)) & 0x01;
        const colorIdx = (hiBit << 1) | loBit;

        if (colorIdx === 0) continue;

        const scrX = x + px;
        const scrY = y + py;
        if (scrX >= SCREEN_W || scrY >= SCREEN_H) continue;

        const paletteColor = ppu.palette[paletteIdx * 4 + colorIdx];
        buf[scrY * SCREEN_W + scrX] = NES_PALETTE[paletteColor & 0x3F] | 0xFF000000;
      }
    }
  }
}

/** 渲染单个 8x8 tile */
function renderTile(buf, stride, tileScrX, tileScrY, patternAddr, chr, palette, paletteIdx, flipped) {
  for (let py = 0; py < 8; py++) {
    const off = patternAddr + py + (flipped ? 8 : 0);
    const loPlane = chr[off];
    const hiPlane = chr[off + 8];

    for (let px = 0; px < 8; px++) {
      const bitShift = 7 - px;
      const loBit = (loPlane >> bitShift) & 0x01;
      const hiBit = (hiPlane >> bitShift) & 0x01;
      const colorIdx = (hiBit << 1) | loBit;

      const scrX = tileScrX + px;
      const scrY = tileScrY + py;
      if (scrX >= SCREEN_W || scrY >= SCREEN_H) continue;

      if (colorIdx === 0) {
        buf[scrY * stride + scrX] = NES_PALETTE[palette[0] & 0x3F] | 0xFF000000;
      } else {
        const c = palette[paletteIdx * 4 + colorIdx];
        buf[scrY * stride + scrX] = NES_PALETTE[c & 0x3F] | 0xFF000000;
      }
    }
  }
}
