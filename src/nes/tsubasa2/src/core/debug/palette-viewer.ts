// @ts-nocheck
/**
 * Palette Viewer — 每组 4 色独立显示 (Group 0~3)
 *
 * 布局:
 * ┌──────────────────────────────────────┐
 * │ [ BG  ]              [ SPR ]         │
 * │ G0 G1 G2 G3         G0 G1 G2 G3     │
 * │ ■  ■  ■  ■          ■  ■  ■  ■     │
 * │ ■  ■  ■  ■          ■  ■  ■  ■     │
 * │ ■  ■  ■  ■          ■  ■  ■  ■     │
 * │ ■  ■  ■  ■          ■  ■  ■  ■     │
 * │                                      │
 * │        [ System Palette 64 ]        │
 * │  8×8 网格                           │
 * └──────────────────────────────────────┘
 */

import type NES from '../nes';

export interface PaletteViewerData {
  systemPalette: Uint32Array;
  imgPalette: Uint32Array;
  sprPalette: Uint32Array;
  rawImgPalette: Uint8Array;
  rawSprPalette: Uint8Array;
  emphasis: number;
}

export function getPaletteData(nes: NES): PaletteViewerData {
  const ppu = nes.ppu;
  const systemPalette = new Uint32Array(ppu.palTable.curTable);
  const imgPalette = new Uint32Array(ppu.imgPalette);
  const sprPalette = new Uint32Array(ppu.sprPalette);

  const rawImg = new Uint8Array(16);
  const rawSpr = new Uint8Array(16);
  for (let i = 0; i < 16; i++) {
    rawImg[i] = ppu.vramMem[0x3f00 + i] & 0x3f;
    rawSpr[i] = ppu.vramMem[0x3f10 + i] & 0x3f;
  }

  return {
    systemPalette,
    imgPalette,
    sprPalette,
    rawImgPalette: rawImg,
    rawSprPalette: rawSpr,
    emphasis: ppu.f_color,
  };
}

export function renderPaletteImage(nes: NES): {
  data: Uint32Array;
  width: number;
  height: number;
} {
  const d = getPaletteData(nes);

  const BLOCK = 16;          // BG/SPR 色块大小
  const GAP_C = 2;           // 组内色块间距
  const GAP_G = 6;           // 组间距
  const GAP_S = 14;          // BG-SPR 分段间距
  const MARGIN = 6;          // 边距
  const LABEL_H = 18;        // 标签行高

  const GRP_W = BLOCK;                           // 每组宽度
  const GRP_H = 4 * BLOCK + 3 * GAP_C;           // 每组高度 = 4 色块 + 间距

  const secW = 4 * GRP_W + 3 * GAP_G;            // 每段宽度 (BG 或 SPR)
  const width = MARGIN + secW + GAP_S + secW + MARGIN;
  const topH = LABEL_H + GRP_H;                   // 上半部分高度

  // 系统调色板：8×8 网格
  const SYS_B = 9;
  const SYS_G = 2;
  const sysW = 8 * SYS_B + 7 * SYS_G;            // 系统网格宽度
  const sysH = sysW;
  const sysX = Math.floor((width - sysW) / 2);
  const sysY = topH + GAP_S;

  const height = sysY + sysH + MARGIN;

  const buf = new Uint32Array(width * height);
  buf.fill(0xff_1a1a2e);

  const drawBlock = (x: number, y: number, color: number, size: number): void => {
    for (let j = 0; j < size; j++) {
      const row = (y + j) * width;
      for (let i = 0; i < size; i++) {
        buf[row + x + i] = color;
      }
    }
  };

  // ── BG 调色板: 4 组，每组 4 色纵向排列 ──
  for (let g = 0; g < 4; g++) {
    const gx = MARGIN + g * (BLOCK + GAP_G);
    const gy = LABEL_H;
    for (let c = 0; c < 4; c++) {
      drawBlock(gx, gy + c * (BLOCK + GAP_C), d.imgPalette[g * 4 + c], BLOCK);
    }
  }

  // ── SPR 调色板 ──
  const sprOx = MARGIN + secW + GAP_S;
  for (let g = 0; g < 4; g++) {
    const gx = sprOx + g * (BLOCK + GAP_G);
    const gy = LABEL_H;
    for (let c = 0; c < 4; c++) {
      drawBlock(gx, gy + c * (BLOCK + GAP_C), d.sprPalette[g * 4 + c], BLOCK);
    }
  }

  // ── 系统调色板 (64 色, 8×8) ──
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      drawBlock(sysX + c * (SYS_B + SYS_G), sysY + r * (SYS_B + SYS_G),
                d.systemPalette[r * 8 + c], SYS_B);
    }
  }

  return { data: buf, width, height };
}
