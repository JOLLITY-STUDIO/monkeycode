"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharMap = void 0;
/**
 * CharMap — 字符集映射（原 bank00 char-map 表）
 *
 * @bank 00（字符映射）
 *
 * 职责：脚本字节 → 字形 tile 号（含 ASCII/日文假名/汉字两套表）。
 * 数据在 V0.2 从 asm/bank00 字符表提取（声明式 Map）。
 *
 * V0.1 stub：契约签名。
 */
class CharMap {
    constructor() {
        /** 字符 → tile 号映射（V0.2 从 asm 提取填充） */
        this.map = new Map();
    }
    /** 注册映射（供数据表注入） */
    register(charCode, tile) {
        this.map.set(charCode, tile);
    }
    /** 字符 → tile（未注册返回 0） */
    toTile(charCode) {
        return this.map.get(charCode) ?? 0;
    }
    /** 一段文本 → tile 序列 */
    toTiles(text) {
        return text.map((c) => this.toTile(c));
    }
}
exports.CharMap = CharMap;
