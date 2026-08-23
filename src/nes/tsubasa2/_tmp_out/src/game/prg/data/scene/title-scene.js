"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TITLE_CONTINUE = exports.TITLE_KICKOFF = exports.TITLE_SELECTION_RAM = exports.TITLE_CURSOR_X = exports.TITLE_CURSOR_Y = exports.TITLE_MENU_ITEMS = exports.TITLE_PALETTE = void 0;
/** 标题菜单调色板 */
exports.TITLE_PALETTE = {
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
};
/** 菜单项 (KICK OFF / CONTINUE) */
exports.TITLE_MENU_ITEMS = ['KICK OFF', 'CONTINUE'];
/** 菜单项光标 Y 坐标 (精灵 Y) */
exports.TITLE_CURSOR_Y = [0x60, 0x74];
/** 光标精灵 X 坐标 */
exports.TITLE_CURSOR_X = 0x40;
/** 确认后选择的 RAM 标志 (ram_0027) */
exports.TITLE_SELECTION_RAM = 0x0027;
exports.TITLE_KICKOFF = 0;
exports.TITLE_CONTINUE = 1;
