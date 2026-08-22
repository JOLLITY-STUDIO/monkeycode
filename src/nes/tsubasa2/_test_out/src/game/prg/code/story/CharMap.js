"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharMap = void 0;
exports.decodeChar = decodeChar;
/**
 * CharMap — 字符编码映射 (双 tile 表)
 * @bank 00 ($88CA 字符处理, $8A14 双 tile 表)
 *
 * 职责: ROM 字符编码 → 双 tile 图案映射, 用于文本渲染。
 *
 * 原 $88CA 字符处理子程:
 *   - 分配 PPU buffer (A=$82)
 *   - 字符码 < 0xA0: 单 tile, 直接写
 *   - 字符码 >= 0xA0: 双 tile — 第一 tile = 0x94 (或 0x95 if >=0xC8),
 *     第二 tile 查 $8A14 双 tile 表。
 *
 * 命名规范: 旧名 char-map → 新名 CharMap。
 */
const char_map_table_1 = require("../../data/tables/char-map-table");
class CharMap {
    /**
     * 字符解码 (原 $88CA 字符处理)
     * @returns 双 tile 图案 [tile0, tile1], 或单 tile 图案 [code]
     */
    static decode(code) {
        const c = code & 0xff;
        if (c < char_map_table_1.DOUBLE_TILE_THRESHOLD) {
            // 单 tile
            return [c];
        }
        // 双 tile: 第一 tile 0x94 或 0x95, 第二 tile 查表
        const base = c < 0xc8 ? 0x94 : 0x95;
        const second = char_map_table_1.CHAR_MAP_DOUBLE[c]?.[0] ?? 0;
        return [base, second];
    }
}
exports.CharMap = CharMap;
/** 双 tile 表 */
CharMap.DOUBLE = char_map_table_1.CHAR_MAP_DOUBLE;
/** 双 tile 基址常量 */
CharMap.DOUBLE_TILE_BASE = char_map_table_1.DOUBLE_TILE_BASE;
CharMap.DOUBLE_TILE_COUNT = char_map_table_1.DOUBLE_TILE_COUNT;
CharMap.DOUBLE_TILE_THRESHOLD = char_map_table_1.DOUBLE_TILE_THRESHOLD;
function decodeChar(code) {
    return CharMap.decode(code);
}
exports.default = CharMap;
