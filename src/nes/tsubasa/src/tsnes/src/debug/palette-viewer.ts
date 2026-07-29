/**
 * Palette Viewer — 参照 FCEUX 调色板显示面板
 *
 * 显示：
 * - 32 个当前 PPU 调色板条目 (16 BG + 16 Sprite)
 * - 64 个 NES 系统颜色 (参照 FCEUX tilePaletteView / palView)
 */

import type NES from '../nes';

export interface PaletteViewerData {
  /** 系统调色板: 64 个 NES 颜色 → RGBA */
  systemPalette: Uint32Array;
  /** 背景调色板: 16 个 RGBA */
  imgPalette: Uint32Array;
  /** 精灵调色板: 16 个 RGBA */
  sprPalette: Uint32Array;
  /** 原始背景调色板索引 (6-bit) */
  rawImgPalette: Uint8Array;
  /** 原始精灵调色板索引 (6-bit) */
  rawSprPalette: Uint8Array;
  /** 色彩强调位 */
  emphasis: number;
}

/**
 * 获取当前调色板状态
 */
export function getPaletteData(nes: NES): PaletteViewerData {
  const ppu = nes.ppu;

  // 系统调色板 (64 色，带 color emphasis)
  const systemPalette = new Uint32Array(ppu.palTable.curTable);

  // 当前 BG / Sprite 调色板 (已解析为 RGB)
  const imgPalette = new Uint32Array(ppu.imgPalette);
  const sprPalette = new Uint32Array(ppu.sprPalette);

  // 原始调色板索引 (从 VRAM 读取)
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
    emphasis: ppu.f_color, // 低 3 位是 R/G/B emphasis
  };
}

/**
 * 渲染调色板为可视化图像 (FCEUX 风格)
 *
 * 布局:
 * ┌──────────────────┐
 * │ BG  Palette (16) │ ← 4 行 × 4 列，每个色块 16×16 px
 * ├──────────────────┤
 * │ SPR Palette (16) │
 * ├──────────────────┤
 * │ System (64)      │ ← 2 行 × 32 列 或 4 行 × 16 列，每个 12×12 px
 * └──────────────────┘
 */
export function renderPaletteImage(nes: NES): {
  data: Uint32Array;
  width: number;
  height: number;
} {
  const d = getPaletteData(nes);

  const BLOCK_BG = 20;  // 每个 BG/SPR 色块大小
  const BLOCK_SYS = 12; // 每个系统色块大小
  const GAP = 4;        // 组间距
  const MARGIN = 4;     // 边距

  const width = MARGIN * 2 + 4 * BLOCK_BG + GAP * 3;
  const height =
    MARGIN * 4 +
    4 * BLOCK_BG +   // BG 调色板 (4 行)
    GAP * 2 +
    4 * BLOCK_BG +   // SPR 调色板
    GAP * 2 +
    4 * BLOCK_SYS +  // 系统调色板 (4 行 × 16 列)
    GAP * 3;

  const buf = new Uint32Array(width * height);
  buf.fill(0xff_1a1a2e); // 深色背景 (FCEUX 风格)

  function drawBlock(bx: number, by: number, color: number) {
    const bs = bx < 2 ? BLOCK_BG : BLOCK_SYS; // 上半区 BG/SPR, 下半区 系统
    for (let y = 0; y < bs; y++) {
      for (let x = 0; x < bs; x++) {
        buf[(by + y) * width + (bx + x)] = color;
      }
    }
  }

  // BG 调色板
  for (let i = 0; i < 4; i++) {
    drawBlock(
      MARGIN + i * (BLOCK_BG + GAP),
      MARGIN,
      d.imgPalette[i],
    );
  }
  for (let i = 4; i < 8; i++) {
    drawBlock(
      MARGIN + (i - 4) * (BLOCK_BG + GAP),
      MARGIN + BLOCK_BG + GAP,
      d.imgPalette[i],
    );
  }
  for (let i = 8; i < 12; i++) {
    drawBlock(
      MARGIN + (i - 8) * (BLOCK_BG + GAP),
      MARGIN + (BLOCK_BG + GAP) * 2,
      d.imgPalette[i],
    );
  }
  for (let i = 12; i < 16; i++) {
    drawBlock(
      MARGIN + (i - 12) * (BLOCK_BG + GAP),
      MARGIN + (BLOCK_BG + GAP) * 3,
      d.imgPalette[i],
    );
  }

  // SPR 调色板 (偏移)
  const sprY0 = MARGIN + (BLOCK_BG + GAP) * 4 + GAP * 2;
  for (let i = 0; i < 16; i++) {
    drawBlock(
      MARGIN + (i % 4) * (BLOCK_BG + GAP),
      sprY0 + Math.floor(i / 4) * (BLOCK_BG + GAP),
      d.sprPalette[i],
    );
  }

  // 系统调色板 (64 色)
  const sysY0 = sprY0 + (BLOCK_BG + GAP) * 4 + GAP * 2;
  for (let i = 0; i < 64; i++) {
    drawBlock(
      MARGIN + (i % 16) * (BLOCK_SYS + GAP / 2),
      sysY0 + Math.floor(i / 16) * (BLOCK_SYS + GAP / 2),
      d.systemPalette[i],
    );
  }

  return { data: buf, width, height };
}
