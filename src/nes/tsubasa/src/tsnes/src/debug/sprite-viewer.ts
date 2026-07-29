/**
 * Sprite Viewer — 参照 FCEUX ppuViewer 的 oamPatternView / sprite 面板
 *
 * 显示 OAM 中所有 64 个精灵 (8×8 或 8×16) 的当前图案+调色板+位置
 */

import type NES from '../nes';

export interface SpriteEntry {
  /** OAM 索引 (0–63) */
  index: number;
  /** X 坐标 */
  x: number;
  /** Y 坐标 */
  y: number;
  /** 图案表 tile 索引 */
  tileIndex: number;
  /** 调色板偏移 (0/4/8/12, 与 PPU sprCol 一致) */
  palette: number;
  /** 水平翻转 */
  flipH: boolean;
  /** 垂直翻转 */
  flipV: boolean;
  /** 背景优先级 (0=在前面) */
  bgPriority: boolean;
  /** 精灵像素数据 (8 or 16 × 8 pixels) — RGBA */
  image: Uint32Array;
  /** 图像宽度 */
  imgWidth: number;  // 8
  /** 图像高度 */
  imgHeight: number; // 8 or 16
}

export interface SpriteViewerData {
  sprites: SpriteEntry[];
  /** 精灵尺寸模式 */
  is8x16: boolean;
  /** 精灵图案表选择 */
  spTable: 0 | 1;
}

/**
 * 渲染单个精灵到 RGBA buffer (8×8)
 * 参照 FCEUX: 使用精灵调色板和翻转标志
 */
function renderSpriteTile(
  ppu: any,
  tileIdx: number,
  paletteOffset: number,
  flipH: boolean,
  flipV: boolean,
  width: number = 8,
  height: number = 8,
): Uint32Array {
  const buf = new Uint32Array(width * height);
  const pal = ppu.sprPalette;
  const backdrop = 0x00000000; // 透明
  const ptTile = ppu.ptTile[tileIdx];

  if (!ptTile || !ptTile.pix) {
    buf.fill(0xff_333333);
    return buf;
  }

  const pix = ptTile.pix;
  for (let py = 0; py < height; py++) {
    const srcPy = flipV ? (height - 1 - py) : py;
    for (let px = 0; px < width; px++) {
      const srcPx = flipH ? (width - 1 - px) : px;
      const colIdx = pix[srcPy * 8 + srcPx];
      // 精灵透明像素留空 (不显示)
      buf[py * width + px] = colIdx === 0
        ? backdrop
        : (pal[colIdx + paletteOffset] ?? backdrop);
    }
  }

  return buf;
}

/**
 * 读取所有精灵数据
 */
export function getSpriteData(nes: NES): SpriteViewerData {
  const ppu = nes.ppu;
  const is8x16 = ppu.f_spriteSize === 1;
  const sprites: SpriteEntry[] = [];

  for (let i = 0; i < 64; i++) {
    const sprX = ppu.sprX[i];
    const sprY = ppu.sprY[i];
    const sprTile = ppu.sprTile[i];
    // ppu.sprCol 已经是 palette offset (0/4/8/12)，与 renderSpritesPartially 中 palAdd 一致
    const sprCol = ppu.sprCol[i];
    const flipH = ppu.horiFlip[i] === 1;
    const flipV = ppu.vertFlip[i] === 1;
    const bgPri = ppu.bgPriority[i] === 1;

    if (is8x16) {
      // 8×16 精灵 (参照 FCEUX): PPU 用 bit 0 选 pattern table, bits 7-1 是表内 tile 编号
      // 与 renderSpritesPartially 中 topTileNum / top 计算一致
      const tileInTable = sprTile >> 1;           // bits 7-1: 表内 tile 编号 (0~127)
      const tableOffset = (sprTile & 1) << 8;     // bit 0: 0=$0000, 1=$1000
      const upperTile = tileInTable + tableOffset;        // 上半
      const lowerTile = (tileInTable + 1) + tableOffset;  // 下半

      const img = new Uint32Array(8 * 16);

      // 垂直翻转时整体上下 tile 也要交换
      const topTile = flipV ? lowerTile : upperTile;
      const bottomTile = flipV ? upperTile : lowerTile;
      const topBuf = renderSpriteTile(ppu, topTile, sprCol, flipH, flipV, 8, 8);
      const bottomBuf = renderSpriteTile(ppu, bottomTile, sprCol, flipH, flipV, 8, 8);

      for (let py = 0; py < 8; py++) {
        for (let px = 0; px < 8; px++) {
          img[py * 8 + px] = topBuf[py * 8 + px];
          img[(py + 8) * 8 + px] = bottomBuf[py * 8 + px];
        }
      }

      sprites.push({
        index: i,
        x: sprX, y: sprY,
        tileIndex: sprTile,
        palette: sprCol,
        flipH, flipV,
        bgPriority: bgPri,
        image: img,
        imgWidth: 8, imgHeight: 16,
      });
    } else {
      // 8×8 精灵：用 PPUCTRL 的 spPatternTable 选择表
      const tableOffset = ppu.f_spPatternTable << 8;
      const globalTile = sprTile + tableOffset;
      const img = renderSpriteTile(ppu, globalTile, sprCol, flipH, flipV, 8, 8);

      sprites.push({
        index: i,
        x: sprX, y: sprY,
        tileIndex: sprTile,
        palette: sprCol,
        flipH, flipV,
        bgPriority: bgPri,
        image: img,
        imgWidth: 8, imgHeight: 8,
      });
    }
  }

  return {
    sprites,
    is8x16,
    spTable: (ppu.f_spPatternTable ? 1 : 0) as (0 | 1),
  };
}
