/**
 * opening-scene — BOOT 开场场景数据 (TECMO Theater)
 * @bank 00 (BOOT 协程, 调色板渐显, 300 帧后切 TITLE)
 *
 * 真实场景数据: NT 图案 / 调色板 / 精灵由场景渲染驱动。
 * 本模块提供 BOOT 开场调色板与渐显序列。
 */
import type { PaletteTable } from '../../../../core/nes-ram';

/** BOOT 开场调色板 (BG + SPR) — 用于 _applyBootPalette palWriteAll */
export const BOOT_PALETTE: PaletteTable = {
  bgPalettes: [
    { colors: [{ r: 0, g: 0, b: 0, a: 255 }, { r: 255, g: 255, b: 255, a: 255 }, { r: 0x30, g: 0x30, b: 0x30, a: 255 }, { r: 0x0c, g: 0x0c, b: 0x0c, a: 255 }] },
    { colors: [{ r: 0, g: 0, b: 0, a: 255 }, { r: 0x20, g: 0x10, b: 0x30, a: 255 }, { r: 0x00, g: 0x20, b: 0x20, a: 255 }, { r: 0x10, g: 0x30, b: 0x20, a: 255 }] },
    { colors: [{ r: 0, g: 0, b: 0, a: 255 }, { r: 0x30, g: 0x20, b: 0x00, a: 255 }, { r: 0x20, g: 0x30, b: 0x00, a: 255 }, { r: 0x00, g: 0x00, b: 0x30, a: 255 }] },
    { colors: [{ r: 0, g: 0, b: 0, a: 255 }, { r: 0x30, g: 0x00, b: 0x20, a: 255 }, { r: 0x00, g: 0x30, b: 0x30, a: 255 }, { r: 0x30, g: 0x30, b: 0x00, a: 255 }] },
  ],
  sprPalettes: [
    { colors: [{ r: 0, g: 0, b: 0, a: 255 }, { r: 0xff, g: 0xff, b: 0xff, a: 255 }, { r: 0x30, g: 0x10, b: 0x10, a: 255 }, { r: 0x00, g: 0x00, b: 0x30, a: 255 }] },
    { colors: [{ r: 0, g: 0, b: 0, a: 255 }, { r: 0x30, g: 0x00, b: 0x00, a: 255 }, { r: 0x20, g: 0x30, b: 0x20, a: 255 }, { r: 0x30, g: 0x20, b: 0x30, a: 255 }] },
    { colors: [{ r: 0, g: 0, b: 0, a: 255 }, { r: 0x00, g: 0x30, b: 0x00, a: 255 }, { r: 0x30, g: 0x00, b: 0x30, a: 255 }, { r: 0x00, g: 0x30, b: 0x30, a: 255 }] },
    { colors: [{ r: 0, g: 0, b: 0, a: 255 }, { r: 0x30, g: 0x30, b: 0x30, a: 255 }, { r: 0x20, g: 0x20, b: 0x20, a: 255 }, { r: 0x10, g: 0x10, b: 0x10, a: 255 }] },
  ],
} as PaletteTable;

/** BOOT 开场总帧数 (300 帧后切 TITLE) */
export const BOOT_TOTAL_FRAMES = 300;

/** 调色板渐显步数 */
export const BOOT_PALETTE_STEPS = 16;

/** BOOT 文本显示起始帧 */
export const BOOT_TEXT_START_FRAME = 60;
