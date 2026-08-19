"use strict";
/**
 * Bank31 $E9DA 演出精灵表 — 自动生成 (scripts/gen-showcase-data.cjs)
 *
 * $E93D 解包语义 (见脚本头注释):
 *   block = [xLo, xHi, attr, tiles...]
 *   attr bit0-1 = 行数, bit2-7 = 每行精灵数
 *   tiles[r] 长度 = perRow (0x00 是合法 tile, 0xFE 提前终止补 0)
 *   xLo/xHi = 演出画面位置 (H5: 屏幕像素 (x, y))
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHOWCASE_D6DE = exports.SHOWCASE_SPRITE_BLOCKS = exports.SHOWCASE_SPRITE_PTRS = void 0;
exports.showcaseBlockIndexByType = showcaseBlockIndexByType;
exports.getShowcaseBlock = getShowcaseBlock;
/** $E9DA 指针表 (32 项, CPU $E000 窗口) */
exports.SHOWCASE_SPRITE_PTRS = [
    59932,
    59945,
    59956,
    59965,
    59974,
    59985,
    59993,
    60001,
    60010,
    60019,
    60028,
    60039,
    60052,
    60063,
    60076,
    60087,
    60100,
    60110,
    60123,
    60134,
    60143,
    60152,
    60161,
    60173,
    60183,
    60198,
    60211,
    60222,
    60236,
    60254,
    60263,
    60274,
];
/** 演出精灵块表 (32 项) */
exports.SHOWCASE_SPRITE_BLOCKS = [
    {
        addr: 0xEA1C,
        x: 172,
        y: 34,
        rows: 2,
        perRow: 5,
        tiles: [
            [0x94, 0x00, 0x94, 0x00, 0x00],
            [0x54, 0x68, 0x5C, 0x69, 0x00],
        ],
    },
    {
        addr: 0xEA29,
        x: 172,
        y: 34,
        rows: 2,
        perRow: 5,
        tiles: [
            [0x00, 0x95, 0x00, 0x00, 0x00],
            [0x00, 0x5A, 0x4D, 0x00, 0x00],
        ],
    },
    {
        addr: 0xEA34,
        x: 172,
        y: 34,
        rows: 2,
        perRow: 5,
        tiles: [
            [0x00, 0x00, 0x00, 0x00, 0x00],
            [0x4C, 0x71, 0x7D, 0x54, 0x00],
        ],
    },
    {
        addr: 0xEA3D,
        x: 172,
        y: 34,
        rows: 2,
        perRow: 5,
        tiles: [
            [0x00, 0x00, 0x00, 0x00, 0x00],
            [0x6C, 0x6E, 0x3F, 0x52, 0x7D],
        ],
    },
    {
        addr: 0xEA46,
        x: 172,
        y: 34,
        rows: 2,
        perRow: 4,
        tiles: [
            [0x00, 0x00, 0x00, 0x95],
            [0x54, 0x67, 0x6F, 0x5C],
        ],
    },
    {
        addr: 0xEA51,
        x: 172,
        y: 34,
        rows: 2,
        perRow: 4,
        tiles: [
            [0x00, 0x00, 0x00, 0x00],
            [0x00, 0x4D, 0x69, 0x7D],
        ],
    },
    {
        addr: 0xEA59,
        x: 172,
        y: 34,
        rows: 2,
        perRow: 4,
        tiles: [
            [0x00, 0x00, 0x00, 0x00],
            [0x48, 0x68, 0x41, 0x7D],
        ],
    },
    {
        addr: 0xEA61,
        x: 110,
        y: 34,
        rows: 2,
        perRow: 5,
        tiles: [
            [0x00, 0x00, 0x00, 0x00, 0x00],
            [0x00, 0x50, 0x6F, 0x48, 0x69],
        ],
    },
    {
        addr: 0xEA6A,
        x: 110,
        y: 34,
        rows: 2,
        perRow: 5,
        tiles: [
            [0x00, 0x00, 0x00, 0x00, 0x00],
            [0x00, 0x4D, 0x46, 0x42, 0x50],
        ],
    },
    {
        addr: 0xEA73,
        x: 110,
        y: 34,
        rows: 2,
        perRow: 5,
        tiles: [
            [0x00, 0x00, 0x00, 0x00, 0x00],
            [0x00, 0x46, 0x60, 0x4F, 0x68],
        ],
    },
    {
        addr: 0xEA7C,
        x: 110,
        y: 34,
        rows: 2,
        perRow: 5,
        tiles: [
            [0x00, 0x95, 0x00, 0x00, 0x00],
            [0x00, 0x5A, 0x6C, 0x7D, 0x50],
        ],
    },
    {
        addr: 0xEA87,
        x: 110,
        y: 34,
        rows: 2,
        perRow: 5,
        tiles: [
            [0x00, 0x00, 0x00, 0x94, 0x00],
            [0x00, 0x50, 0x42, 0x46, 0x7D],
        ],
    },
    {
        addr: 0xEA94,
        x: 110,
        y: 34,
        rows: 2,
        perRow: 5,
        tiles: [
            [0x00, 0x94, 0x00, 0x00, 0x00],
            [0x00, 0x5C, 0x6B, 0x6F, 0x48],
        ],
    },
    {
        addr: 0xEA9F,
        x: 110,
        y: 34,
        rows: 2,
        perRow: 5,
        tiles: [
            [0x00, 0x00, 0x00, 0x00, 0x94],
            [0x00, 0x4D, 0x46, 0x42, 0x5C],
        ],
    },
    {
        addr: 0xEAAC,
        x: 110,
        y: 34,
        rows: 2,
        perRow: 5,
        tiles: [
            [0x00, 0x94, 0x00, 0x00, 0x00],
            [0x00, 0x06, 0x2E, 0x22, 0x2E],
        ],
    },
    {
        addr: 0xEAB7,
        x: 110,
        y: 34,
        rows: 2,
        perRow: 5,
        tiles: [
            [0x00, 0x95, 0x00, 0x00, 0x94],
            [0x00, 0x5A, 0x6C, 0x7D, 0x5C],
        ],
    },
    {
        addr: 0xEAC4,
        x: 110,
        y: 34,
        rows: 2,
        perRow: 5,
        tiles: [
            [0x95, 0x00, 0x00, 0x00, 0x00],
            [0x5A, 0x4D, 0x46, 0x6F, 0x54],
        ],
    },
    {
        addr: 0xEACE,
        x: 110,
        y: 34,
        rows: 2,
        perRow: 5,
        tiles: [
            [0x00, 0x00, 0x00, 0x00, 0x95],
            [0x00, 0x4D, 0x46, 0x42, 0x5A],
        ],
    },
    {
        addr: 0xEADB,
        x: 110,
        y: 34,
        rows: 2,
        perRow: 5,
        tiles: [
            [0x00, 0x94, 0x00, 0x00, 0x00],
            [0x03, 0x0A, 0x06, 0x15, 0x02],
        ],
    },
    {
        addr: 0xEAE6,
        x: 110,
        y: 34,
        rows: 2,
        perRow: 5,
        tiles: [
            [0x00, 0x00, 0x00, 0x00, 0x00],
            [0x00, 0x5C, 0x76, 0x6B, 0x7D],
        ],
    },
    {
        addr: 0xEAEF,
        x: 110,
        y: 34,
        rows: 2,
        perRow: 5,
        tiles: [
            [0x00, 0x00, 0x00, 0x00, 0x00],
            [0x00, 0x0E, 0x28, 0x01, 0x03],
        ],
    },
    {
        addr: 0xEAF8,
        x: 110,
        y: 34,
        rows: 2,
        perRow: 5,
        tiles: [
            [0x00, 0x00, 0x00, 0x00, 0x00],
            [0x00, 0x48, 0x68, 0x41, 0x7D],
        ],
    },
    {
        addr: 0xEB01,
        x: 171,
        y: 34,
        rows: 2,
        perRow: 6,
        tiles: [
            [0x00, 0x95, 0x00, 0x00, 0x00, 0x00],
            [0x00, 0x5A, 0x6E, 0x51, 0x00, 0x00],
        ],
    },
    {
        addr: 0xEB0D,
        x: 171,
        y: 34,
        rows: 2,
        perRow: 6,
        tiles: [
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            [0x00, 0x47, 0x70, 0x6F, 0x51, 0x00],
        ],
    },
    {
        addr: 0xEB17,
        x: 171,
        y: 34,
        rows: 2,
        perRow: 6,
        tiles: [
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x94],
            [0x0B, 0x2E, 0x06, 0x08, 0x14, 0x1B],
        ],
    },
    {
        addr: 0xEB26,
        x: 110,
        y: 34,
        rows: 2,
        perRow: 5,
        tiles: [
            [0x00, 0x00, 0x94, 0x94, 0x00],
            [0x00, 0x14, 0x1B, 0x10, 0x0D],
        ],
    },
    {
        addr: 0xEB33,
        x: 110,
        y: 34,
        rows: 2,
        perRow: 5,
        tiles: [
            [0x00, 0x94, 0x00, 0x00, 0x00],
            [0x20, 0x06, 0x1F, 0x04, 0x29],
        ],
    },
    {
        addr: 0xEB3E,
        x: 171,
        y: 34,
        rows: 3,
        perRow: 5,
        tiles: [
            [0x00, 0x00, 0x00, 0x00, 0x00],
            [0x4C, 0x71, 0x7D, 0x54, 0x16],
            [0x0F, 0x15, 0x04, 0x29, 0x00],
        ],
    },
    {
        addr: 0xEB4C,
        x: 171,
        y: 34,
        rows: 3,
        perRow: 5,
        tiles: [
            [0x94, 0x00, 0x94, 0x00, 0x00],
            [0x54, 0x68, 0x5C, 0x69, 0x16],
            [0x0F, 0x15, 0x04, 0x29, 0x00],
        ],
    },
    {
        addr: 0xEB5E,
        x: 110,
        y: 34,
        rows: 2,
        perRow: 5,
        tiles: [
            [0x00, 0x00, 0x00, 0x00, 0x00],
            [0x7D, 0x7D, 0x7D, 0x7D, 0x7D],
        ],
    },
    {
        addr: 0xEB67,
        x: 170,
        y: 34,
        rows: 2,
        perRow: 5,
        tiles: [
            [0x00, 0x94, 0x00, 0x00, 0x00],
            [0x1B, 0x10, 0x28, 0x4D, 0x60],
        ],
    },
    {
        addr: 0xEB72,
        x: 170,
        y: 34,
        rows: 2,
        perRow: 5,
        tiles: [
            [0x00, 0x00, 0x00, 0x00, 0x00],
            [0x0C, 0x32, 0x03, 0x22, 0x2E],
        ],
    },
];
/**
 * $D6DE 演出类型表 (Bank30): ram_043B → 类型码
 * 索引: 0-6 → 普通演出, 7-9 → 特写类 (0x1E/0x1F/0x20)
 */
exports.SHOWCASE_D6DE = [
    0x02, 0x01, 0x00, 0x03, 0x04, 0x05, 0x06, 0x1e, 0x1f, 0x20,
];
/**
 * 类型码 → 精灵块索引 (对应 $E93D 的 A>>2 查表)
 * 类型 0x00-0x03 → idx0; 0x04-0x06 → idx1; 0x1E/0x1F → idx7; 0x20 → idx8
 */
function showcaseBlockIndexByType(type) {
    return (type >> 2) & 0x1f;
}
/**
 * ram_043B → 演出精灵块 (走 $D6DE 类型映射)
 */
function getShowcaseBlock(ram043B) {
    const type = exports.SHOWCASE_D6DE[ram043B & 0x3f] ?? 0;
    return exports.SHOWCASE_SPRITE_BLOCKS[showcaseBlockIndexByType(type)];
}
