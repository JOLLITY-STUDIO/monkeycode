/**
 * Pattern Table Viewer — 参照 FCEUX ppuViewer (src/drivers/Qt/ppuViewer.cpp)
 *
 * 显示两个图案表 (CHR-ROM / CHR-RAM)，每个 128×128 像素 (16×16 tiles)
 * 支持多种调色板选择查看
 */

import type NES from '../nes';

export interface PatternTableFrame {
  data: Uint32Array;
  width: number;   // 128
  height: number;  // 128
}

export interface PatternTableResult {
  /** 图案表 0 ($0000-$0FFF): tiles 0-255 */
  table0: PatternTableFrame;
  /** 图案表 1 ($1000-$1FFF): tiles 256-511 */
  table1: PatternTableFrame;
  /** 当前背景图案表选择位 */
  bgTable: 0 | 1;
  /** 当前精灵图案表选择位 */
  spTable: 0 | 1;
}

/**
 * 渲染单个图案表
 * 参照 FCEUX ppuPatternView_t::paintEvent():
 * - 16×16 tiles 排列
 * - 每个 tile 8×8 pixels → 128×128 总大小
 * - 用指定的调色板 (前 4 色)
 *
 * @param nes - NES 实例
 * @param tableIdx - 0 (tiles 0-255) 或 1 (tiles 256-511)
 * @param paletteOffset - 使用的调色板偏移 (0-3, 对应 4 色组)
 * @param palette - 自定义调色板 (256 色)，不传则使用 imgPalette
 */
export function renderPatternTable(
  nes: NES,
  tableIdx: number,
  paletteOffset: number = 0,
  palette?: Uint32Array,
): PatternTableFrame {
  const ppu = nes.ppu;
  const baseTile = tableIdx * 256;
  const buf = new Uint32Array(128 * 128);
  const pal = palette || ppu.imgPalette;
  const offset = paletteOffset * 4;
  const backdrop = pal[0]; // 背景色 (透明)

  for (let ty = 0; ty < 16; ty++) {
    for (let tx = 0; tx < 16; tx++) {
      const tileIdx = baseTile + ty * 16 + tx;
      const ptTile = ppu.ptTile[tileIdx];
      const baseX = tx * 8;
      const baseY = ty * 8;

      if (ptTile && ptTile.pix) {
        const pix = ptTile.pix;
        for (let py = 0; py < 8; py++) {
          for (let px = 0; px < 8; px++) {
            const colIdx = pix[py * 8 + px];
            buf[(baseY + py) * 128 + (baseX + px)] =
              colIdx === 0 ? backdrop : (pal[colIdx + offset] ?? backdrop);
          }
        }
      } else {
        // 空 tile — 灰色背景 (参照 FCEUX)
        for (let py = 0; py < 8; py++) {
          for (let px = 0; px < 8; px++) {
            buf[(baseY + py) * 128 + (baseX + px)] = 0xff_444444;
          }
        }
      }
    }
  }

  return { data: buf, width: 128, height: 128 };
}

/**
 * 渲染两个图案表 (参照 FCEUX 同时显示两种表)
 * @param palette0 - table0 的自定义调色板，不传则用 imgPalette
 * @param palette1 - table1 的自定义调色板，不传则用 imgPalette
 */
export function renderBothPatternTables(
  nes: NES,
  paletteOffset: number = 0,
  palette0?: Uint32Array,
  palette1?: Uint32Array,
): PatternTableResult {
  return {
    table0: renderPatternTable(nes, 0, paletteOffset, palette0),
    table1: renderPatternTable(nes, 1, paletteOffset, palette1),
    bgTable: (nes.ppu.f_bgPatternTable ? 1 : 0) as (0 | 1),
    spTable: (nes.ppu.f_spPatternTable ? 1 : 0) as (0 | 1),
  };
}
