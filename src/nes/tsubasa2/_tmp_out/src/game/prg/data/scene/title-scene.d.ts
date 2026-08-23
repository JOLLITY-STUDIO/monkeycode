/**
 * title-scene — 标题菜单场景数据 (Cut 0x17)
 * @bank 00 (标题 Cut 0x17)
 *
 * 标题菜单: KICK OFF / CONTINUE, 光标上下选择, A 确认。
 */
import type { PaletteTable } from '../../../../core/nes-ram';
/** 标题菜单调色板 */
export declare const TITLE_PALETTE: PaletteTable;
/** 菜单项 (KICK OFF / CONTINUE) */
export declare const TITLE_MENU_ITEMS: readonly ["KICK OFF", "CONTINUE"];
/** 菜单项光标 Y 坐标 (精灵 Y) */
export declare const TITLE_CURSOR_Y: readonly [96, 116];
/** 光标精灵 X 坐标 */
export declare const TITLE_CURSOR_X = 64;
/** 确认后选择的 RAM 标志 (ram_0027) */
export declare const TITLE_SELECTION_RAM = 39;
export declare const TITLE_KICKOFF = 0;
export declare const TITLE_CONTINUE = 1;
