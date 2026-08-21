/**
 * title-scene — 标题菜单场景数据 (Cut 0x17)
 * @bank 00 (标题 Cut 0x17)
 *
 * 标题菜单: KICK OFF / CONTINUE, 光标上下选择, A 确认。
 */
import type { PaletteTable } from '../../../../core/nes-ram';

/** 标题菜单调色板 */
export const TITLE_PALETTE: PaletteTable = {
  bgPalettes: [
    { colors: [{ r: 0, g: 0, b: 0, a: 255 }, { r: 0xff, g: 0xff, b: 0xff, a: 255 }, { r: 0x20, g: 0x20, b: 0x30, a: 255 }, { r: 0x0c, g: 0x0c, b: 0x0c, a: 255 }] },
    { colors: [{ r: 0, g: 0, b: 0, a: 255 }, { r: 0x30, g: 0x10, b: 0x00, a: 255 }, { r: 0x00, g: 0x20, b: 0x30, a: 255 }, { r: 0x10, g: 0x10, b: 0x30, a: 255 }] },
    { colors: [{ r: 0, g: 0, b: 0, a: 255 }, { r: 0x30, g: 0x30, b: 0x00, a: 255 }, { r: 0x20, g: 0x10, b: 0x20, a: 255 }, { r: 0x00, g: 0x30, b: 0x10, a: 255 }] },
    { colors: [{ r: 0, g: 0, b: 0, a: 255 }, { r: 0x20, g: 0x30, b: 0x30, a: 255 }, { r: 0x30, g: 0x20, b: 0x10, a: 255 }, { r: 0x10, g: 0x30, b: 0x20, a: 255 }] },
  ],
  sprPalettes: [
    { colors: [{ r: 0, g: 0, b: 0, a: 255 }, { r: 0xff, g: 0xff, b: 0xff, a: 255 }, { r: 0x00, g: 0x00, b: 0x30, a: 255 }, { r: 0x30, g: 0x00, b: 0x00, a: 255 }] },
    { colors: [{ r: 0, g: 0, b: 0, a: 255 }, { r: 0x20, g: 0x20, b: 0x20, a: 255 }, { r: 0x30, g: 0x30, b: 0x00, a: 255 }, { r: 0x00, g: 0x30, b: 0x30, a: 255 }] },
    { colors: [{ r: 0, g: 0, b: 0, a: 255 }, { r: 0x30, g: 0x00, b: 0x20, a: 255 }, { r: 0x00, g: 0x20, b: 0x00, a: 255 }, { r: 0x20, g: 0x00, b: 0x30, a: 255 }] },
    { colors: [{ r: 0, g: 0, b: 0, a: 255 }, { r: 0x30, g: 0x30, b: 0x30, a: 255 }, { r: 0x10, g: 0x10, b: 0x10, a: 255 }, { r: 0x20, g: 0x20, b: 0x20, a: 255 }] },
  ],
} as PaletteTable;

/** 菜单项 (KICK OFF / CONTINUE) */
export const TITLE_MENU_ITEMS = ['KICK OFF', 'CONTINUE'] as const;

/** 菜单项光标 Y 坐标 (精灵 Y) */
export const TITLE_CURSOR_Y = [0x60, 0x74] as const;

/** 光标精灵 X 坐标 */
export const TITLE_CURSOR_X = 0x40;

/** 确认后选择的 RAM 标志 (ram_0027) */
export const TITLE_SELECTION_RAM = 0x0027;

export const TITLE_KICKOFF = 0;
export const TITLE_CONTINUE = 1;
